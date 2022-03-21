"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isEmpty = function (obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        }
        else {
            return false;
        }
    };
    Utils.isNotEmpty = function (obj) {
        return !Utils.isEmpty(obj);
    };
    return Utils;
}());
exports.default = Utils;
//# sourceMappingURL=Utils.js.map