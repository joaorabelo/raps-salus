import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private location: any;
  private user: any;
  private healthCondition: string;
  private name: string;

  private position: string;

  constructor(private geolocation: Geolocation, private route: Router) { }

  ngOnInit() {
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      this.position = this.location.lat + ' ' + this.location.lng;
      console.log('LOCALIZAÇÃO:', this.location);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  save() {
    this.user = {
      location: this.location,
      name: this.name,
      healthCondition: this.healthCondition
    };
    this.route.navigate(['tabs/markerCluster']);
    console.log('USUÁRIO:', this.user);
  }

}
