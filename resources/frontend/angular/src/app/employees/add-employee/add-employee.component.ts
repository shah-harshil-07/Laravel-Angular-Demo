import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileExtenstionValidatorDirective } from 'src/app/directives/file-extenstion-validator.directive';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

	imgSrc: String | null = null;
	formSubmitted: boolean = false;

	constructor(
		private emplyoeeService: EmployeeService,
		private formBuilder: FormBuilder,
		private fileValidator: FileExtenstionValidatorDirective,
		private router: Router
	) { }

	createForm: FormGroup = this.formBuilder.group({
		image: [null, this.fileValidator.validate],
		department: ['', Validators.required],
		name: ['', [Validators.required, Validators.pattern('[a-zA-Z]{1,} *[a-zA-Z]*')]],
		dob: ['', [Validators.required, Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')]],
		phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
		email: ['', [Validators.required, Validators.email]],
		salary: ['', [Validators.required, Validators.pattern('[0-9]{4,}')]],
	})

	public departments: any;

	ngOnInit(): void {
		this.emplyoeeService.getDepartments().subscribe(data => this.departments = data);
	}

	public submitForm()
	{
		this.formSubmitted = true;
		if (this.createForm.touched && this.createForm.status == 'VALID') {
			if (this.imgSrc != null && this.createForm.value?.image) {
				this.createForm.value.image = this.imgSrc;
			}

			this.createForm.value.department = Number(this.createForm.value.department);

			this.emplyoeeService.addEmployee(this.createForm.value).subscribe((response) => {
				let status = response.meta.status;
				let message = response.meta.message;

				alert(message);

				if (status) {
					this.router.navigate(['dashboard']);
				}
			});
		}
	}

	uploadFile(event: any)
	{
		const reader = new FileReader();
		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.imgSrc = reader.result as string;
			}
		}
	}

}
