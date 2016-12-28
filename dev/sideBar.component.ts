import {Component, OnInit} from "angular2/core"
import {Profile} from "./profile";
import {ProfileService} from "./profile.service";
import {WeatherService} from "./weather/weather.service";
import {WeatherItem} from "./weather/weather-item";
import {concatStatic} from "rxjs/operator/concat";

@Component({
  selector: "my-sidebar",
  template: `
    <h3> Saved Profiles </h3>
    <button (click)="onSaveNew()">Save list to Profile</button>
    <article class="profile" *ngFor="#profile of profiles" (click)="onLoadProfile(profile)">
    <h4>{{ profile.profileName }}</h4>
    <p>Cities: {{ profile.cities.join(', ') }}</p>
    <span class="delete" (click)="onDeleteProfile($event, profile)">X</span>    
</article>
`,
  styleUrls: ['assets/scss/sidebar.scss'],
  providers: [ProfileService],
})

export class SidebarComponent implements OnInit{
  profiles: Profile[];

  constructor(private _profilesService: ProfileService, private _weatherService: WeatherService) {}

  ngOnInit() {
    this.profiles = this._profilesService.getProfiles();
  }

  onSaveNew() {
  const cities = this._weatherService.getWeatherItems().map(function (element: WeatherItem) {
return element.cityName;
  } );
  this._profilesService.saveNewProfile(cities);
  }

  onDeleteProfile(event: Event, profile: Profile) {
event.stopPropagation();
this._profilesService.deleteProfile(profile);
  }

  onLoadProfile(profile: Profile) {
    this._weatherService.clearWeatherItems();
    for(let i=0; i<profile.cities.length; i++) {
      this._weatherService.searchWeatherData(profile.cities[i])
        .retry()
        .subscribe(
          data => {
            console.log("main " + data.main);
            const weatherItem = new WeatherItem(data.name, data.weather[0].description, data.main.temp);
            this._weatherService.addWeatherItem(weatherItem);
          }
        );

    }
  }
}
