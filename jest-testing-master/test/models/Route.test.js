import { describe, expect, it } from "@jest/globals";
import Subway from "../../src/models/Subway";
import Line from "../../src/models/Line";
import Route from "../../src/models/Route";


describe("Route", () => {
    let line;
    let subway;
    let route;

    beforeEach(() => {
        line = new Line();
        subway = new Subway(line);
        route = new Route(subway, line);
    });

    it("should return line name", () => {
        const stationName = route.findStationsLineName("Reumanplatz");

        expect(stationName).toEqual("U1");
    })

    it("should return route from strart to end destination", () => {
        const calculatedRoute = route.findRoute("Rathaus", "Praterstern");
        const expectedRoute = ["Rathaus", "Schottentor", "Schottenring", "Taborstraße", "Praterstern"];

        expect(calculatedRoute).toEqual(expect.any(Array));
        expect(calculatedRoute).toEqual(expectedRoute)
    })

    it("should return array of stations of the same line", () => {
        const startingStation = "Rathaus";
        const endingStation = "Praterstern";

        const U1 = line.getU1();
        const stations = route.calculateRoutOfSameLine(startingStation, endingStation, U1.stations);

        expect(stations).toEqual(expect.any(Array));
    })

    it("should return index 3 of station Rathaus", () => {
        const station = "Rathaus";

        const U2 = line.getU2();
        const index = route.findStationPositionInLine(station, U2.stations);

        expect(index).toBe(3);
    })

    it("should return route from Siebenhirten to Erdberg", () => {
        const calculatedRoute = route.findRoute("Siebenhirten", "Erdberg");
        const expectedRoute = ['Siebenhirten',
            'Perfektastraße',
            'Erlaaer Straße',
            'Alt Erlaa',
            'Am Schöpfwerk',
            'Tscherttegasse',
            'Philadelphiabrücke',
            'Niederhofstraße',
            'Längenfeldgasse',
            'Gumpendorfer Straße',
            'Westbahnhof',
            'Westbahnhof',
            'Zieglergasse',
            'Neubaugasse',
            'Volkstheater',
            'Herrengasse',
            'Stephansplatz',
            'Stubentor',
            'Landstraße',
            'Rochusgasse',
            'Kard.-Nagl-Platz',
            'Schlachthausgasse',
            'Erdberg']

        expect(expectedRoute).toEqual(calculatedRoute);
    })

    it("Should return common station Westbahnhof of stations U6 and U3", () => {
        const U6 = line.getU6();
        const U3 = line.getU3();

        const commonStation = route.findCommonStation(U6, U3);

        expect(commonStation).toEqual("Westbahnhof");
    })

    it("should return route Siebenhirten strart to Hütteldorf", () => {
        const calculatedRoute = route.findRoute("Siebenhirten", "Hütteldorf");
        const expectedRoute = [
            'Siebenhirten',
            'Perfektastraße',
            'Erlaaer Straße',
            'Alt Erlaa',
            'Am Schöpfwerk',
            'Tscherttegasse',
            'Philadelphiabrücke',
            'Niederhofstraße',
            'Längenfeldgasse',
            'Längenfeldgasse',
            'Meidling Hauptstraße',
            'Schönbrunn',
            'Hietzing',
            'Braunschweiggasse',
            'Unter St. Veit',
            'Ober St. Veit',
            'Hütteldorf'
        ]
        expect(expectedRoute).toEqual(calculatedRoute);
    })

});
