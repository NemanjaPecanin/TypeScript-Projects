import Line from "../../src/models/Line";
import { describe, expect, it } from "@jest/globals";

describe("Line", () => {
    let line;

    beforeEach(() => {
        line = new Line();
    });

    it("should return U1 line", () => {
        const U1 = line.getU1();

        expect(U1).toEqual(expect.any(Object));
    })

    it("should contain station Rathaus of Line U2", () => {
        const station = "Rathaus";

        const U2 = line.getU2();

        expect(U2.stations).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: station
                })
            ])
        )
    })

    it("should check if line U1 has Stephansplatz stations", () => {
        const stationName = "Stephansplatz";
        const U1 = line.getU1();

        const hasStation = line.hasStation(U1, stationName);

        expect(hasStation).toBeTruthy();
    })

});
