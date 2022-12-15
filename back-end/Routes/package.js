const express = require("express");
const PK = require("../models/package");
const router = express.Router();

router.get("/", async (req, res) => {
  const pk = await PK.find({});
  res.status(200).json(pk);
  console.log(pk);
});
router.get("/:codepkg", async (req, res) => {
  try {
    const payload = req.params.codepkg;
    const result = await PK.findById(payload);
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(404).send({
      mesageCode: 404,
      mesage: "codepkg not found!",
    });
  }
});
router.post("/create", async (req, res) => {
  try {
    const { idpackage, idorder, idcontainer, host, located } = req.body;
    if (idpackage && idorder && idcontainer && host && located) {
      const pk = await PK.create({
        idpackage: idpackage,
        idorder: idorder,
        idcontainer: idcontainer,
        host: host,
        located: located,
      });
      res.status(200).json(pk);
    } else {
      res.status(400).json({ message: "thieu thong tin" });
    }
  } catch (error) {
    res.status(400).json({ message: "thieu thong tin" });
  }
});
router.put("/:id", async (req, res) => {
  const sp = await PK.findById(req.params.id);
  if (sp) {
    const temp = {
      tensanpham: req.body.tensanpham,
      soluong: req.body.soluong,
      nhasanxuat: req.body.nhasanxuat,
    };
    sp.items.push(temp);
    const resuilt = await sp.save();
    res.status(200).json(resuilt);
  } else {
    res.status(400).json({ message: "Update Không Thành Công!!!" });
  }
});
module.exports = router;
