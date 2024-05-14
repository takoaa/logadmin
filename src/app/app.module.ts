
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatiereComponent } from './matieres/matiere.component';
import { AjoutMateriauComponent } from './ajout-materiau/ajout-materiau.component';
import { FormesComponent } from './formes/formes.component';
import { DecorsComponent } from './decors/decors.component';
import { AjoutFormesComponent } from './ajout-formes/ajout-formes.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { ChartModule } from 'angular-highcharts';
import { NgModule} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    MatiereComponent,
    AjoutMateriauComponent,
    FormesComponent,
    DecorsComponent,
    AjoutFormesComponent,
   
    MainComponent,
        RegisterComponent,
        LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FontAwesomeModule, // Keep only one import of FontAwesomeModule
    HttpClientModule,
    ChartModule,
    ReactiveFormsModule
  ],
  
  providers: [],  
  bootstrap: [AppComponent]
})
export class AppModule { }
