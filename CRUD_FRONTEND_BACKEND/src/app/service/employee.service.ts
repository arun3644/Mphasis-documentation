import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from '../employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly URL = "https://cnnj374klfbinceonr3wa46we4.appsync-api.eu-north-1.amazonaws.com/graphql";
  private readonly API_KEY = "da2-rmyffoooqjegbp467zna6ugma4";

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': this.API_KEY
  });

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    const query = `
      query {
        listEmployees {
          emailId
          id
          phoneNumber
          name
        }
      }
    `;
    return this.http.post<any>(this.URL, { query }, { headers: this.headers }).pipe(
      map(res => res.data.listEmployees)
    );
  }

  getEmployee(id: number): Observable<Employee> {
    const query = `
      query GetEmployee($id: Int!) {
        getEmployee(id: $id) {
          emailId
          id
          name
          phoneNumber
        }
      }
    `;
    return this.http.post<any>(
      this.URL,
      { query, variables: { id } },
      { headers: this.headers }
    ).pipe(
      map(res => res.data.getEmployee)
    );
  }

  add(emp: Employee): Observable<Employee> {
    const mutation = `
      mutation AddEmployee($emp: EmployeeInput!) {
        addEmployee(emp: $emp) {
          emailId
          id
          name
          phoneNumber
        }
      }
    `;
    return this.http.post<any>(
      this.URL,
      { query: mutation, variables: { emp } },
      { headers: this.headers }
    ).pipe(
      map(res => res.data.addEmployee)
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
    const mutation = `
      mutation DeleteEmployee($id: Int!) {
        deleteEmployee(id: $id) {
          emailId
          id
          name
          phoneNumber
        }
      }
    `;
    return this.http.post<any>(
      this.URL,
      { query: mutation, variables: { id } },
      { headers: this.headers }
    ).pipe(
      map(res => res.data.deleteEmployee)
    );
  }
}
