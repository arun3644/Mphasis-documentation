import { createReducer, on } from '@ngrx/store';
import * as actions from './employee.actions';
import { Employee } from './employee.model';

export const employeeFeatureKey = 'employee';

export interface EmployeeState {
  list: Employee[];
  filter: Employee[];
  error: any;
}

export const initialState: EmployeeState = {
  list: [],
  filter: [],
  error: null,
};

export const EmployeeReducer = createReducer(
  initialState,
  on(actions.loadDataSuccess, (state, { data }) => ({
    ...state,
    list: data,
    filter: data,
    error: null,
  })),
  on(actions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(actions.addEmp, (state, { newEmp }) => ({
  ...state,
  list: [...state.list, newEmp],   
  filter: [...state.filter, newEmp], 
  error: null,
})),
  on(actions.filterEmployees, (state, { data }) => ({
    ...state,
    list: state.list.filter(emp =>
      emp.name.toLowerCase().includes(data.toLowerCase()) ||
      emp.id.toString().includes(data) ||
      emp.emailId.toLowerCase().includes(data.toLowerCase()) 
      // ||   emp.phoneNumber.toString().includes(data)
    ),
  })),
  on(actions.updateEmp,(state, {datas})=>({
    ...state,
    list: state.list.map(emp => (emp.id == datas.id) ?
     {...emp, ...datas}: emp)
  })),
  on(actions.deleteData,(state, {data})=>({
    ...state,
     list: state.list.filter(emp => emp.id != data)
  }))
);
