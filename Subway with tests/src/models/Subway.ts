import line from '../interfaces/line'
import Line from './Line';

export default class Subway {

    line: Line;

    constructor(line: Line) {
        this.line = line;
    }

    getAllLines(): line[] {
        let allStations: line[] = [];

        let U1 = this.line.getU1();
        let U2 = this.line.getU2();
        let U3 = this.line.getU3();
        let U4 = this.line.getU4();
        let U6 = this.line.getU6();

        allStations.push(U1, U2, U3, U4, U6);

        return allStations;
    }

    getIntersection(subwayLine: line): String[] {
        const numberOfStations: number = subwayLine.stations.length;
        const stations: { name: String; line: String; intersection: String }[] = subwayLine.stations;
        let intersections: String[] = [];

        for (let i = 0; i < numberOfStations; i++) {
            if (stations[i].intersection !== "none") {
                intersections.push(stations[i].intersection);
            }
        }
        return intersections;
    }

    getStationsNameOnIntersection(firstLine: String, secondLine: String) {

    }

    getLine(startingLineName: String) {
        let getLine: string = `this.line.get${startingLineName}()`;
        let line = eval(getLine);
        return line;
    }
}