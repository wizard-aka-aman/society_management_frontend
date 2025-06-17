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
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { AddSocietyComponent } from './add-society/add-society.component';
import { SocietySettingComponent } from './society-setting/society-setting.component';

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
                canActivate : [authGuard], 
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
            },
            {
                path: 'success',
                component: SuccessComponent,
                canActivate : [authGuard],
            },
            {
                path: 'cancel',
                component: CancelComponent,
                canActivate : [authGuard],
            },
            {
                path: 'add-society',
                component: AddSocietyComponent,
                canActivate : [authGuard],  
            },
            {
                path: 'societysetting',
                component: SocietySettingComponent,
                canActivate : [authGuard],  
            }

        ]
    }, {
        path: '**',
        component: PagenotfoundComponent,
    }
]; 