import * as express from "express";

import { newsController } from "../controllers";

const router: express.Router = express.Router();

router.get("/:index", newsController.getNews);

export default router;