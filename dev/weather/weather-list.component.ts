import {Component, OnInit} from "angular2/core";
import {WeatherItemComponent} from "./weather-item.component";
import {WeatherItem} from "./weather-item";
import {WeatherService} from "./weather.service";

@Component({
    selector: 'weather-list',
    template: `
        <section class="weather-list"> 
            <weather-item *ngFor="#item of weatherItems" [myItem]="item"> </weather-item>
        </section>
    `,
    directives: [WeatherItemComponent],
})

export class WeatherListComponent implements OnInit{
    weatherItems: WeatherItem[];

    constructor(private _weatherService: WeatherService) { }

    //grad ALL data
    ngOnInit():any {
        this.weatherItems = this._weatherService.getWeatherItems();
    }
}
