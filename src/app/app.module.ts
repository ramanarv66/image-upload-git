import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component';
import { LogoutComponent } from './logout/logout.component';
import { ScoresComponent } from './scores/scores.component';
import { AboutComponent } from './about/about.component';
import { CandidateComponent } from './candidate/candidate.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    LoginComponent,
    QuestionPaperComponent,
    LogoutComponent,
    ScoresComponent,
    AboutComponent,
    CandidateComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
