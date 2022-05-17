import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	constructor(private http: HttpClient) { }

	private url = environment.localhostUrl;

	getEmployees(urlParams: {[key: string]: any}): Observable<any>
	{
		let url: String = (urlParams['pageUrl']?.length > 0) ? urlParams['pageUrl'] : `${this.url}/getEmployees`;

		let specialChar: String = (urlParams['pageUrl']?.length > 0) ? '&' : '?';

		url += (urlParams['perPage'] > 0) ? `${specialChar}per_page=${urlParams['perPage']}` : '';

		if (urlParams['sort'] && urlParams['sort']?.length > 0) {
			url += `${url.includes('?') ? '&' : '?'}sort=${urlParams['sort']}`;
		}

		if (urlParams['search']) {
			let searchData = Object.entries(urlParams['search']);
			let searchString = `${url.includes('?') ? '&' : '?'}search=`;
			searchData.forEach((element, index) => {
				searchString += `${element[0]}:${element[1]}`;
				searchString += (index < searchData.length - 1) ? ',' : '';
			});
			url += searchString;
		}

		if (urlParams['globalSearch']) {
			url += `${url.includes('?') ? '&' : '?'}globalSearch=${urlParams['globalSearch']}`;
		}

		return this.http.get<any>(`${url}`);
	}

	getDepartments(): Observable<any>
	{
		return this.http.get<any>(`${this.url}/getDepartments`);
	}

	addEmployee(employee: Employee): Observable<any>
	{
		return this.http.post<any>(`${this.url}/addEmployee`, employee);
	}

	deleteEmployee(id: Number): Observable<any>
	{
		return this.http.delete<any>(`${this.url}/deleteEmployee/${id}`);
	}

	getEmployeeData(id: Number): Observable<any>
	{
		return this.http.get<any>(`${this.url}/editEmployee/${id}`);
	}

	updateEmployee(employee: any): Observable<any>
	{
		return this.http.post<any>(`${this.url}/updateEmployee`, employee);
	}
}
