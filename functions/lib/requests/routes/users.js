"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebase_admin_1 = require("firebase-admin");
const cors = require('cors')({ origin: true });
const { v4: uuid } = require('uuid');
const router = express_1.Router();
const createUserAuth = async (email, isAdmin) => {
    const { uid } = await firebase_admin_1.auth().createUser({ email, password: uuid() });
    return firebase_admin_1.auth().setCustomUserClaims(uid, {
        isAdmin
    });
};
router.post('/', (request, response) => {
    cors(request, response, async () => {
        const { email, isAdmin } = request.body;
        if (!email) {
            return response
                .status(400)
                .json({ error: { code: 'auth/invalid-email' } });
        }
        let uid;
        try {
            uid = await createUserAuth(email, isAdmin);
        }
        catch (error) {
            return response.status(500).json({ error });
        }
        return response.status(200).json({ uid });
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map