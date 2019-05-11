import mongoose from 'mongoose';

const { Schema } = mongoose;

const LineSchema = new Schema({
  Name: String,
  clients: [{ position: Number, number: Number, client: { type: Schema.Types.ObjectId, ref: 'Client' } }],
  avg_time_waiting: Number,
});

module.exports = mongoose.model('Line', LineSchema);
