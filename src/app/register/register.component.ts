import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterRequest} from "../model/register-request";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RegisterService} from "./register.service";
import {RegisterResponse} from "../model/register-response";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm', { static: false }) formValues;
  register: RegisterRequest = new RegisterRequest();
  showPassWordWarn: boolean;
  showSuccessMsg: boolean;
  showSpinner: boolean = false;
  registerForm: FormGroup;
  constructor(public registerService: RegisterService, public  snackBar: MatSnackBar,) { }

  ngOnInit() {
  }
  signIn(): void {
    console.log(this.register)
    this.showSpinner = true;

    if (this.register.password != this.register.confirmpassword) {
      this.showPassWordWarn = true;
    } else {
      this.showPassWordWarn = false;
      console.log(this.register)
      this.registerService.register(this.register).subscribe((resp: RegisterResponse) => {
        if (resp) {
          console.log("Response finally Got " + resp)
          // this.showSuccessMsg = true;
          this.showSnackBar();
          this.showSpinner = false;
        }

      }, () => {
        this.showSpinner = false;
      });
    }

  }
  reset(): void {
    this.formValues.reset();
  }
  validatePassword(): void {
    if (this.register.password != this.register.confirmpassword) {
      this.showPassWordWarn = true;
    } else {
      this.showPassWordWarn = false;
    }
  }
  cancel(): void {
    this.formValues.reset();
  }
  showSnackBar() {
    this.snackBar.open('Registration Successfull, Please check Email', 'close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
