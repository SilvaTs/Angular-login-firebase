import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit{

  registerUser!: FormGroup;

  constructor(private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService) {
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
   
    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
    }).catch((error) => {
      console.log(error);
      this.toastr.error(this.fireBaseError(error.code), 'Error');
    })
  }

  fireBaseError(code: string) {
    switch(code){
      case 'auth/email-already-in-use':
        return 'O usuário já existe';
        case 'auth/weak-password':
          return 'A senha é muito fraca';
          case 'auth/invalid-email':
          return 'Email inválido';
      default:
        return 'Erro desconhecido';  
    }
  }
}
