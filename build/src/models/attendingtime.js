'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var AttendingTimeSchema = new Schema({
  date: { type: Date, required: true, default: Date.Now },
  seconds: { type: Number, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  attendantId: { type: Schema.Types.ObjectId, ref: 'Attendant' },
  lineId: { type: Schema.Types.ObjectId, ref: 'Line' }
});

module.exports = _mongoose2.default.model('AttendingTime', AttendingTimeSchema);