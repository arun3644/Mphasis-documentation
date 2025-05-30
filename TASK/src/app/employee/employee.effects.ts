import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as Employeeactions from "./employee.actions";
import { EmployeeService } from "../service/employee.service";
import { Employee } from "./employee.model";

@Injectable()
export class EmployeeEffects {
  constructor(private action$: Actions, private service: EmployeeService) {}

  loadEmployee$ = createEffect(() =>
    this.action$.pipe(
      ofType(Employeeactions.loadData),
      mergeMap(() =>
        this.service.getAllEmployee().pipe(
          map((data) => Employeeactions.loadDataSuccess({ data })),
          catchError((error) =>
            of(Employeeactions.loadEmployeesFailure({ error }))
          )
        )
      )
    )
  );



addEmp$ = createEffect(() =>
  this.action$.pipe(
    ofType(Employeeactions.addEmp),
    switchMap(({ newEmp }) =>
      this.service.add(newEmp).pipe(
        map((data: Employee) => Employeeactions.success({ data })),
        catchError((error) =>
          of(Employeeactions.loadEmployeesFailure({ error }))
        )
      )
    )
  )
);

 updateEmp$ = createEffect(() =>
    this.action$.pipe(
      ofType(Employeeactions.updateEmp),
      switchMap(({ datas }) =>
        this.service.add(datas).pipe(
          map(updatedEmployee => Employeeactions.success({ data: updatedEmployee })),
          catchError(error => of(Employeeactions.loadEmployeesFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.action$.pipe(
      ofType(Employeeactions.deleteData),
      switchMap(({ data }) =>
        this.service.deleteEmployee(data).pipe(
          map(() => Employeeactions.success({ data })),
          catchError((error) =>
            of(Employeeactions.loadEmployeesFailure({ error }))
          )
        )
      )
    )
  );
  
refresh$ = createEffect(() =>
  this.action$.pipe(
    ofType(
      Employeeactions.success
    ),
    map(() => Employeeactions.loadData())
  )
);


}

