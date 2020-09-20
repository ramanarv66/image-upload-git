import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component';
import { LogoutComponent } from './logout/logout.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ScoresComponent } from './scores/scores.component';
import { AboutComponent } from './about/about.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { RegisterComponent } from "./register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { ChartsComponent } from "./charts/charts.component";


const routes: Routes = [
  //  { path: '', component: ScoresComponent },
  { path: '', component: WelcomeComponent },
  // { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'charts', component: ChartsComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'candidate', component: CandidateComponent, canActivate: [AuthGuardService] },
  { path: 'scores', component: ScoresComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'upload', component: FileUploadComponent, canActivate: [AuthGuardService] },
  { path: 'question-paper', component: QuestionPaperComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
