var mongoose = require('mongoose');
var Attendant = require('./attendant.js');

var Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: {type: string, required: [true, 'Se requiere el nombre de la empresa']},
  description: string,
  attendants: [{type: Schema.Types.ObjectId, ref 'Attendant'}]
});

module.exports = mongoose.model('Company', CompanySchema);
