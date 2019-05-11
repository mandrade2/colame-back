import mongoose from 'mongoose';

const { Schema } = mongoose;

const AttendingTimeSchema = new Schema({
  date: { type: Date, required: true, default: Date.Now },
  seconds: { type: Number, required: true },
  client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
  attendant_id: { type: Schema.Types.ObjectId, ref: 'Attendant' },
  line_id: { type: Schema.Types.ObjectId, ref: 'Line' },
});

module.exports = mongoose.model('AttendingTime', AttendingTimeSchema);
