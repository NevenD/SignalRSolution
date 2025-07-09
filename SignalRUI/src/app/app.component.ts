import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import * as ol from 'ol';
import { Map, View } from 'ol';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Icon from 'ol/style/Icon';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
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
    this.markerFeature = new Feature({
      geometry: new Point(fromLonLat([-122, 37])),
    });

    this.markerFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: 'rgba(255, 0, 0, 0.8)' }), // red fill
          stroke: new Stroke({ color: '#fff', width: 2 }), // white border
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
      .withUrl('https://localhost:7032/mapHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.error('SignalR connection error', err));

    this.hubConnection.on('RecieveLocation', (lat: number, lon: number) => {
      const coords = fromLonLat([lon, lat]);

      const newFeature = new Feature({
        geometry: new Point(coords),
      });

      this.markerSource.addFeature(newFeature);
      console.log(coords);

      this.map.getView().setCenter(coords);
    });
  }
}
