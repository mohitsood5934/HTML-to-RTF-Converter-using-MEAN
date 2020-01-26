const express = require("express");
const router = express.Router();
const generateRTF = require("./generateRTFFile");
//downloading the file
router.get("/download/:fileName", function (req, res) {
  const fileName = req.params.fileName;
  console.log(fileName,"fileName")
  generateRTF.downloadFile(fileName, req, res);
})
//uploading the file
router.put('/upload', (req, res) => {
  const fileName = req.body;
  generateRTF.uploadFile(fileName, req, res);
});
//removing the file
router.delete('/remove/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  generateRTF.removeFile(fileName, req, res);
});
module.exports = router
