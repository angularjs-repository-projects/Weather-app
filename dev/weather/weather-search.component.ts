import {Component} from "angular2/core";
import {ControlGroup} from "angular2/src/common/forms/model";
import {WeatherService} from "./weather.service";
import {WeatherItem} from "./weather-item";
import {Subject} from "rxjs/Subject";
import {OnInit} from "angular2/src/core/linker/interfaces";

@Component({
  selector: "my-weather-search",
  template: `
    <section class="weather-search">
      <form (ngSubmit)="onSubmit()">
        <label for="city">City</label>
        <input ngControl="location" type="text" id="city" (input)="onSearchLocation(input.value)" #input required/>
        <button type="submit">Add City</button>
    </form>
    <div>
      <span class="info">City found:</span>{{data.name}}
</div>
    </section>
  `,
})

export class WeatherSearchComponent implements OnInit {

  private searchStream = new Subject<string>(); //obj for listen
  constructor(private _weatherService: WeatherService) {};
  data: any = {};

  onSubmit() {

    //console.log(form.value);


  const weatherItem = new WeatherItem(this.data.name, this.data.weather[0].description, this.data.main.temp);
  this._weatherService.addWeatherItem(weatherItem);


  }

  onSearchLocation(cityName: string) {
    this.searchStream.next(cityName);
  }

  ngOnInit(){
    this.searchStream
      .debounceTime(300)  //wait 300 ms
      .distinctUntilChanged()   //only id input changes
      .switchMap((input:string) => this._weatherService.searchWeatherData(input))
      .subscribe(
      data => this.data = data
    );
  }
}
