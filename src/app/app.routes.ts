import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo : 'login',
        pathMatch : 'full'
    } ,
    {
        path: 'login',
        component : LoginComponent
    },
    {
        path: 'register',
        component : RegisterComponent
    } ,
    {
        path: '',
        component : LayoutComponent,
        children:[
            {
                path: 'home',
                component : HomeComponent, 
            }  
            
        ]
    },{
        path: '**',
        component: PagenotfoundComponent,
    }
];
