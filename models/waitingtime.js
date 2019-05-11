import mongoose from 'mongoose';

const { Schema } = mongoose;

const WaitingTimeSchema = new Schema({
  date: { type: Date, required: true, default: Date.Now },
  seconds: { type: Number, required: true },
  client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
  line_id: { type: Schema.Types.ObjectId, ref: 'Line' },
  attendants: [{ type: Schema.Types.ObjectId, ref: 'Attendant' }],
});

module.exports = mongoose.model('WaitingTime', WaitingTimeSchema);
