import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare const google;
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  myLocation;
  map;
  marker;
  coordenadas;
  coord;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.initMap();
    console.log('ionViewDidLoad MapaPage');
  }

  initMap() {
    
    this.myLocation = {lat: 4.646412, lng: -74.077778};
    this.coordenadas=[];
    this.coord=[{lat:4.603899,lng: -74.067230},
      {lat:4.609375,lng: -74.082079},
      {lat:4.613610,lng: -74.066372},
      {lat:4.581586,lng: -74.080585},
      {lat:4.556693,lng: -74.112414},
      {lat:4.521438,lng: -74.089390},
      {lat:4.550937,lng: -74.141717}]
  
  
  
    console.log(this.myLocation)
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: this.myLocation,
      mapTypeId: 'satellite'
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: this.myLocation
    });
    this.marker.addListener('click', this.toggleBounce.bind(this));

    /*this.coord.forEach((punto)=>{
      this.addMarker(punto);
    });*/
    let bounds = new google.maps.LatLngBounds();
    this.coord.forEach((punto) => {
      this.addMarker(punto);
      bounds.extend(punto);
      
    })
    this.map.fitBounds(bounds);
  }
  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  addMarker(coord){
    var infoWindow =  new google.maps.InfoWindow({
      content: 'ubicado en: '+coord.lat
    });
    let internalMarker= new google.maps.Marker({
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: coord
    });
    internalMarker.addListener('click',()=>{
      infoWindow.open(this.map,internalMarker);  
    });
    console.log(internalMarker);
    this.coordenadas.push(internalMarker);
  }
  

}
