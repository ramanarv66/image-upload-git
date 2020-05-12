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
import { HttpClientModule } from '@angular/common/http';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WaringModalComponent } from '../app/waring-modal/waring-modal.component';
import { Modal1Component } from './modal1/modal1.component';
import { MymodalComponent } from './mymodal/mymodal.component';
import { RightClickDirective } from './directives/right-click.directive';
import { KeyDownDirective } from './directives/key-down.directive';


@NgModule({
  declarations: [
    AppComponent,
    WaringModalComponent,
    FileUploadComponent,
    HeaderComponent,
    LoginComponent,
    QuestionPaperComponent,
    LogoutComponent,
    ScoresComponent,
    AboutComponent,
    CandidateComponent,
    JwPaginationComponent,
    TestComponent,
    Modal1Component,
    MymodalComponent,
    RightClickDirective,
    KeyDownDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, NgxPaginationModule,
    HttpClientModule,
    ModalModule.forRoot()

  ],
  entryComponents: [
    Modal1Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
