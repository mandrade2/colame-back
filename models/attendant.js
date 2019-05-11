import mongoose from 'mongoose';

const { Schema } = mongoose;

const AttendantSchema = new Schema({
  Name: String,
  lines: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
  avg_time_attention: Number,
});

module.exports = mongoose.model('Attendant', AttendantSchema);
