"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadFunctions = require("firebase-function-tools");
const admin = require("firebase-admin");
admin.initializeApp();
loadFunctions(__dirname, exports, '.function.js');
//# sourceMappingURL=index.js.map