import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { DashboardComponent } from './employees/dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileExtenstionValidatorDirective } from './directives/file-extenstion-validator.directive';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { HighlightDirective } from './directives/highlight.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HighlightSearchedDirective } from './directives/highlight-searched.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddEmployeeComponent,
    FileExtenstionValidatorDirective,
    EditEmployeeComponent,
    HighlightDirective,
    HighlightSearchedDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
