import mongoose from 'mongoose';

const { Schema } = mongoose;

const AttendantSchema = new Schema({
  name: String,
  lines: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
  avgTimeAttention: { type: Number, default: 0 },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
});

AttendantSchema.index({
  name: 1,
  companyId: 1,
}, {
  unique: true,
});

module.exports = mongoose.model('Attendant', AttendantSchema);
