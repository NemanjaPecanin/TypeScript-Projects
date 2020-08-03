import station from '../interfaces/station'
import line from '../interfaces/line'
import Subway from './Subway';
import Line from './Line';

export default class Route {

    subway: Subway;
    line: Line;

    constructor(subway: Subway, line: Line) {
        this.subway = subway;
        this.line = line;
    }

    findRoute(startStation: String, endStation: String) {
        let startingLineName: String;
        let endingLineName: String;
        let startingLine: line;
        let endingLine: line;
        let findIntersections: String[];

        let route: String[] = [];

        startingLineName = this.findStationsLineName(startStation);
        endingLineName = this.findStationsLineName(endStation);
        startingLine = this.subway.getLine(startingLineName);
        endingLine = this.subway.getLine(endingLineName);

        findIntersections = this.subway.getIntersection(startingLine);

        const allStationsOfStartingLine: station[] = startingLine.stations;
        const allStationsOfEndingLine: station[] = endingLine.stations;
        const startingStation = this.findStationPositionInLine(startStation, allStationsOfStartingLine);
        const endingStation = this.findStationPositionInLine(endStation, allStationsOfEndingLine);

        if (this.isSameLine(startingLineName, endingLineName)) {
            route = this.calculateRoutOfSameLine(startingStation, endingStation, allStationsOfStartingLine);
        } else {

            const { length: numberOfIntersections } = findIntersections;
            for (let i = 0; i < numberOfIntersections; i++) {

                const endingLine = this.subway.getLine(findIntersections[i]);
                if (this.line.hasStation(endingLine, endStation)) {
                    let commonStation: String = this.findCommonStation(startingLine, endingLine);
                    const commonStationIndexOfStartingLine = this.findStationPositionInLine(commonStation, allStationsOfStartingLine);
                    const commonStationIndexOfEndingLine = this.findStationPositionInLine(commonStation, allStationsOfEndingLine);

                    route = this.calculateRoutOfSameLine(startingStation, commonStationIndexOfStartingLine, allStationsOfStartingLine);
                    route.push(...this.calculateRoutOfSameLine(commonStationIndexOfEndingLine, endingStation, allStationsOfEndingLine));
                }
            }
        }
        return route;

    }

    findCommonStation(line1: line, line2: line) {
        const numberOfFirstLineStations: number = line1.stations.length;
        const numberOfSecondLineStations: number = line2.stations.length;
        const stationsOfFirstLine: station[] = line1.stations;
        const stationsOfSecondLine: station[] = line2.stations;


        for (let i = 0; i < numberOfFirstLineStations; i++) {
            for (let j = 0; j < numberOfSecondLineStations; j++) {
                if (stationsOfFirstLine[i].name === stationsOfSecondLine[j].name) {
                    return stationsOfFirstLine[i].name;
                }
            }
        }
    }

    findStationsLineName(station: String): String {
        const numberOfLines: number = this.subway.getAllLines().length;
        const lines = this.subway.getAllLines();
        let line: String = "";

        for (let i = 0; i < numberOfLines; i++) {

            const numberOfStations = lines[i].stations.length;
            for (let j = 0; j < numberOfStations; j++) {

                const stationName = lines[i].stations[j].name;
                const lineName = lines[i].name;
                if (stationName === station) {
                    line = lineName;
                }
            }
        }
        return line;
    }

    isSameLine(startingLineName: String, endingLineName: String): boolean {
        return startingLineName === endingLineName;
    }

    findStationPositionInLine(stationName: String, line: station[]) {
        return line.findIndex(x => x.name === stationName);
    }

    calculateRoutOfSameLine(startingStation: number, endingStation: number, line: station[]): String[] {
        let route: String[] = [];

        for (let i = startingStation; i <= endingStation; i++) {
            route.push(line[i].name);
        }
        return route;
    }
}