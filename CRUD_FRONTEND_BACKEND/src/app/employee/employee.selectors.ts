import { createFeatureSelector, createSelector } from "@ngrx/store";
import { employeeFeatureKey, EmployeeState } from "./employee.reducer";


export const selectEmployeeFeature = createFeatureSelector<EmployeeState>(employeeFeatureKey);


export const filterEmployeeSelector = createSelector(
  selectEmployeeFeature,
  (state) => state.filter
);


export const errorSelector = createSelector(
  selectEmployeeFeature,
  (state) => state.error
);
