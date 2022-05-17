<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Department;

class Employee extends Model
{
    public $timestamps = true;
    use HasFactory;

    public function departments()
    {
        return $this->hasOne(Department::class, 'id', 'department_id')->select('id', 'name')->where('status', 'active');
    }
}
