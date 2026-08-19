import express from "express";

import { createCheckoutSession } from "../controller/payment.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);

export default router;