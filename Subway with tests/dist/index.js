// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"models/Route.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Route =
/** @class */
function () {
  function Route(subway, line) {
    this.subway = subway;
    this.line = line;
  }

  Route.prototype.findRoute = function (startStation, endStation) {
    var startingLineName;
    var endingLineName;
    var startingLine;
    var endingLine;
    var findIntersections;
    var route = [];
    startingLineName = this.findStationsLineName(startStation);
    endingLineName = this.findStationsLineName(endStation);
    startingLine = this.subway.getLine(startingLineName);
    endingLine = this.subway.getLine(endingLineName);
    findIntersections = this.subway.getIntersection(startingLine);
    var allStationsOfStartingLine = startingLine.stations;
    var allStationsOfEndingLine = endingLine.stations;
    var startingStation = this.findStationPositionInLine(startStation, allStationsOfStartingLine);
    var endingStation = this.findStationPositionInLine(endStation, allStationsOfEndingLine);

    if (this.isSameLine(startingLineName, endingLineName)) {
      route = this.calculateRoutOfSameLine(startingStation, endingStation, allStationsOfStartingLine);
    } else {
      var numberOfIntersections = findIntersections.length;

      for (var i = 0; i < numberOfIntersections; i++) {
        var endingLine_1 = this.subway.getLine(findIntersections[i]);

        if (this.line.hasStation(endingLine_1, endStation)) {
          var commonStation = this.findCommonStation(startingLine, endingLine_1);
          var commonStationIndexOfStartingLine = this.findStationPositionInLine(commonStation, allStationsOfStartingLine);
          var commonStationIndexOfEndingLine = this.findStationPositionInLine(commonStation, allStationsOfEndingLine);
          route = this.calculateRoutOfSameLine(startingStation, commonStationIndexOfStartingLine, allStationsOfStartingLine);
          route.push.apply(route, this.calculateRoutOfSameLine(commonStationIndexOfEndingLine, endingStation, allStationsOfEndingLine));
        }
      }
    }

    return route;
  };

  Route.prototype.findCommonStation = function (line1, line2) {
    var numberOfFirstLineStations = line1.stations.length;
    var numberOfSecondLineStations = line2.stations.length;
    var stationsOfFirstLine = line1.stations;
    var stationsOfSecondLine = line2.stations;

    for (var i = 0; i < numberOfFirstLineStations; i++) {
      for (var j = 0; j < numberOfSecondLineStations; j++) {
        if (stationsOfFirstLine[i].name === stationsOfSecondLine[j].name) {
          return stationsOfFirstLine[i].name;
        }
      }
    }
  };

  Route.prototype.findStationsLineName = function (station) {
    var numberOfLines = this.subway.getAllLines().length;
    var lines = this.subway.getAllLines();
    var line = "";

    for (var i = 0; i < numberOfLines; i++) {
      var numberOfStations = lines[i].stations.length;

      for (var j = 0; j < numberOfStations; j++) {
        var stationName = lines[i].stations[j].name;
        var lineName = lines[i].name;

        if (stationName === station) {
          line = lineName;
        }
      }
    }

    return line;
  };

  Route.prototype.isSameLine = function (startingLineName, endingLineName) {
    return startingLineName === endingLineName;
  };

  Route.prototype.findStationPositionInLine = function (stationName, line) {
    return line.findIndex(function (x) {
      return x.name === stationName;
    });
  };

  Route.prototype.calculateRoutOfSameLine = function (startingStation, endingStation, line) {
    var route = [];

    for (var i = startingStation; i <= endingStation; i++) {
      route.push(line[i].name);
    }

    return route;
  };

  return Route;
}();

exports.default = Route;
},{}],"models/Subway.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Subway =
/** @class */
function () {
  function Subway(line) {
    this.line = line;
  }

  Subway.prototype.getAllLines = function () {
    var allStations = [];
    var U1 = this.line.getU1();
    var U2 = this.line.getU2();
    var U3 = this.line.getU3();
    var U4 = this.line.getU4();
    var U6 = this.line.getU6();
    allStations.push(U1, U2, U3, U4, U6);
    return allStations;
  };

  Subway.prototype.getIntersection = function (subwayLine) {
    var numberOfStations = subwayLine.stations.length;
    var stations = subwayLine.stations;
    var intersections = [];

    for (var i = 0; i < numberOfStations; i++) {
      if (stations[i].intersection !== "none") {
        intersections.push(stations[i].intersection);
      }
    }

    return intersections;
  };

  Subway.prototype.getStationsNameOnIntersection = function (firstLine, secondLine) {};

  Subway.prototype.getLine = function (startingLineName) {
    var getLine = "this.line.get" + startingLineName + "()";
    var line = eval(getLine);
    return line;
  };

  return Subway;
}();

exports.default = Subway;
},{}],"models/Line.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Line =
/** @class */
function () {
  function Line() {}

  Line.prototype.getU1 = function () {
    var U1 = {
      name: "U1",
      stations: [{
        name: "Reumanplatz",
        line: "U1",
        intersection: "none"
      }, {
        name: "Keplerplatz",
        line: "U1",
        intersection: "none"
      }, {
        name: "Südtiroler Platz",
        line: "U1",
        intersection: "none"
      }, {
        name: "Taubstummengasse",
        line: "U1",
        intersection: "none"
      }, {
        name: "Karlsplatz",
        line: "U1",
        intersection: "U2 U4"
      }, {
        name: "Stephansplatz",
        line: "U1",
        intersection: "U3"
      }, {
        name: "Schwedenplatz",
        line: "U1",
        intersection: "U4"
      }, {
        name: "Nestroyplatz",
        line: "U1",
        intersection: "none"
      }, {
        name: "Praterstern",
        line: "U1",
        intersection: "U2"
      }, {
        name: "Vorgartenstraße",
        line: "U1",
        intersection: "none"
      }, {
        name: "Donauinsel",
        line: "U1",
        intersection: "none"
      }, {
        name: "Kaisermühlen V.I.C",
        line: "U1",
        intersection: "none"
      }, {
        name: "Alte Donau",
        line: "U1",
        intersection: "none"
      }, {
        name: "Kagran",
        line: "U1",
        intersection: "none"
      }, {
        name: "Kagraner Platz",
        line: "U1",
        intersection: "none"
      }, {
        name: "Rennbahnweg",
        line: "U1",
        intersection: "none"
      }, {
        name: "Aderklaer Straße",
        line: "U1",
        intersection: "none"
      }, {
        name: "Großfeldsiedlung",
        line: "U1",
        intersection: "none"
      }, {
        name: "Leopoldau",
        line: "U1",
        intersection: "none"
      }]
    };
    return U1;
  };

  Line.prototype.getU2 = function () {
    var U2 = {
      name: "U2",
      stations: [{
        name: "Karlsplatz",
        line: "U2",
        intersection: "U1 U4"
      }, {
        name: "Museumsquartier",
        line: "U2",
        intersection: "none"
      }, {
        name: "Volkstheater",
        line: "U2",
        intersection: "U3"
      }, {
        name: "Rathaus",
        line: "U2",
        intersection: "none"
      }, {
        name: "Schottentor",
        line: "U2",
        intersection: "none"
      }, {
        name: "Schottenring",
        line: "U2",
        intersection: "U4"
      }, {
        name: "Taborstraße",
        line: "U2",
        intersection: "none"
      }, {
        name: "Praterstern",
        line: "U2",
        intersection: "U1"
      }, {
        name: "Messe-Prater",
        line: "U2",
        intersection: "none"
      }, {
        name: "Krieau",
        line: "U2",
        intersection: "none"
      }, {
        name: "Stadion",
        line: "U2",
        intersection: "none"
      }, {
        name: "Donaumarina",
        line: "U2",
        intersection: "none"
      }, {
        name: "Donaustadtbrücke",
        line: "U2",
        intersection: "none"
      }, {
        name: "Stadlau",
        line: "U2",
        intersection: "none"
      }, {
        name: "Hardeggasse",
        line: "U2",
        intersection: "none"
      }, {
        name: "Donauspital",
        line: "U2",
        intersection: "none"
      }, {
        name: "Aspernstraße",
        line: "U2",
        intersection: "none"
      }]
    };
    return U2;
  };

  Line.prototype.getU3 = function () {
    var U3 = {
      name: "U3",
      stations: [{
        name: "Ottakring",
        line: "U3",
        intersection: "none"
      }, {
        name: "Kendlerstraße",
        line: "U3",
        intersection: "none"
      }, {
        name: "Hütteldorfer Straße",
        line: "U3",
        intersection: "none"
      }, {
        name: "Johnstraße",
        line: "U3",
        intersection: "none"
      }, {
        name: "Schweglerstraße",
        line: "U3",
        intersection: "none"
      }, {
        name: "Westbahnhof",
        line: "U3",
        intersection: "U6"
      }, {
        name: "Zieglergasse",
        line: "U3",
        intersection: "none"
      }, {
        name: "Neubaugasse",
        line: "U3",
        intersection: "none"
      }, {
        name: "Volkstheater",
        line: "U3",
        intersection: "none"
      }, {
        name: "Herrengasse",
        line: "U3",
        intersection: "none"
      }, {
        name: "Stephansplatz",
        line: "U3",
        intersection: "U1"
      }, {
        name: "Stubentor",
        line: "U3",
        intersection: "none"
      }, {
        name: "Landstraße",
        line: "U3",
        intersection: "U4"
      }, {
        name: "Rochusgasse",
        line: "U3",
        intersection: "none"
      }, {
        name: "Kard.-Nagl-Platz",
        line: "U3",
        intersection: "none"
      }, {
        name: "Schlachthausgasse",
        line: "U3",
        intersection: "none"
      }, {
        name: "Erdberg",
        line: "U3",
        intersection: "none"
      }, {
        name: "Gasometer",
        line: "U3",
        intersection: "none"
      }, {
        name: "Zipperstraße",
        line: "U3",
        intersection: "none"
      }, {
        name: "Enkplatz",
        line: "U3",
        intersection: "none"
      }, {
        name: "Simmering",
        line: "U3",
        intersection: "none"
      }]
    };
    return U3;
  };

  Line.prototype.getU4 = function () {
    var U4 = {
      name: "U4",
      stations: [{
        name: "Heiligenstadt",
        line: "U4",
        intersection: "none"
      }, {
        name: "Spittelau",
        line: "U4",
        intersection: "U6"
      }, {
        name: "Friedensbrücke",
        line: "U4",
        intersection: "none"
      }, {
        name: "Roßauer Lände",
        line: "U4",
        intersection: "none"
      }, {
        name: "Schottenring",
        line: "U4",
        intersection: "U2"
      }, {
        name: "Schwedenplatz",
        line: "U4",
        intersection: "U1"
      }, {
        name: "Landstraße",
        line: "U4",
        intersection: "U3"
      }, {
        name: "Stadtpark",
        line: "U4",
        intersection: "none"
      }, {
        name: "Karlsplatz",
        line: "U4",
        intersection: "U1 U2"
      }, {
        name: "Kettenbrückengasse",
        line: "U4",
        intersection: "none"
      }, {
        name: "Pilgramgasse",
        line: "U4",
        intersection: "none"
      }, {
        name: "Margaretengürtel",
        line: "U4",
        intersection: "none"
      }, {
        name: "Längenfeldgasse",
        line: "U4",
        intersection: "U6"
      }, {
        name: "Meidling Hauptstraße",
        line: "U4",
        intersection: "none"
      }, {
        name: "Schönbrunn",
        line: "U4",
        intersection: "none"
      }, {
        name: "Hietzing",
        line: "U4",
        intersection: "none"
      }, {
        name: "Braunschweiggasse",
        line: "U4",
        intersection: "none"
      }, {
        name: "Unter St. Veit",
        line: "U4",
        intersection: "none"
      }, {
        name: "Ober St. Veit",
        line: "U4",
        intersection: "none"
      }, {
        name: "Hütteldorf",
        line: "U4",
        intersection: "none"
      }]
    };
    return U4;
  };

  Line.prototype.getU6 = function () {
    var U6 = {
      name: "U6",
      stations: [{
        name: "Siebenhirten",
        line: "U6",
        intersection: "none"
      }, {
        name: "Perfektastraße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Erlaaer Straße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Alt Erlaa",
        line: "U6",
        intersection: "none"
      }, {
        name: "Am Schöpfwerk",
        line: "U6",
        intersection: "none"
      }, {
        name: "Tscherttegasse",
        line: "U6",
        intersection: "none"
      }, {
        name: "Philadelphiabrücke",
        line: "U6",
        intersection: "none"
      }, {
        name: "Niederhofstraße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Längenfeldgasse",
        line: "U6",
        intersection: "U4"
      }, {
        name: "Gumpendorfer Straße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Westbahnhof",
        line: "U6",
        intersection: "U3"
      }, {
        name: "Burggasse",
        line: "U6",
        intersection: "none"
      }, {
        name: "Thaliastraße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Josefstädter Straße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Alser Straße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Michelbeuern AKH",
        line: "U6",
        intersection: "none"
      }, {
        name: "Währinger Straße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Nußdorfer Straße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Spittelau",
        line: "U6",
        intersection: "U4"
      }, {
        name: "Jägerstraße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Dresdenstraße",
        line: "U6",
        intersection: "none"
      }, {
        name: "Handelskai",
        line: "U6",
        intersection: "none"
      }, {
        name: "Neue Donau",
        line: "U6",
        intersection: "none"
      }, {
        name: "Floridsdorf",
        line: "U6",
        intersection: "none"
      }]
    };
    return U6;
  };

  Line.prototype.hasStation = function (line, stationName) {
    var stations = line.stations;
    var hasStation = false;
    var numberOfStations = stations.length;

    for (var i = 0; i < numberOfStations; i++) {
      if (stations[i].name === stationName) {
        hasStation = true;
      }
    }

    return hasStation;
  };

  return Line;
}();

exports.default = Line;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Route_1 = __importDefault(require("./models/Route"));

var Subway_1 = __importDefault(require("./models/Subway"));

var Line_1 = __importDefault(require("./models/Line"));

var findPath = document.getElementById('findRoute');
var line = new Line_1.default();
var subway = new Subway_1.default(line);
var route = new Route_1.default(subway, line);
findPath.addEventListener('click', function () {
  var startingStation = document.getElementById("startingStation").value;
  var endingStation = document.getElementById("endingStation").value;
  console.log(startingStation, endingStation);
  var stations = route.findRoute(startingStation, endingStation);
  console.log(stations);
});
console.log("Works");
},{"./models/Route":"models/Route.ts","./models/Subway":"models/Subway.ts","./models/Line":"models/Line.ts"}],"../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65114" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.js.map