import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { BrandComponent } from './pages/brand/brand.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      // { path: 'profile', component: ProfileComponent },
      { path: 'brands', component: BrandComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' } // Redirect any unknown routes to home
];


// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   { path: 'brands', component: BrandComponent },
//   {
//     path: '',
//     component: LayoutComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: '', component: DashboardComponent }
//     ]
//   },
//   { path: '**', redirectTo: '' }
// ];
