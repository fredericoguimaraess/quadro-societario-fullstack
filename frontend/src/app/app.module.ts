import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent
    ],    
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        AppComponent,
    ],
    providers: [provideHttpClient()],
    bootstrap: []
})
export class AppModule { }
