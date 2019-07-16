var express = require('express');
var router = express.Router();
/*This will bring in the hone page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});
module.exports = router;