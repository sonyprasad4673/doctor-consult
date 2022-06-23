import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap} from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any ={
    lat: 17.4121531,
    lng: 78.1278605,
  };
  markerId: string;

  constructor() { }

  ngOnInit() {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    try{
          this.newMap = await GoogleMap.create({
      id: 'ionic-firebase-authentication',
      element: this.mapRef.nativeElement,
      apiKey: environment.google_maps_api_key,
      config: {
        center: this.center,
        zoom: 13,
      },
    });


  // to get the marker in the center of the map
this.addMarkers(this.center.lat, this.center.lng);
this.addListeners();

    } catch(e) {
      console.log(e);
    }
//     this.newMap = await GoogleMap.create({
//       id: 'ionic-firebase-authentication',
//       element: this.mapRef.nativeElement,
//       apiKey: environment.google_maps_api_key,
//       config: {
//         center: this.center,
//         zoom: 13,
//       },
//     });


//   // to get the marker in the center of the map
// this.addMarker(this.center.lat, this.center.lng);
// this.addListeners();
  }
  addMarkers(lat: any, lng: any) {
    throw new Error('Method not implemented.');
  }


  async addMarker(lat, lng){
    // add a marker to the map
    // eslint-disable-next-line curly
    // if(this.markerId)this.removeMarker();
    this.markerId = await this.newMap.addMarker({
      coordinate : {
       // eslint-disable-next-line object-shorthand
       lat: lat,
       // eslint-disable-next-line object-shorthand
       lng: lng,
      },

      draggable: true
    });
  }
  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }
  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      console.log('setOnMarkerClickListener', event);
      this.removeMarker(event.markerId);
    });

    //   await this.newMap.setOnCameraMoveStartedListener((event) => {
    //   console.log(event);
    // });

       await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

    // await this.newMap.setOnMyLocationButtonClickListener((event) => {
    //   console.log('setOnMyLocationButtonClickListener', event);
    //   this.addMarker(event.latitude, event.longitude);
    // });

    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      this.addMarker(event.latitude, event.longitude);
    });

  }


}
