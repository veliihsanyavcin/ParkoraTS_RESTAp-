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
})({"ts/loginService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginService = void 0;

var LoginService = /*#__PURE__*/function () {
  function LoginService() {
    _classCallCheck(this, LoginService);
  }

  _createClass(LoginService, [{
    key: "login",
    value: function login(username, password) {
      // todo POST işlemi yapacak responsu return edecek ("POST: /login: boolean)
      // let xhr = new XMLHttpRequest();
      // xhr.open('POST','https://localhost:44333/login',false);
      // xhr.send(JSON.stringify({username, password}));
      // return JSON.parse(xhr.responseText);
      return fetch('https://localhost:44333/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return LoginService;
}();

exports.LoginService = LoginService;
},{}],"ts/account.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Account = void 0;

var loginService_1 = require("./loginService");

var Account = /*#__PURE__*/function () {
  function Account() {
    _classCallCheck(this, Account);

    this.loginService = new loginService_1.LoginService();
  }

  _createClass(Account, [{
    key: "login",
    value: function login(username, password) {
      this.loginService.login(username, password).then(function (canLogin) {
        if (canLogin == true) {
          var x = document.getElementById("login-screen");
          x.style.display = "none";
        } else {
          alert("Kullanıcı adı veya şifre hatalı!");
        }
      });
    }
  }]);

  return Account;
}();

exports.Account = Account;
},{"./loginService":"ts/loginService.ts"}],"ts/ticketService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicketService = void 0;

var TicketService = /*#__PURE__*/function () {
  function TicketService() {
    _classCallCheck(this, TicketService);
  }

  _createClass(TicketService, [{
    key: "parkIn",
    value: function parkIn(vehicle) {
      var body = {
        plate: vehicle.plate,
        type: vehicle.type
      };
      return fetch('https://localhost:44333/ticket', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      }).then();
    }
  }, {
    key: "getParkIn",
    value: function getParkIn() {
      return fetch('https://localhost:44333/ticket', {
        method: 'GET',
        // body: "",
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return TicketService;
}();

exports.TicketService = TicketService;
},{}],"ts/reportService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportService = void 0;

var ReportService = /*#__PURE__*/function () {
  function ReportService() {
    _classCallCheck(this, ReportService);
  }

  _createClass(ReportService, [{
    key: "parkOut",
    value: function parkOut(vehicle) {
      var body = {
        plate: vehicle.plate,
        type: vehicle.type
      };
      return fetch('https://localhost:44333/report', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      });
    }
  }, {
    key: "getParkOut",
    value: function getParkOut() {
      return fetch('https://localhost:44333/report', {
        method: 'GET',
        //body: JSON.stringify(ticket),
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return ReportService;
}();

exports.ReportService = ReportService;
},{}],"ts/park.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Park = void 0;

var ticketService_1 = require("./ticketService");

var reportService_1 = require("./reportService");

var Park = /*#__PURE__*/function () {
  function Park() {
    _classCallCheck(this, Park);

    this.ticketService = new ticketService_1.TicketService();
    this.reportService = new reportService_1.ReportService();
  } // Parka giriş için kullnılan metod


  _createClass(Park, [{
    key: "parkIn",
    value: function parkIn(vehicle) {
      return this.ticketService.parkIn(vehicle);
    } // Parktan çıkış için kullnılan metod

  }, {
    key: "parkOut",
    value: function parkOut(vehicle) {
      return this.reportService.parkOut(vehicle);
    }
  }, {
    key: "getParkIn",
    value: function getParkIn() {
      return this.ticketService.getParkIn();
    }
  }, {
    key: "getParkOut",
    value: function getParkOut() {
      return this.reportService.getParkOut();
    }
  }]);

  return Park;
}();

exports.Park = Park;
},{"./ticketService":"ts/ticketService.ts","./reportService":"ts/reportService.ts"}],"ts/vehicle.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vehicle = void 0;

var Vehicle = /*#__PURE__*/function () {
  function Vehicle(plate, type) {
    _classCallCheck(this, Vehicle);

    this._plate = plate;
    this._type = type;
  }

  _createClass(Vehicle, [{
    key: "checkPlate",
    value: function checkPlate() {
      var plate = this._plate.replace(/\s+/g, "").toUpperCase();

      var regex = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/;

      if (plate.match(regex) == null) {
        throw new Error("PLAKAYI HATALI GİRDİNİZ.LÜTFEN TEKRAR DENEYİNİZ");
      }
    }
  }, {
    key: "plate",
    get: function get() {
      return this._plate;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }]);

  return Vehicle;
}();

exports.Vehicle = Vehicle;
},{}],"ts/typeService.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeService = void 0;

var TypeService = /*#__PURE__*/function () {
  function TypeService() {
    _classCallCheck(this, TypeService);
  }

  _createClass(TypeService, [{
    key: "getTypes",
    value: function getTypes() {
      return fetch('https://localhost:44333/types', {
        method: 'GET',
        // body: "",
        headers: {
          'content-type': 'application/json'
        }
      }).then(function (r) {
        return r.json();
      });
    }
  }]);

  return TypeService;
}();

exports.TypeService = TypeService;
},{}],"ts/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var account_1 = require("./account");

var park_1 = require("./park");

var vehicle_1 = require("./vehicle");

var typeService_1 = require("./typeService");

var account = new account_1.Account();
var park = new park_1.Park();
var loginButton = document.getElementById("loginbutton").addEventListener("click", login);
var parkInButton = document.getElementById("parkInButton").addEventListener("click", parkIn);
var typeService = new typeService_1.TypeService();
fillVehicleTypeSelectList();

function login() {
  var userName = document.getElementById("username");
  var password = document.getElementById("password");
  account.login(userName.value, password.value);
}

function parkIn(event) {
  event.preventDefault();
  var plate = document.getElementById("plate");
  var vehicleType = document.getElementById("vehicleTypeParentSelect");
  park.parkIn(new vehicle_1.Vehicle(plate.value, vehicleType.value)).then(function () {
    debugger;
    refreshList();
  });
}

function parkOut(vehicle) {
  park.parkOut(vehicle).then(function () {
    refreshList();
    refreshReportList();
  });
}

function refreshList() {
  var table = document.getElementById("carlist");
  table.tBodies[1].innerHTML = "";
  park.getParkIn().then(function (ticketList) {
    ticketList.forEach(function (ticket) {
      var tbody = table.tBodies[1];
      var newRow = tbody.insertRow();
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = ticket.vehicle.plate;
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = ticket.vehicle.type.toString();
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = ticket.timeIn.toString();
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = "<button style=\"color:red\" id=\"delete_btn_".concat(ticket.vehicle.plate, "\">ARA\xC7 \xC7IKI\u015E</button>");
      var parkOutButton = document.getElementById("delete_btn_".concat(ticket.vehicle.plate));
      parkOutButton.addEventListener("click", function () {
        return parkOut(ticket.vehicle);
      });
    });
  });
}

function refreshReportList() {
  var table = document.getElementById("carlist1");
  table.tBodies[1].innerHTML = ""; //var parkOutList: Ticket[] = park.getParkOut();

  park.getParkOut().then(function (parkOutList) {
    parkOutList.forEach(function (ticket) {
      debugger;
      var tbody = table.tBodies[1];
      var newRow = tbody.insertRow();
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = ticket.vehicle.plate;
      var cell2 = newRow.insertCell(1);
      cell2.innerHTML = ticket.vehicle.type.toString();
      var cell3 = newRow.insertCell(2);
      cell3.innerHTML = ticket.timeIn.toString();
      var cell4 = newRow.insertCell(3);
      cell4.innerHTML = ticket.timeOut.toString();
      var cell5 = newRow.insertCell(4);
      cell5.innerHTML = (ticket.timeOut.getSeconds() - ticket.timeIn.getSeconds()).toString() + " Sn";
      var cell6 = newRow.insertCell(5);
      cell6.innerHTML = ticket.cost.toString() + " Tl";
    }); // var table: HTMLTableElement = document.getElementById(
    //     "carlist2"
    // ) as HTMLTableElement;
    // table.tBodies[1].innerHTML = "";
    // var tbody = table.tBodies[1];
    // let genelAdet = 0;
    // let genelSure = 0;
    // let genelCost = 0;
    // for (let vehicleType in VehicleType) {
    //     let vehicleTypes = (park.getParkOut()).then(tickets => {tickets.filter(x => x.vehicle.type === vehicleType)});
    //     let totalSecond = 0;
    //     let totalCost = 0;
    //     vehicleTypes.forEach(x => {
    //         totalSecond += x.timeOut.getSeconds() - x.timeIn.getSeconds();
    //         totalCost += x.cost;
    //     });
    //     var newRow = tbody.insertRow();
    //     let cell1 = newRow.insertCell(0);
    //     cell1.innerHTML = vehicleType;
    //     let cell2 = newRow.insertCell(1);
    //     cell2.innerHTML = vehicleTypes.length.toString();
    //     let cell4 = newRow.insertCell(2);
    //     cell4.innerHTML = totalSecond.toString();
    //     let cell5 = newRow.insertCell(3);
    //     cell5.innerHTML = totalCost.toString();
    //     genelAdet += vehicleTypes.length;
    //     genelSure += totalSecond;
    //     genelCost += totalCost;
    // }
    // var newRow2 = tbody.insertRow();
    // let cell16 = newRow2.insertCell(0);
    // cell16.innerHTML = '<h3 style="color:red;">Toplam</h3>'
    // let cell2 = newRow2.insertCell(1);
    // cell2.innerHTML = genelAdet.toString();
    // let cell3 = newRow2.insertCell(2);
    // cell3.innerHTML = genelSure.toString();
    // let cell4 = newRow2.insertCell(3);
    // cell4.innerHTML = genelCost.toString();
  });
}

function fillVehicleTypeSelectList() {
  var vehicleTypeParent = document.getElementById("selectlist");
  var selectVehicleTypeList = document.createElement("select");
  selectVehicleTypeList.id = "vehicleTypeParentSelect";
  selectVehicleTypeList.innerHTML = "<option value=\"none\" selected disabled hidden>Ara\xE7 Tipi Se\xE7iniz";
  vehicleTypeParent.appendChild(selectVehicleTypeList);
  typeService.getTypes().then(function (types) {
    types.forEach(function (type) {
      var option = document.createElement("option");
      option.text = type;
      selectVehicleTypeList.appendChild(option);
    });
  });
}
},{"./account":"ts/account.ts","./park":"ts/park.ts","./vehicle":"ts/vehicle.ts","./typeService":"ts/typeService.ts"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60646" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/index.ts"], null)
//# sourceMappingURL=/ts.841fc46b.js.map