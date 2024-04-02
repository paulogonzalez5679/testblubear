import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;
  registerData: FormGroup;

  loginState: boolean = true;
  registerState: boolean = true;
  nameUser!: string | null;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private  alertController : AlertController,
    private router: Router,
    private authService: AuthService
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    this.registerData = this.fb.group({
      emailRegister: ['', [Validators.required, Validators.email]],
      passwordRegister: ['', [Validators.required, Validators.minLength(6)]],
      nameRegister:['',[Validators.required]]
    })
  }

  get email()
  {
    return this.credentials.get('email')
  }
  get password()
  {
    return this.credentials.get('password')
  }

  get emailRegister()
  {
    return this.credentials.get('email')
  }
  get passwordRegister()
  {
    return this.credentials.get('password')
  }
  get nameRegister()
  {
    return this.credentials.get('password')
  }


  ngOnInit() {
    const _this = this
    _this.loginState = true
    _this.registerState = false

    _this.credentials = _this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    _this.registerData = _this.fb.group({
      emailRegister: ['', [Validators.required, Validators.email]],
      passwordRegister: ['', [Validators.required, Validators.minLength(6)]],
      nameRegister:['',[Validators.required]]
    })
  }
  ionViewWillEnter(){
    const _this = this
    _this.loginState = true
    _this.registerState = false

    _this.credentials = _this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    _this.registerData = _this.fb.group({
      emailRegister: ['', [Validators.required, Validators.email]],
      passwordRegister: ['', [Validators.required, Validators.minLength(6)]],
      nameRegister:['',[Validators.required]]
    })
  }

  async register(){
    const _this = this
    _this.loginState = false
    _this.registerState = true
    const loading = await _this.loadingController.create()
    await loading.present()

    const user = await _this.authService.register(_this.registerData.value)

    await loading.dismiss();

    if(user)
    {
      const email = await _this.authService.sendEmail(user.user)
      _this.showAlert('Registro exitoso!', 'Por favor revisa tu correo y confirma tu registro')
    }
    else{
      _this.showAlert('Registro fallido!', 'Por favor intentalo de nuevo')
    }
  }

  async login(){
    const _this = this
    _this.loginState = true
    _this.registerState = false
    const loading = await _this.loadingController.create()
    await loading.present()
    const user = await _this.authService.login(_this.credentials.value)
    await loading.dismiss();

    if(user && user.user.emailVerified)
    {
      _this.router.navigateByUrl('/home',{replaceUrl: true})
      const nameUser = user.user.displayName ? user.user.displayName : '';
      console.log('====================================');
      console.log("usuario:",user.user.displayName);
      console.log('====================================');
      localStorage.setItem('user', nameUser);
    }
    else if(!user){
      _this.showAlert('Ingreso fallido!', 'Correo y/o contraseña incorrectos')
    }
    else if(user && !user.user.emailVerified){
      _this.showAlert('Ingreso fallido!', 'Valida tu correo electronico')
    }
  }

  async changeState(state: string)
  {
    const _this = this
    if(state =='login')
    {
      _this.loginState = true
      _this.registerState = false
    }
    else if(state == 'register') {
      _this.loginState = false
      _this.registerState = true
    }
  }

  async showAlert(header:any, message:any)
  {
    const alert = await this.alertController.create(
    {
      header,
      message,
      buttons: ['OK']
    });
    await alert.present()
  }
}
