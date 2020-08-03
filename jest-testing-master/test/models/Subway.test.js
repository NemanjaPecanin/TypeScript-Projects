import Subway from "../../src/models/Subway";
import { describe, expect, it } from "@jest/globals";
import Line from "../../src/models/Line";

describe("Subway", () => {
    let subway;
    let line;

    beforeEach(() => {
        line = new Line();
        subway = new Subway(line);
    });

    it("should return intersection of U6", () => {
        const U1 = line.getU1();
        const intersection = subway.getIntersection(U1);

        expect(intersection).toEqual(expect.any(Array))
    })

    it("should return all lines", () => {
        const allLines = subway.getAllLines();

        expect(allLines).toEqual(expect.any(Array));
    })

    it("should contain station Westbahnhof", () => {
        const station = "Westbahnhof";

        const lines = subway.getAllLines();
        const U6 = lines[4].stations;

        expect(U6).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: station
                })
            ])
        )
    })

});
