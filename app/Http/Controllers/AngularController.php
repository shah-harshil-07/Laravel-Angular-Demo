<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Department;
use Illuminate\Http\Request;
use App\Http\Helpers\ResponseTrait;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AngularController extends Controller
{
    use ResponseTrait;

    public function getEmployees(Request $request)
    {
        if (!isset($request->per_page)) {
            $employee_count = count(Employee::where('status', 'active')->get());
            $per_page = floor($employee_count / +env('per_page'));
        } else {
            $per_page = $request->per_page;
        }

        $employees = Employee::with('departments')->where('status', 'active');

        if (isset($request->globalSearch)) {
            $global_search_value = $request->globalSearch;

            $employees = $employees->where(function($query) use ($global_search_value) {
                $query->where('name', 'like', '%'.$global_search_value.'%')
                ->orWhere('dob', 'like', '%'.$global_search_value.'%')
                ->orWhere('phone', 'like', '%'.$global_search_value.'%')
                ->orWhere('email', 'like', '%'.$global_search_value.'%')
                ->orWhere('salary', 'like', '%'.$global_search_value.'%')
                ->orWhereHas('departments', function($query) use ($global_search_value) {
                    $query->where('name', 'like', '%'.$global_search_value.'%');
                });
            });
        }

        if (isset($request->search)) {
            $search_data = explode(',', $request->search);
            foreach ($search_data as $key => $value) {
                $value = explode(':', $value);
                $field = $value[0];
                $search_value = $value[1];

                if ($field == 'department_id') {
                    $employees = $employees->whereHas('departments', function($query) use ($search_value) {
                        $query->where('name', 'like', '%'.$search_value.'%');
                    });
                } else {
                    $employees = $employees->where($field, 'like', '%'.$search_value.'%');
                }
            }
        }

        if (isset($request->sort)) {
            $sort_data = $request->sort;
            $field = ($sort_data[0] == '-') ? substr($sort_data, 1) : $sort_data;
            $sort_type = ($sort_data[0] == '-') ? 'desc' : 'asc';
            
            if ($field == 'department_id') {
                $employees = $employees->orderBy(
                    Department::select('name')->whereColumn('employees.department_id', 'departments.id'),
                    $sort_type
                );
            } else {
                $employees = $employees->orderBy($field, $sort_type);
            }
        }

        $employees = $employees->paginate($per_page);

        $paginating_column = collect(['paginating_factor' => +env('per_page')]);

        $employees = $paginating_column->merge($employees);

        return response()->json($employees);
    }

    public function getDepartments()
    {
        $departments = Department::where('status', 'active')->get();

        return response()->json($departments);
    }

    public function addEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), config('validator.employee.create'));

        if ($validator->fails()) {
            return $this->validationError($validator, $validator->messages()->first());
        }

        if ($request->image != null) {
            $image = $request->image;

            $ext = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];

            $substr = substr($image, 0, strpos($image, ',') + 1);
            $file = str_replace($substr, '', $image);
            $file = str_replace(' ', '+', $file);
            $file_name = time().'.'.$ext;

            Storage::disk('local')->put($file_name, base64_decode($file));
        }

        try {
            $employee = new Employee();

            $employee->department_id = $request->department;
            $employee->name          = $request->name;
            $employee->dob           = $request->dob;
            $employee->phone         = $request->phone;
            $employee->email         = $request->email;
            $employee->salary        = $request->salary;
            
            if ($request->image != null) {
                $employee->photo = $file_name;
            }

            $employee->save();

            return $this->success($employee, 'EMPLOYEE_ADDED');

        } catch (\Exception $ex) {
            return $this->error(($ex->getCode() == 423) ? $ex->getMessage() : 'ERROR');
        }
    }

    public function editEmployee(int $id)
    {
        $employee = Employee::whereId($id)->first();

        if ($employee == null || $employee->status == 'inactive') {
            return $this->error('EMPLOYEE_NOT_FOUND');
        }

        return $this->success($employee, 'EMPLOYEE_DETAILS');
    }

    public function updateEmployee(Request $request)
    {
        $validations = config('validator.employee.update');
        $validations['email'] = 'required|email|unique:employees,email,'.$request->id;

        $validator = Validator::make($request->all(), $validations);
        
        if ($validator->fails()) {
            return $this->validationError($validator, $validator->messages()->first());
        }

        if ($request->image != null) {
            $image = $request->image;

            $ext = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];

            $substr = substr($image, 0, strpos($image, ',') + 1);
            $file = str_replace($substr, '', $image);
            $file = str_replace(' ', '+', $file);
            $file_name = time().'.'.$ext;

            Storage::disk('local')->put($file_name, base64_decode($file));
        }

        try {
            $employee = Employee::whereId($request->id)->first();

            $employee->department_id = $request->department;
            $employee->name          = $request->name;
            $employee->dob           = $request->dob;
            $employee->phone         = $request->phone;
            $employee->email         = $request->email;
            $employee->salary        = $request->salary;

            if ($request->image != null) {
                if ($employee->photo != null) {
                    $old_image = $employee->photo;
                    unlink(public_path().'/images/'.$old_image);
                }
                $employee->photo = $file_name;
            }

            $employee->save();

            return $this->success($employee, 'EMPLOYEE_UPDATED');

        } catch (\Exception $ex) {
            return $this->error(($ex->getCode() == 423) ? $ex->getMessage() : 'ERROR');
        }
    }

    public function deleteEmployee(int $id)
    {
        $employee = Employee::whereId($id)->first();

        if ($employee == null) {
            return $this->error('EMPLOYEE_NOT_FOUND');
        }

        $employee->status = 'inactive';
        $employee->save();

        return $this->success([], 'EMPLOYEE_DELETED');
    }
}
