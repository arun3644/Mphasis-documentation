import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee.model';

@Injectable({
  providedIn:'root'
})
export class EmployeeService {

  private url = "http://localhost:3000/employees";

  constructor(private http : HttpClient) {}

  getAllEmployee() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.url);
  }

  getEmployee(id: string): Observable<Employee>{
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  addEmployee(newEmployee: Employee) : Observable<Employee>{
    return this.http.post<Employee>(this.url, newEmployee);
  }

  updateEmployee(id: string, employee: any) : Observable<Employee>{
    return this.http.put<Employee>(`${this.url}/${id}`, employee);
  }

  deleteEmployee(id:string): Observable<Employee>{
    return this.http.delete<Employee>(`${this.url}/${id}`);
  }
}
