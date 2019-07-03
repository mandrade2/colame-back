import mongoose from 'mongoose';

const { Schema } = mongoose;

const LineSchema = new Schema({
  name: String,
  clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  avgTimeWaiting: { type: Number, default: 0 },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  attendants: [{ type: Schema.Types.ObjectId, ref: 'Attendant' }],
  currentNumber: { type: Number, default: 0 },
  attending: [{ type: Schema.Types.ObjectId, ref: 'Client' }],
  attended: { type: Number, default: 0 },
  seconds: { type: Number, default: 0 },
});

LineSchema.index({
  name: 1,
  companyId: 1,
}, {
  unique: true,
});

module.exports = mongoose.model('Line', LineSchema);
