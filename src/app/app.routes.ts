import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BillsComponent } from './bills/bills.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { BookingsComponent } from './bookings/bookings.component';
import { NoticesComponent } from './notices/notices.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { FlatsComponent } from './flats/flats.component';
import { authGuard } from './auth.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
                canActivate : [authGuard]
            },
            {
                path: 'bills',
                component: BillsComponent,
                canActivate : [authGuard]
                
            },
            {
                path: 'complaints',
                component: ComplaintsComponent,
                canActivate : [authGuard]
            },
            {
                path: 'bookings',
                component: BookingsComponent,
                canActivate : [authGuard]
            },
            {
                path: 'notices',
                component: NoticesComponent,
                canActivate : [authGuard]
            },
            {
                path: 'visitors',
                component: VisitorsComponent,
                canActivate : [authGuard]
            },
            {
                path: 'flats',
                component: FlatsComponent,
                canActivate : [authGuard]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate : [authGuard],
            },
            {
                path: 'manage-users',
                component: ManageUsersComponent,
                canActivate : [authGuard],
            },
            {
                path: 'registerAdmin',
                component: RegisterAdminComponent,
                canActivate : [authGuard],
            }

        ]
    }, {
        path: '**',
        component: PagenotfoundComponent,
    }
]; 