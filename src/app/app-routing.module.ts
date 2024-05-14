import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { MatiereComponent } from './matieres/matiere.component';
import { FormesComponent } from './formes/formes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent } ,
// Redirects to Register by default
  { path: 'matiere', component: MatiereComponent },
  { path: 'Formes', component: FormesComponent },
  // { path: '', redirectTo: '/', pathMatch: 'full' }, // Ensure this redirects correctly
  { path: 'main', component:  MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
