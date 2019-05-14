import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
  position: { type: Number, required: true },
  number: { type: Number, required: true },
  lineId: { type: Schema.Types.ObjectId, ref: 'Line', required: true },
});

module.exports = mongoose.model('Client', ClientSchema);
