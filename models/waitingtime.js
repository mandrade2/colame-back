import mongoose from 'mongoose';

const { Schema } = mongoose;

const WaitingTimeSchema = new Schema({
  date: { type: Date, required: true, default: Date.Now },
  seconds: { type: Number, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  lineId: { type: Schema.Types.ObjectId, ref: 'Line' },
  attendants: [{ type: Schema.Types.ObjectId, ref: 'Attendant' }],
});

module.exports = mongoose.model('WaitingTime', WaitingTimeSchema);
