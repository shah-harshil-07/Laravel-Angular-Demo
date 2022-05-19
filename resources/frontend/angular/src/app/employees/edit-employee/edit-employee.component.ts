import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileExtenstionValidatorDirective } from 'src/app/directives/file-extenstion-validator.directive';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
		private fileValidator: FileExtenstionValidatorDirective,
		private router: Router,
  ) { }

  declare empId: Number;
  declare departments: Array<any>
  declare empData: Object;
  declare newImgSrc: String;

  formSubmitted: boolean = false;
  imgSrc: String = 'user.png';

  editForm: FormGroup = this.formBuilder.group({
    id: [null],
		image: [null, this.fileValidator.validate],
		department: ['', Validators.required],
		name: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1,} *[a-zA-Z]*')]],
		dob: ['', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]],
		phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
		email: ['', [Validators.required, Validators.email]],
		salary: ['', [Validators.required, Validators.pattern('[0-9]{4,}')]],
	});

  ngOnInit(): void {
    const routeParam = this.route.snapshot.queryParamMap
    if (routeParam.has('emp_id')) {
      this.empId = Number(routeParam.get('emp_id'));
    }

    this.employeeService.getDepartments().subscribe(data => this.departments = data);

    this.employeeService.getEmployeeData(this.empId).subscribe(data => {
      if (data.meta.status) {
        this.empData = data;
        this.setFormValues(data.data);
      } else {
        alert(data.meta.message);
        this.router.navigate(['dashboard']);
      }
    });
  }

  public submitForm()
	{
		this.formSubmitted = true;
		if (this.editForm.status == 'VALID') {

      let updatedEmployeeDetails = this.editForm.value;

			if (this.newImgSrc != null) {
				updatedEmployeeDetails.image = this.newImgSrc;
			}

			parseInt(updatedEmployeeDetails.department);

			this.employeeService.updateEmployee(this.editForm.value).subscribe((response) => {
				let status = response.meta.status;
				let message = response.meta.message;

				alert(message);

				if (status) {
					this.router.navigate(['dashboard']);
				}
			});
		}
	}

  public uploadFile(event: any)
	{
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.newImgSrc = reader.result as string;
			}
		}
	}

  public setFormValues(formData: {[key: string]: string})
  {
    this.editForm.get('department')?.patchValue(formData['department_id']);
    this.editForm.get('name')?.patchValue(formData['name']);
    this.editForm.get('dob')?.patchValue(formData['dob']);
    this.editForm.get('phone')?.patchValue(formData['phone']);
    this.editForm.get('email')?.patchValue(formData['email']);
    this.editForm.get('salary')?.patchValue(formData['salary']);
    this.editForm.get('id')?.patchValue(this.empId);
    this.imgSrc = formData['photo'] ?? 'user.png';
  }
}
