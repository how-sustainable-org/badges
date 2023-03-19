import * as functions from "firebase-functions";
import { app } from "./app";

export const company = functions.https.onRequest(app);
