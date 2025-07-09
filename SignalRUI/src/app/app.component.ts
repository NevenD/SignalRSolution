import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import * as ol from 'ol';
import { Map, View } from 'ol';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'SignalRUI';

  private map!: Map;
  private markerSource = new VectorSource();
  private markerFeature = new Feature();

  private hubConnection!: signalR.HubConnection;

  ngOnInit(): void {
    this.initMap();
    this.initSignalR();
  }

  private initMap() {
    this.markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/blast.png',
        }),
      })
    );

    this.markerSource.addFeature(this.markerFeature);

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({ source: this.markerSource }),
      ],
      view: new View({
        center: fromLonLat([-122, 37]),
        zoom: 10,
      }),
    });
  }

  private initSignalR() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5164/mapHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.error('SignalR connection error', err));

    this.hubConnection.on('ReceiveLocation', (lat: number, lon: number) => {
      const coords = fromLonLat([lon, lat]);
      (this.markerFeature.getGeometry() as Point).setCoordinates(coords);
      this.map.getView().setCenter(coords);
    });
  }
}
