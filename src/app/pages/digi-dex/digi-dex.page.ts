import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-digi-dex',
  templateUrl: './digi-dex.page.html',
  styleUrls: ['./digi-dex.page.scss'],
})
export class DigiDexPage implements OnInit {
  digimonDetails: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      if (params["data"]) {
        this.digimonDetails = JSON.parse(params["data"]);
      }
    });
  }

}
