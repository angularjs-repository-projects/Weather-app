import {Component, Input} from 'angular2/core';
import {WeatherItem} from "./weather-item";

@Component({
    selector: 'weather-item',
    template: `
        <article class="weather-element">
            <div class="col-1">
                <h3>{{ weatherItem.cityName }}</h3>
                <p class="info">{{ weatherItem.description }}</p>
            </div>
            <div class="col-2"> 
                <span class="temperature">{{ weatherItem.temperature }} ºC</span>
            </div>
        </article>
    `,
    styleUrls: ['assets/scss/weather-item.scss'],
    //inputs: ['weatherItem: myItem']

})

//makes available outside file
export class WeatherItemComponent {
    //weatherItem: WeatherItem;
    @Input("myItem") weatherItem: WeatherItem;
}
