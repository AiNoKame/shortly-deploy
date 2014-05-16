var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
  visits: {type: Number, default: 0},
  url: String,
  base_url: String,
  code: String,
  title: String,
});

var Link = mongoose.model('Link', linkSchema);

linkSchema.pre('save', function(next) {
  var code = createSha(this.url);
  next();
});

var createSha = function(url) {
  var shasum = update(url);
  return shasum.digest('hex').slice(0, 5);
};

module.exports = Link;
