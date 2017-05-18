/*
  Copyright 2017 Austin Mullins
  This file is part of Just-the-Claps.

  Just-the-Claps is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Just-the-Clpas is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Just-the-Claps.  If not, see <http://www.gnu.org/licenses/>.
*/

var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var justClapsTransform = require(path.join(__dirname, "..", "public", "javascripts", "just-claps"));

/* GET transformed text */
router.get('/', function(req, res, next) {
  var query = url.parse(req.url, true).query; // Get query string as an object
  res.json({text: justClapsTransform(query.text, query.symbol)});
});

router.post('/', function(req, res, next) {
  res.json({text: justClapsTransform(req.body.text, req.body.symbol)});
});

module.exports = router;
