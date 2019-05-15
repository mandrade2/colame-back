'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Se requiere el nombre de la empresa'],
    unique: true,
    dropDups: true
  },
  description: String,
  attendants: [{ type: Schema.Types.ObjectId, ref: 'Attendant' }],
  lines: [{ type: Schema.Types.ObjectId, ref: 'Line' }]
});

module.exports = _mongoose2.default.model('Company', CompanySchema);