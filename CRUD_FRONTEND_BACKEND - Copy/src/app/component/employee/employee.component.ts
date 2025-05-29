import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/employee/employee.model';
import * as actions from 'src/app/employee/employee.actions';
import { EmployeeState } from 'src/app/employee/employee.reducer';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:"./employee.component.html",
  styleUrl:'./employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employee$: Observable<Employee[]>;
  search: string = '';
  updateData:boolean=false;
  newId!:number;
  newName:string='';
  newEmail:string='';
  newPhoneNo!:number;
  addData:boolean=false;
  addFailed:boolean=false;
  constructor(private store: Store<{ employee: EmployeeState }>) { 
    this.employee$ = this.store.pipe(
      select(state => state.employee.list) 
    );
  }

  ngOnInit() {
    this.store.dispatch(actions.loadData());
  }

  call() {
    this.store.dispatch(actions.filterEmployees({ data: this.search }));  
  }

  enable(i: any) {
  this.newId = i.id;
  this.newName = i.name;
  this.newEmail = i.emailId;
  this.newPhoneNo = i.phoneNumber;
  this.updateData = true; 
}


  update(){
    this.store.dispatch(actions.updateEmp({
      datas:{
        id:this.newId,
        name:this.newName,
        emailId:this.newEmail,
        phoneNumber:this.newPhoneNo
      }
    }))
    this.updateData=false;
  }

  deleteData(data:number){
    this.store.dispatch(actions.deleteData({data}));
  }

  addEnable(){
    this.addData=true;
  }

  cancel(){
    this.updateData=false;
    this.addData=false;
  }

add() {

  const datas = {
    id: this.newId,
    name: this.newName,
    emailId: this.newEmail,
    phoneNumber: this.newPhoneNo
  };
  if(datas.id && datas.name && datas.emailId && datas.phoneNumber){
 this.store.dispatch(actions.addEmp({ newEmp: datas }));
 
    this.addData = false;
  }
  else{
    this.addFailed=true;
  }
 
}

}

