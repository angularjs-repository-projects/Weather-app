import {Injectable} from "angular2/core";
import {WEATHER_ITEMS} from "./weather.data";
import {Observable} from "rxjs/Observable";
import {Http} from "angular2/http";
import {WeatherItem} from "./weather-item";
import "rxjs/Rx"

@Injectable()

export class WeatherService {

  constructor(private _http: Http) {}

  getWeatherItems() {
    return WEATHER_ITEMS;
  }

  addWeatherItem(weatherItem: WeatherItem) {
    WEATHER_ITEMS.push(weatherItem);
  }

  searchWeatherData(cityName:string):Observable<any> {

    if(cityName.length!=0) {
      var result = this._http.get("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8bd129978c328b1b47267ebef4947b31&units=metric")
        .map(response => response.json());

      return result;
    }




    /*
    return this._http.get
      .catch(error => {
          console.log(error);
          return Observable.throw(error.json())
      })
      */
  }

  clearWeatherItems() {
    WEATHER_ITEMS.splice(0);
  }
}
