import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { BoardComponent } from './components/board/board.component';
import { ContactsComponent } from './components/contacts/contacts.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent, children: [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'login', component: LoginComponent},
        {path: 'register', component: SignUpComponent}
    ]},
    {path: 'main', component: MainComponent},
];



// children: [
//     {path: 'summary', component: SummaryComponent},
//     {path: 'add-task', component: AddTaskComponent},
//     {path: 'board', component: BoardComponent},
//     {path: 'contact', component: ContactsComponent}
// ]