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
})({"models/player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Player =
/** @class */
function () {
  function Player(name) {
    this.money = 1000;
    this.cards = [];
    this.name = name;
  }

  Player.prototype.hasMoney = function () {
    return this.money <= 0 ? false : true;
  };

  Player.prototype.setName = function (name) {
    this.name = name;
  };

  Player.prototype.setNumberOfWins = function () {
    this.numberOfWins++;
  };

  Player.prototype.takeCards = function (cards) {
    this.cards = cards;
  };

  return Player;
}();

exports.default = Player;
},{}],"models/card.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Card =
/** @class */
function () {
  function Card() {
    this.cards = ['1 hearth', '1 club', '1 diamond', '1 spade', '2 hearth', '2 club', '2 diamond', '2 spade', '3 hearth', '3 club', '3 diamond', '3 spade', '4 hearth', '4 club', '4 diamond', '4 spade', '5 hearth', '5 club', '5 diamond', '5 spade', '6 hearth', '6 club', '6 diamond', '6 spade', '7 hearth', '7 club', '7 diamond', '7 spade', '8 hearth', '8 club', '8 diamond', '8 spade', '9 hearth', '9 club', '9 diamond', '9 spade', '10 hearth', '10 club', '10 diamond', '10 spade', 'Jack hearth', 'Jack club', 'Jack diamond', 'Jack spade', 'Queen hearth', 'Queen club', 'Queen diamond', 'Queen spade', 'King hearth', 'King club', 'King diamond', 'King spade'];
  }

  return Card;
}();

exports.default = Card;
},{}],"models/game.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var player_1 = __importDefault(require("./player"));

var card_1 = __importDefault(require("./card"));

var Game =
/** @class */
function () {
  function Game() {
    this.players = [];
    this.cards = [];
    this.cardsOnTable = [];
    this.money = 0;
  }

  Game.prototype.checkResult = function () {
    console.log("AND THE WINNER IS: THIS FUNCTION NEEDS IMPLEMENTATION.");
  };

  Game.prototype.startGame = function () {
    var deck = new card_1.default();
    this.cards = deck.cards;
  };

  Game.prototype.deletePlayerFromGame = function (player) {
    this.players.splice(this.players.indexOf(player), 1);
  };

  Game.prototype.addPlayer = function (name) {
    this.players.push(new player_1.default(name));
  };

  Game.prototype.dealCardsToPlayers = function () {
    var playerLength = this.players.length;

    for (var i = 0; i < playerLength; i++) {
      var playersCards = this.players[i].cards;
      playersCards.push(this.getRandomCard());
      playersCards.push(this.getRandomCard());
    }
  };

  Game.prototype.dealCardsToTable = function () {
    this.cardsOnTable.push(this.getRandomCard());
    this.cardsOnTable.push(this.getRandomCard());
    this.cardsOnTable.push(this.getRandomCard());
  };

  Game.prototype.dealNextCard = function () {
    this.cardsOnTable.push(this.getRandomCard());
  };

  Game.prototype.getRandomCard = function () {
    var randomIndex = Math.floor(Math.random() * this.cards.length);
    var randomCard = this.cards[randomIndex];
    this.cards.splice(randomIndex, 1);
    return randomCard;
  };

  return Game;
}();

exports.default = Game;
},{"./player":"models/player.ts","./card":"models/card.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_1 = __importDefault(require("./models/game"));

var player_1 = __importDefault(require("./models/player"));

var game = new game_1.default();
var addPlayerBtn = document.getElementById('addPlayer');
var dealCardsToPlayer = document.getElementById('dealCards');
var startGame = document.getElementById('startGame');
var dealCardsToTable = document.getElementById('dealCardsToTable');
var dealNextCard = document.getElementById('dealNextCard');
var checkRusltBtn = document.getElementById('checkResult');
var raisedAmount = 0;

var displayCardsOnTable = function displayCardsOnTable() {
  var element = document.getElementById("game");
  var cardsOnTable = document.createElement("p");
  var money = document.createElement("p");
  cardsOnTable.id = "cardsOnTable";
  money.id = "moneyOnTable";
  money.innerHTML = "This is money on the Table " + game.money;
  var cardsOnTableLength = game.cardsOnTable.length;

  for (var i = 0; i < cardsOnTableLength; i++) {
    cardsOnTable.innerHTML += game.cardsOnTable[i] + " ";
  }

  element.appendChild(money);
  element.appendChild(cardsOnTable);
};

var displayPlayers = function displayPlayers() {
  var players = document.getElementById('players');
  var playersLength = game.players.length;

  for (var i = 0; i < playersLength; i++) {
    var player = document.createElement("div");
    var playerName = document.createElement("h4");
    var playerMoney = document.createElement("h5");
    var cards = document.createElement("p");
    var checkBtn = document.createElement('input');
    var foldBtn = document.createElement("input");
    var raiseBtn = document.createElement("input");
    var amountToRaise = document.createElement("input");
    player.id = "player" + game.players[i].name;
    playerName.innerHTML = game.players[i].name;
    playerMoney.innerHTML = "This is your money: " + game.players[i].money.toString();
    playerMoney.id = "playerMoney" + game.players[i].name;
    checkBtn.type = "button";
    checkBtn.value = "Check ";
    checkBtn.id = "check";
    foldBtn.type = "button";
    foldBtn.value = "Fold";
    foldBtn.id = "fold";
    raiseBtn.type = "button";
    raiseBtn.value = "Raise";
    raiseBtn.id = "raise";
    amountToRaise.type = "text";
    amountToRaise.id = "amountToRaise" + game.players[i].name;
    var cardsLength = game.players[i].cards.length;

    for (var j = 0; j < cardsLength; j++) {
      cards.innerHTML += game.players[i].cards[j];
    }

    cards.innerHTML = game.players[i].cards[0] + " " + game.players[i].cards[1];
    players.appendChild(player);
    player.appendChild(playerName);
    player.appendChild(cards);
    player.appendChild(playerMoney);
    player.appendChild(checkBtn);
    player.appendChild(foldBtn);
    player.appendChild(raiseBtn);
    player.appendChild(amountToRaise);
    checkBtn.addEventListener('click', checkFnc(playerName, i));
    foldBtn.addEventListener('click', foldFnc(playerName, i));
    raiseBtn.addEventListener('click', raiseFnc(i));
  }
};

var removeElement = function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.remove();
};

var foldFnc = function foldFnc(playerName, i) {
  return function () {
    console.log("fold is clicked by " + playerName.innerHTML);
    game.deletePlayerFromGame(game.players[i]);
    removeElement("player" + game.players[i].name);
  };
};

var checkFnc = function checkFnc(playerName, i) {
  return function () {
    console.log("Checked is clicked by " + playerName.innerHTML);
    updatePlayerMoney(i, raisedAmount);
    updateMoneyOnTable(raisedAmount);
    raisedAmount = 0;
  };
};

var raiseFnc = function raiseFnc(i) {
  return function () {
    var amount = Number(document.getElementById("amountToRaise" + game.players[i].name).value);
    updatePlayerMoney(i, amount);
    updateMoneyOnTable(amount);
  };
};

var updateCardsOnTable = function updateCardsOnTable() {
  var cardsOnTable = document.getElementById('cardsOnTable');
  cardsOnTable.innerHTML = "";
  var cardsOnTableLength = game.cardsOnTable.length;

  for (var i = 0; i < cardsOnTableLength; i++) {
    cardsOnTable.innerHTML += game.cardsOnTable[i] + " ";
  }
};

var updateMoneyOnTable = function updateMoneyOnTable(amount) {
  var moneyOnTable = document.getElementById("moneyOnTable");
  raisedAmount = amount;
  game.money += amount;
  moneyOnTable.innerHTML = game.money.toString();
};

var updatePlayerMoney = function updatePlayerMoney(i, amount) {
  var playerMoney = document.getElementById("playerMoney" + game.players[i].name);
  playerMoney.innerHTML = "";
  game.players[i].money -= amount;
  playerMoney.innerHTML = game.players[i].money.toString();
};

addPlayerBtn.addEventListener('click', function () {
  var playerName = document.getElementById("playerName").value;
  game.players.push(new player_1.default(playerName));
  startGame.disabled = false;
  document.getElementById("playerName").value = "";
});
startGame.addEventListener('click', function () {
  game.startGame();
  dealCardsToPlayer.disabled = false;
  addPlayerBtn.disabled = true;
  startGame.disabled = true;
});
dealCardsToPlayer.addEventListener('click', function () {
  game.dealCardsToPlayers();
  dealCardsToTable.disabled = false;
  dealCardsToPlayer.disabled = true;
  displayPlayers();
});
dealCardsToTable.addEventListener('click', function () {
  game.dealCardsToTable();
  displayCardsOnTable();
  dealCardsToTable.disabled = true;
  dealNextCard.disabled = false;
});
dealNextCard.addEventListener('click', function () {
  game.dealNextCard();
  updateCardsOnTable();

  if (game.cardsOnTable.length === 5) {
    dealNextCard.disabled = true;
    checkRusltBtn.disabled = false;
  }
});
checkRusltBtn.addEventListener('click', function () {
  game.checkResult();
});
},{"./models/game":"models/game.ts","./models/player":"models/player.ts"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60691" + '/');

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
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/Poker.77de5100.js.map