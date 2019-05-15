import mongoose from 'mongoose';

const { Schema } = mongoose;

const AttendingTimeSchema = new Schema({
  date: { type: Date, required: true, default: Date.Now },
  seconds: { type: Number, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  attendantId: { type: Schema.Types.ObjectId, ref: 'Attendant' },
  lineId: { type: Schema.Types.ObjectId, ref: 'Line' },
});

module.exports = mongoose.model('AttendingTime', AttendingTimeSchema);
