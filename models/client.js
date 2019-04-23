var mongoose = require('mongoose');
var Line = require('./line.js');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  info: {},
  numbers: [{number: {type: integer, required: true}, line_id: {type: Schema.Types.ObjectId, ref: 'Line', required: true}]
});

module.exports = mongoose.model('Client', ClientSchema);
