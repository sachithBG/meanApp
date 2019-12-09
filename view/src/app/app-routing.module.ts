import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { DataViewComponent } from './components/data-view/data-view.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const routes: Routes = [
  {
    path: 'sign_up', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]
},
{
    path: 'login', component: UserComponent,
    children: [{path: '', component: SignInComponent}]
},
{
    path: '', redirectTo: '/login', pathMatch: 'full'
},
{
    path: 'navbar', component: NavBarComponent, canActivate: [AuthGuard],
    children: [
        {path: '', component: HomeComponent},
        {path: 'data_view', component: DataViewComponent},
        {path: 'home', component: HomeComponent}
    ]
},
// {
//     path: 'usersMange', component: UsersManageComponent, canActivate: [AuthGuard]
//     // children: [{path: '', component: NavigationComponent},{path: '', component: FooterComponent} ],
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
