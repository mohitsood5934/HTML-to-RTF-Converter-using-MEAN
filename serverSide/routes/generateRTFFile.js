const fs = require("fs");
var util = require("util");
const userFiles = '../serverSide/userUploads/'
exports.downloadFile = (fileName, req, res) => {
  fs.readFile(userFiles + fileName, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      report = util.format(data)
      res.attachment('report.rtf');
      res.end(report, 'binary')
    }
  });
}
exports.uploadFile = (file, req, res) => {
  const base64data = file.content.replace(/^data:.*,/, '');
  fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.set('Location', userFiles + file.name);
      res.status(200);
      res.send(file);
    }
  });
}
exports.removeFile = (fileName, req, res) => {
  fs.unlink(userFiles + fileName, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(204);
      res.send({});
    }
  });
}
