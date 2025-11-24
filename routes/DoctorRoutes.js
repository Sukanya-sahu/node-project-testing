import express from "express";
import {
  list,
  view,
  add,
  update,
  remove
} from "../controllers/Doctors.js";

const router = express.Router();

router.get("/doctors/list", list);
router.get("/doctors/view", view);
router.post("/doctors/add", add);
router.put("/doctors/update", update);
router.delete("/doctors/delete", remove);

export default router;