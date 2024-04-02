import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DigimonService } from '../services/digimon.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  digimons: any[] = [];
  digimonDetails: any[] = [];
  userName: any ='';
  constructor(private digimonService: DigimonService,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService,
    private  alertController : AlertController,) { }

  ngOnInit() {
    const _this = this
    _this.userName = localStorage.getItem('tutorial');
    _this.loadDigimons();
  }

  loadDigimons() {
    const _this = this
    _this.digimonService.getDigimons().subscribe((data) => {
      _this.digimons = data;
      console.log(data);
      console.log('====================================');
      console.log(_this.digimons);
      console.log('====================================');
    });

  }

  getDigimonDetails(href: any) {
    const _this = this
    if (href) {
      _this.digimonService.getDigimonDetails(href).subscribe((data) => {
        _this.digimonDetails = data;
        console.log(_this.digimonDetails);
        _this.router.navigate(['/digi-dex'], { replaceUrl: true, queryParams: { data: JSON.stringify(data) } })
      });
    } else {
    }
  }
  async logOut() {
    const _this = this
    const loading = await _this.loadingController.create()
    await loading.present()
    const user = await _this.authService.logout()
    await loading.dismiss();
    _this.router.navigate(['/'], { replaceUrl: true })
    _this.showAlert('Adiós!', 'Hasta pronto!')
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
