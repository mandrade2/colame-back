var mongoose = require('mongoose');
var Client = require('./client.js');

var Schema = mongoose.Schema;

var LineSchema = new Schema({
  clients: [{position: integer, number: integer, client: {type: Schema.Types.ObjectId, ref: 'Client'}}],
  avg_time_attention: double
});

module.exports = mongoose.model('Line', LineSchema);
