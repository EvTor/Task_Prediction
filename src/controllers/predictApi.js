import express from "express";
const router = express.Router();

import { predict } from "../service/predict.js";

router.get("/", (req, res) => {
    res.send("Please POST data to /predict to use this API");
    console.log("Please POST data to /predict to use this API");
});

router.post("/predict", (req, res) => {
    console.log("Received post /predicate request, with data: ", req.body)
    const result = predict(req.body);
    res.send(result);
});

export default router;
