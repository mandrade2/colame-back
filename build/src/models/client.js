'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var ClientSchema = new Schema({
  position: { type: Number, required: true },
  number: { type: Number, required: true },
  lineId: { type: Schema.Types.ObjectId, ref: 'Line', required: true }
});

module.exports = _mongoose2.default.model('Client', ClientSchema);