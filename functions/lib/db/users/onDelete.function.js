"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const firebase_functions_1 = require("firebase-functions");
exports.default = firebase_functions_1.database.ref('users/{uid}').onDelete((snapshot, context) => {
    const { uid } = context.params;
    return firebase_admin_1.auth().deleteUser(uid);
});
//# sourceMappingURL=onDelete.function.js.map