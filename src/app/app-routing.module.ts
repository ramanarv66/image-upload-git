import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component';
import { LogoutComponent } from './logout/logout.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ScoresComponent } from './scores/scores.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'candidate', component: CandidateComponent },
  { path: 'scores', component: ScoresComponent },
  { path: 'about', component: AboutComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'question-paper', component: QuestionPaperComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
