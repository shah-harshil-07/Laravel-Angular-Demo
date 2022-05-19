import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { environment } from 'src/environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
  	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{
	declare employees: any;
	declare paginationData: any;
	declare perPageSelected: number;
	declare paginatingFactor: number;
	declare sortedField: string;
	declare totalRecords: number;
	declare globalSearchValue: string;

	public allFields = [
		'Name',
		'Photo',
		'Email Id',
		'Department',
		'Date of Birth',
		'Phone no.',
		'Salary',
		'Actions'
	];
	public selectedFields = this.allFields.map(field => field);
	public sortDisabledFields = ['Photo', 'Actions'];
	public sortType = 'asc';
	public perPageOptions: Array<number> = [];
	public urlParams: {[key: string]: string | Number | {[key: string]: string}} = {};
	public serverFields = new Map();
	public searchedKeywords: {[key: string]: string} = {};
	public openedSearchBars = this.allFields.map(() => false);
	public env = environment.imageUrl;

	constructor(private employeeService: EmployeeService) { }

	sort(index: number, sortType: string): void {
		this.sortedField = this.selectedFields[index];
		this.sortType = sortType;

		let serverField = this.serverFields.get(this.sortedField);

		this.urlParams['sort'] = `${(this.sortType === 'desc') ? '-' : ''}${serverField}`;

		this.employeeService.getEmployees(this.urlParams).subscribe(data => {
			this.employees = data.data;
			this.paginationData = data['links'];
		});
	}

	ngOnInit(): void {
		this.employeeService.getEmployees(this.urlParams).subscribe(data => {
			this.employees = data.data;
			this.totalRecords = data.total;
			this.paginationData = data['links'];
			this.perPageSelected = data.per_page;
			this.paginatingFactor = data.paginating_factor;
			this.setPerPageOptions(this.totalRecords);
		});
		
		this.setServerFields();
	}

	deleteEmp(id: Number): void {
		let x = confirm("Are you sure you want to delete this employee record?");

		if (x) {
			this.employeeService.deleteEmployee(id).subscribe(response => {
				let message = response.meta.message;
				alert(message);
				this.employees = this.employees.filter((employee: any) => {
					if (employee.id != id) {
						return employee;
					}
				})
			});
		}
	}

	loadPage(url: string = ``): void {
		if (url != null) {
			this.urlParams['pageUrl'] = url;
			this.urlParams['perPage'] = this.perPageSelected;

			this.employeeService.getEmployees(this.urlParams).subscribe(data => {
				this.employees = data.data;
				this.paginationData = data['links'];
			});
		}
	}

	setPerPageOptions(length: number): void {
		let gap: number = Math.floor(length / this.paginatingFactor);

		for (let i = gap; i < length; i += gap) {
			this.perPageOptions.push(i);
		}
	}

	setServerFields(): void {
		this.serverFields.set('Name', 'name');
		this.serverFields.set("Email Id", 'email');
		this.serverFields.set('Department', 'department_id');
		this.serverFields.set("Date of Birth", 'dob');
		this.serverFields.set("Phone no.", 'phone');
		this.serverFields.set('Salary', 'salary');
	}

	searchValue(searchedValue: string, index: number): void {
		let searchedField = this.serverFields.get(this.selectedFields[index]);

		if (searchedValue.length == 0 && this.searchedKeywords[searchedField]) {
			delete this.searchedKeywords[searchedField];
		} else {
			this.searchedKeywords[searchedField] = searchedValue;
		}

		this.urlParams['search'] = this.searchedKeywords;

		this.employeeService.getEmployees(this.urlParams).subscribe(data => {
			this.employees = data.data;
			this.paginationData = data['links'];
		});
	}

	toggleSearchBar(index: number): void {
		if (!this.sortDisabledFields.includes(this.selectedFields[index])) {
			this.openedSearchBars[index] = (this.openedSearchBars[index] == true) ? false : true;
		}
	}

	globalSearch(): void {
		if (this.globalSearchValue.length > 0) {
			this.urlParams['globalSearch'] = this.globalSearchValue;
		} else if (this.urlParams['globalSearch']) {
			delete this.urlParams['globalSearch'];
		}

		this.employeeService.getEmployees(this.urlParams).subscribe(data => {
			this.employees = data.data;
			this.paginationData = data['links'];
		});
	}

	drop(event: CdkDragDrop<string[]>): void {
		moveItemInArray(this.selectedFields, event.previousIndex, event.currentIndex);
	}

	resetFilter(): void {
		this.urlParams = {};
		this.employeeService.getEmployees(this.urlParams).subscribe(data => {
			this.employees = data.data;
			this.totalRecords = data.total;
			this.paginationData = data['links'];
			this.perPageSelected = data.per_page;
		});

		this.selectedFields = this.allFields.map(field => field);
		this.sortedField = "";
		this.sortType = 'asc';
		this.globalSearchValue = "";
		this.openedSearchBars = this.allFields.map(() => false);
	}
}
