import Route from './models/Route';
import Subway from './models/Subway';
import Line from './models/Line';

let findPath: HTMLInputElement = document.getElementById('findRoute') as HTMLInputElement;

let line = new Line();
let subway = new Subway(line);
let route = new Route(subway, line);

findPath.addEventListener('click', () => {
    let startingStation: string = (<HTMLInputElement>document.getElementById("startingStation")).value;
    let endingStation: string = (<HTMLInputElement>document.getElementById("endingStation")).value;
    console.log(startingStation, endingStation);
    let stations = route.findRoute(startingStation, endingStation);
    console.log(stations);
})

console.log("Works");
