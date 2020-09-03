import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterRequest} from "../model/register-request";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RegisterService} from "./register.service";
import {RegisterResponse} from "../model/register-response";

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
  constructor(public registerService: RegisterService) { }

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
          this.showSuccessMsg = true;
        }

      }, () => {
        this.showSuccessMsg = true;
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
    this.showSuccessMsg = false;
  }
}
