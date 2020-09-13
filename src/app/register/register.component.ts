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
  showError: boolean;
  showSuccess: boolean;
  errorMessage = 'Error in Registration, Pleasse Contact HR';
  successMsg = 'Registration Successful, Please check your registered Email';
  registerForm: FormGroup;
  constructor(public registerService: RegisterService, public  snackBar: MatSnackBar,) { }

  ngOnInit() {
  }
  signIn(): void {
    if (this.register.password != this.register.confirmpassword) {
      this.showPassWordWarn = true;
    } else {
      this.showPassWordWarn = false;
      console.log(this.register)
      this.showSpinner = true;
      this.registerService.register(this.register).subscribe((resp: RegisterResponse) => {
        if (resp) {
          console.log("Response finally Got " + resp)
          // this.showSuccessMsg = true;
          this.showSnackBar(this.successMsg);
          this.showSpinner = false;
          this.showSuccess = true;
        }

      }, () => {
        this.showSpinner = false;
        this.showError = true;
        this.showSnackBar(this.errorMessage);
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
  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
