import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClientSchema = new Schema({
  info: {},
  numbers: [{
    number: { type: Number, required: true },
    line_id: { type: Schema.Types.ObjectId, ref: 'Line', required: true },
  }],
});

module.exports = mongoose.model('Client', ClientSchema);
