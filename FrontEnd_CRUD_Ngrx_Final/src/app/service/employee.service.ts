import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee.model';

@Injectable({
  providedIn:'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:3000/employees";

  constructor(private http : HttpClient) {}

  getAllEmployee() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseURL);
  }

  getEmployee(id: string): Observable<Employee>{
    return this.http.get<Employee>(`${this.baseURL}/${id}`);
  }

  addEmployee(newEmployee: Employee) : Observable<Employee>{
    return this.http.post<Employee>(this.baseURL, newEmployee);
  }

  updateEmployee(id: string, employee: any) : Observable<Employee>{
    return this.http.put<Employee>(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id:string): Observable<Employee>{
    return this.http.delete<Employee>(`${this.baseURL}/${id}`);
  }
}
