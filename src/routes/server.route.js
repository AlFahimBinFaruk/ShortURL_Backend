const router = require("express").Router();
//controllers
const {
  handleServerPostReq,
  handleServerGetReq,
} = require("../controllers/server.controllers");
//initialize routers
//handle get req
router.get("/:urlCode", handleServerGetReq);
//handle post req
router.post("/", handleServerPostReq);

module.exports = router;
