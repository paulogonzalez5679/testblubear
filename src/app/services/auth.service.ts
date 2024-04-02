import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, updateProfile } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth,) { }

  async register({ emailRegister, passwordRegister, nameRegister }: { emailRegister: any, passwordRegister: any, nameRegister:any }) {
    const _this = this

    try {
      const user = await createUserWithEmailAndPassword(_this.auth, emailRegister, passwordRegister)
      await updateProfile(user.user, { displayName: nameRegister })
      return user
    } catch (error) {
      console.error(error);
      return null
    }
  }


  async sendEmail(user: any){
    try {
      const mailValidation =  sendEmailVerification(user)
      console.log('====================================');
      console.log('Correo Enviado');
      console.log('====================================');
    return mailValidation
    } catch (error) {
      console.error('====================================');
      console.error('ERROR', error);
      console.error('====================================');
    }

  }
  async login({ email, password }: { email: any, password: any }) {
    const _this = this
    try {
      const user = await signInWithEmailAndPassword(_this.auth, email, password)
      return user
    } catch (error) {
      console.error(error);
      return null
    }
  }
  logout() {
    return signOut(this.auth)
  }
}
