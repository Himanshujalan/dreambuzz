import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../model/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  isTypePassword: boolean = true;

  userObj: User = {
    uid: '',
    email: '',
    name: '',
    public: true,
    user: true,
    about: '',
    age: 0,
    gender: '',
    mobile: '',
    state: '',
    city: ''
  }

  constructor(
    private auth: AuthService
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.signupForm = new FormGroup({
      username: new FormControl('', 
        {validators: [Validators.required]}
      ),
      email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(!this.signupForm.valid) return;
    this.userObj.email = this.signupForm.value.email;
    this.userObj.name = this.signupForm.value.username;
    this.auth.createUser(this.userObj, this.signupForm.value.password);
    // console.log(this.signupForm.value);
  }
}
