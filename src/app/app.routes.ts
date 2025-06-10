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
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'bills',
                component: BillsComponent,
            },
            {
                path: 'complaints',
                component: ComplaintsComponent,
            },
            {
                path: 'bookings',
                component: BookingsComponent,
            },
            {
                path: 'notices',
                component: NoticesComponent,
            },
            {
                path: 'visitors',
                component: VisitorsComponent,
            },
            {
                path: 'flats',
                component: FlatsComponent,
            }

        ]
    }, {
        path: '**',
        component: PagenotfoundComponent,
    }
]; 