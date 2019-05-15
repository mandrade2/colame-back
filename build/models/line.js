'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var LineSchema = new Schema({
  name: String,
  clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  avgTimeWaiting: { type: Number, default: 0 },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  attendants: [{ type: Schema.Types.ObjectId, ref: 'Attendant' }],
  currentNumber: { type: Number, default: 0 },
  attending: [{ type: Schema.Types.ObjectId, ref: 'Client' }]
});

LineSchema.index({
  name: 1,
  companyId: 1
}, {
  unique: true
});

module.exports = _mongoose2.default.model('Line', LineSchema);