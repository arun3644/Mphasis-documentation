import { createAction, props } from "@ngrx/store";
import { Employee } from "./employee.model";

export const loadData = createAction(
  '[Employee] loadData data'
)

export const loadDataSuccess= createAction(
  '[Employee] loadDataSuccess data', props<{data:Employee[]}>()
)
export const loadEmployeesFailure = createAction(
  '[Employee] loadEmployees Failure', props<{ error: any }>()
);
export const addEmp = createAction(
  '[Employee] Add Employee', props<{ newEmp: Employee }>()
);
export const filterEmployees = createAction(
  '[Employee] filterEmployees', props<{ data: string }>()
);

export const updateEmp= createAction(
  '[Employee] updateEmp', props<{datas:Employee}>()
)

export const success= createAction(
  '[Employee] success data', props<{data:any}>()
)

export const deleteData= createAction(
  '[Employee] deleteData', props<{data:number}>()
)


