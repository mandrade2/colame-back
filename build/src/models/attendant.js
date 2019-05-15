'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var AttendantSchema = new Schema({
  name: String,
  lines: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
  avgTimeAttention: { type: Number, default: 0 },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' }
});

AttendantSchema.index({
  name: 1,
  companyId: 1
}, {
  unique: true
});

module.exports = _mongoose2.default.model('Attendant', AttendantSchema);