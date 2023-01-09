import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form: FormGroup;
  isTypePassword: boolean = true;

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.resetForm();
  }

  
  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }

  resetForm()
  {
    this.form.controls['email'].setValue('');
    this.form.controls['password'].setValue('');
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(!this.form.valid) return;
    this.auth.logIn(this.form.value.email, this.form.value.password);
  }
}
