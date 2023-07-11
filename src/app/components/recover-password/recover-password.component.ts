import { Router } from '@angular/router';
import { FirebaseErrorService } from './../../services/firebase-error.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverUser!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService
  ) {
    this.recoverUser = this.fb.group({
      recoverEmail: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
  }

  Recover() {
    const email = this.recoverUser.value.recoverEmail;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
     this.toastr.info('Escolha uma nova senha para a sua conta', 'Recuperar Senha');
     this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });
  }
}
