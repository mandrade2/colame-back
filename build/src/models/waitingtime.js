'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var WaitingTimeSchema = new Schema({
  date: { type: Date, required: true, default: Date.Now },
  seconds: { type: Number, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  lineId: { type: Schema.Types.ObjectId, ref: 'Line' },
  attendants: [{ type: Schema.Types.ObjectId, ref: 'Attendant' }]
});

module.exports = _mongoose2.default.model('WaitingTime', WaitingTimeSchema);