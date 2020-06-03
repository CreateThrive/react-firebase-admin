"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
exports.default = firebase_functions_1.database.ref('/users/{uid}').onUpdate((change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    const { isAdmin } = after;
    if (before.isAdmin === isAdmin) {
        return null;
    }
    const { uid } = context.params;
    return firebase_admin_1.auth().setCustomUserClaims(uid, {
        isAdmin
    });
});
//# sourceMappingURL=onUpdate.function.js.map