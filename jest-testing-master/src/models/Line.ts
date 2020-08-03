import line from '../interfaces/line'

export default class Line {
    getU1(): line {
        let U1 = {
            name: "U1",
            stations:
                [
                    { name: "Reumanplatz", line: "U1", intersection: "none" },
                    { name: "Keplerplatz", line: "U1", intersection: "none" },
                    { name: "Südtiroler Platz", line: "U1", intersection: "none" },
                    { name: "Taubstummengasse", line: "U1", intersection: "none" },
                    { name: "Karlsplatz", line: "U1", intersection: "U2 U4" },
                    { name: "Stephansplatz", line: "U1", intersection: "U3" },
                    { name: "Schwedenplatz", line: "U1", intersection: "U4" },
                    { name: "Nestroyplatz", line: "U1", intersection: "none" },
                    { name: "Praterstern", line: "U1", intersection: "U2" },
                    { name: "Vorgartenstraße", line: "U1", intersection: "none" },
                    { name: "Donauinsel", line: "U1", intersection: "none" },
                    { name: "Kaisermühlen V.I.C", line: "U1", intersection: "none" },
                    { name: "Alte Donau", line: "U1", intersection: "none" },
                    { name: "Kagran", line: "U1", intersection: "none" },
                    { name: "Kagraner Platz", line: "U1", intersection: "none" },
                    { name: "Rennbahnweg", line: "U1", intersection: "none" },
                    { name: "Aderklaer Straße", line: "U1", intersection: "none" },
                    { name: "Großfeldsiedlung", line: "U1", intersection: "none" },
                    { name: "Leopoldau", line: "U1", intersection: "none" },
                ]
        }
        return U1;
    }

    getU2(): line {
        let U2 = {
            name: "U2",
            stations: [
                { name: "Karlsplatz", line: "U2", intersection: "U1 U4" },
                { name: "Museumsquartier", line: "U2", intersection: "none" },
                { name: "Volkstheater", line: "U2", intersection: "U3" },
                { name: "Rathaus", line: "U2", intersection: "none" },
                { name: "Schottentor", line: "U2", intersection: "none" },
                { name: "Schottenring", line: "U2", intersection: "U4" },
                { name: "Taborstraße", line: "U2", intersection: "none" },
                { name: "Praterstern", line: "U2", intersection: "U1" },
                { name: "Messe-Prater", line: "U2", intersection: "none" },
                { name: "Krieau", line: "U2", intersection: "none" },
                { name: "Stadion", line: "U2", intersection: "none" },
                { name: "Donaumarina", line: "U2", intersection: "none" },
                { name: "Donaustadtbrücke", line: "U2", intersection: "none" },
                { name: "Stadlau", line: "U2", intersection: "none" },
                { name: "Hardeggasse", line: "U2", intersection: "none" },
                { name: "Donauspital", line: "U2", intersection: "none" },
                { name: "Aspernstraße", line: "U2", intersection: "none" }
            ]
        }
        return U2;
    }

    getU3(): line {
        let U3 = {
            name: "U3",
            stations: [
                { name: "Ottakring", line: "U3", intersection: "none" },
                { name: "Kendlerstraße", line: "U3", intersection: "none" },
                { name: "Hütteldorfer Straße", line: "U3", intersection: "none" },
                { name: "Johnstraße", line: "U3", intersection: "none" },
                { name: "Schweglerstraße", line: "U3", intersection: "none" },
                { name: "Westbahnhof", line: "U3", intersection: "U6" },
                { name: "Zieglergasse", line: "U3", intersection: "none" },
                { name: "Neubaugasse", line: "U3", intersection: "none" },
                { name: "Volkstheater", line: "U3", intersection: "none" },
                { name: "Herrengasse", line: "U3", intersection: "none" },
                { name: "Stephansplatz", line: "U3", intersection: "U1" },
                { name: "Stubentor", line: "U3", intersection: "none" },
                { name: "Landstraße", line: "U3", intersection: "U4" },
                { name: "Rochusgasse", line: "U3", intersection: "none" },
                { name: "Kard.-Nagl-Platz", line: "U3", intersection: "none" },
                { name: "Schlachthausgasse", line: "U3", intersection: "none" },
                { name: "Erdberg", line: "U3", intersection: "none" },
                { name: "Gasometer", line: "U3", intersection: "none" },
                { name: "Zipperstraße", line: "U3", intersection: "none" },
                { name: "Enkplatz", line: "U3", intersection: "none" },
                { name: "Simmering", line: "U3", intersection: "none" }
            ]
        }
        return U3;
    }

    getU4(): line {
        let U4 = {
            name: "U4",
            stations: [
                { name: "Heiligenstadt", line: "U4", intersection: "none" },
                { name: "Spittelau", line: "U4", intersection: "U6" },
                { name: "Friedensbrücke", line: "U4", intersection: "none" },
                { name: "Roßauer Lände", line: "U4", intersection: "none" },
                { name: "Schottenring", line: "U4", intersection: "U2" },
                { name: "Schwedenplatz", line: "U4", intersection: "U1" },
                { name: "Landstraße", line: "U4", intersection: "U3" },
                { name: "Stadtpark", line: "U4", intersection: "none" },
                { name: "Karlsplatz", line: "U4", intersection: "U1 U2" },
                { name: "Kettenbrückengasse", line: "U4", intersection: "none" },
                { name: "Pilgramgasse", line: "U4", intersection: "none" },
                { name: "Margaretengürtel", line: "U4", intersection: "none" },
                { name: "Längenfeldgasse", line: "U4", intersection: "U6" },
                { name: "Meidling Hauptstraße", line: "U4", intersection: "none" },
                { name: "Schönbrunn", line: "U4", intersection: "none" },
                { name: "Hietzing", line: "U4", intersection: "none" },
                { name: "Braunschweiggasse", line: "U4", intersection: "none" },
                { name: "Unter St. Veit", line: "U4", intersection: "none" },
                { name: "Ober St. Veit", line: "U4", intersection: "none" },
                { name: "Hütteldorf", line: "U4", intersection: "none" }
            ]
        }
        return U4;
    }

    getU6(): line {
        let U6 = {
            name: "U6",
            stations: [
                { name: "Siebenhirten", line: "U6", intersection: "none" },
                { name: "Perfektastraße", line: "U6", intersection: "none" },
                { name: "Erlaaer Straße", line: "U6", intersection: "none" },
                { name: "Alt Erlaa", line: "U6", intersection: "none" },
                { name: "Am Schöpfwerk", line: "U6", intersection: "none" },
                { name: "Tscherttegasse", line: "U6", intersection: "none" },
                { name: "Philadelphiabrücke", line: "U6", intersection: "none" },
                { name: "Niederhofstraße", line: "U6", intersection: "none" },
                { name: "Längenfeldgasse", line: "U6", intersection: "U4" },
                { name: "Gumpendorfer Straße", line: "U6", intersection: "none" },
                { name: "Westbahnhof", line: "U6", intersection: "U3" },
                { name: "Burggasse", line: "U6", intersection: "none" },
                { name: "Thaliastraße", line: "U6", intersection: "none" },
                { name: "Josefstädter Straße", line: "U6", intersection: "none" },
                { name: "Alser Straße", line: "U6", intersection: "none" },
                { name: "Michelbeuern AKH", line: "U6", intersection: "none" },
                { name: "Währinger Straße", line: "U6", intersection: "none" },
                { name: "Nußdorfer Straße", line: "U6", intersection: "none" },
                { name: "Spittelau", line: "U6", intersection: "U4" },
                { name: "Jägerstraße", line: "U6", intersection: "none" },
                { name: "Dresdenstraße", line: "U6", intersection: "none" },
                { name: "Handelskai", line: "U6", intersection: "none" },
                { name: "Neue Donau", line: "U6", intersection: "none" },
                { name: "Floridsdorf", line: "U6", intersection: "none" },
            ]
        }
        return U6;
    }

    hasStation(line: line, stationName: String): boolean {
        const stations = line.stations;
        let hasStation = false;

        const { length: numberOfStations } = stations;
        for (let i = 0; i < numberOfStations; i++) {
            if (stations[i].name === stationName) {
                hasStation = true;
            }
        }
        return hasStation;
    }
}