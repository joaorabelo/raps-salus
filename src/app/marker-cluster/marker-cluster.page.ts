import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  MarkerCluster,
  Marker
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-marker-cluster',
  templateUrl: './marker-cluster.page.html',
  styleUrls: ['./marker-cluster.page.scss'],
})
export class MarkerClusterPage implements OnInit {
  map: GoogleMap;


  constructor(private platform: Platform) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: -10.6120567,
          lng: -37.7495438
        },
        zoom: 15
      }
    });

    this.addCluster(this.dummyData());
  }

  filterHealthCondition(healthCondition) {

    this.addCluster(this.dummyData(healthCondition));
  }

  addCluster(data) {
    const markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
      markers: data,
      icons: [
        {
          min: 3,
          max: 9,
          url: './assets/markercluster/small.png',
          label: {
            color: 'white'
          }
        },
        {
          min: 10,
          url: './assets/markercluster/large.png',
          label: {
            color: 'white'
          }
        }
      ]
    });

    markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
      const marker: Marker = params[1];
      marker.setTitle(marker.get('name'));
      marker.setSnippet(marker.get('sus'));
      marker.setSnippet(marker.get('heath'));
      marker.showInfoWindow();
    });

  }

  dummyData(heathCategory = 'todos') {
    var data = [
      {
        position: {
          lat: -10.611720,
          lng: -37.748587
        },
        name: 'João Rabelo de Araujo',
        sus: '9989878967126',
        heath: 'diabetico',
        icon: 'assets/markercluster/diabetico.png'
      },
      {
        position: {
          lat: -10.611912,
          lng: -37.749086
        },
        name: 'Eloi Morais',
        sus: '9989878967120',
        heath: 'crianca',
        icon: 'assets/markercluster/crianca.png'
      },
      {
        position: {
          lat: -10.611528,
          lng: -37.747343
        },
        name: 'Patricia Santos',
        sus: '99898789671123',
        heath: 'gestante',
        icon: 'assets/markercluster/gestante.png'
      },
      {
        position: {
          lat: -10.611630,
          lng: -37.747045
        },
        name: 'Rosey Mary Santana',
        sus: '9989878967106',
        heath: 'hipertenso',
        icon: 'assets/markercluster/hipertenso.png'
      },
      {
        position: {
          lat: -10.612300,
          lng: -37.748515
        },
        name: 'Aryel Gois',
        sus: '9989878967106',
        heath: 'hipertenso',
        icon: 'assets/markercluster/hipertenso.png'
      }
    ];

    if (heathCategory === 'todos') {
      return data;
    } else {
     let filter = data.filter((user) => {
      return user.heath === heathCategory;
    });
     console.log(filter);
     return filter;
    }
  }
}
