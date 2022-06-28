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
    lat: 16.9769333,
    lng: 82.1770209,
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
    // Move the map programmatically
    await this.newMap.setCamera({
      coordinate: {
        lat: this.center.lat,
        lng: this.center.lng,
        // lat: 28.782991,
        // lng: 76.945626,
      },
      animate: true
    });
       // Enable marker clustering
      // await this.newMap.enableClustering();

      // await this.newMap.enableTrafficLayer(true);

      await this.newMap.enableCurrentLocation(true);


  // to get the marker in the center of the map
          this.addMarkers(this.center.lat, this.center.lng);
          this.addListeners();

    } catch(e)
     {
      console.log(e);
    }

  }


  async addMarkers(lat, lng){
    // add a marker to the map the existing marker wil remove
    // eslint-disable-next-line curly
    // if(this.markerId)this.removeMarker();
   await this.newMap.addMarkers([
      {
        coordinate:{
          // eslint-disable-next-line object-shorthand
          lat: lat,
          // eslint-disable-next-line object-shorthand
          lng: lng,
        },
      draggable: true
    },
    {
      coordinate:{
        // eslint-disable-next-line object-shorthand
        lat: 17.416147,
        // eslint-disable-next-line object-shorthand
        lng: 78.4103525,
      },
    draggable: false
  },
  {
    coordinate:{
      // eslint-disable-next-line object-shorthand
      lat: 17.4460884,
      // eslint-disable-next-line object-shorthand
      lng: 78.3792551,
    },
  draggable: false
},
{
  coordinate:{
    // eslint-disable-next-line object-shorthand
    lat: 17.4433649,
    // eslint-disable-next-line object-shorthand
    lng: 78.3618784,
  },
draggable: false
},
{
  coordinate:{
    // eslint-disable-next-line object-shorthand
    lat: 17.4371357,
    // eslint-disable-next-line object-shorthand
    lng: 78.4831912,
  },
draggable: false
}
  ]);
  }
  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }
  async addListeners() {
    // Handle marker click
    await this.newMap.setOnMarkerClickListener((event) => {
      console.log('setOnMarkerClickListener', event);
      // this line is for remove the markers which u clicked
      this.removeMarker(event.markerId);

    });

    //   await this.newMap.setOnCameraMoveStartedListener((event) => {
    //   console.log(event);
    // });

       await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      this.addMarkers(event.latitude, event.longitude);
    });

    // await this.newMap.setOnMyLocationButtonClickListener((event) => {
    //   console.log('setOnMyLocationButtonClickListener', event);
    //   this.addMarker(event.latitude, event.longitude);
    // });

    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      this.addMarkers(event.latitude, event.longitude);
    });

  }




}
