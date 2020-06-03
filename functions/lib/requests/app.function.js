"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth_1 = require("./middlewares/auth");
const users_1 = require("./routes/users");
const app = express();
app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(auth_1.default);
app.use('/users', users_1.default);
exports.default = firebase_functions_1.https.onRequest(app);
//# sourceMappingURL=app.function.js.map