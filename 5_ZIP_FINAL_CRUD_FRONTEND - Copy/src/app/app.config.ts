import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideState, provideStore } from '@ngrx/store';
import { employeeFeatureKey, EmployeeReducer } from './employee/employee.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { EmployeeEffects } from './employee/employee.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideStore(),
    provideState(employeeFeatureKey, EmployeeReducer),
    provideHttpClient(),
    provideEffects(EmployeeEffects),
    provideStoreDevtools({maxAge:25 , logOnly:false})
  ]
};
