import { FirebaseErrorService } from './../../services/firebase-error.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{

  registerUser!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private router: Router,
              private firebaseError: FirebaseErrorService
              ) {
    this.registerUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  register(){
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;
    const confirmPassword = this.registerUser.value.confirmPassword;

    if(password != confirmPassword) {
      this.toastr.error(this.firebaseError.codeError('As senhas inseridas devem ser as mesmas'), 'Error');
      return;
    }

    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.loading = false;
      this.toastr.success('Usuário registrado com sucesso', 'Usuário registrado');
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

}
