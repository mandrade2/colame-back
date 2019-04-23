var mongoose = require('mongoose');
var Line = require('./line.js');

var Schema = mongoose.Schema;

var AttendantSchema = new Schema({
  lines: [{type: Schema.Types.ObjectId, ref: 'Line'}]
});

module.exports = mongoose.model('Attendant', AttendantSchema);
