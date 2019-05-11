import mongoose from 'mongoose';
import Attendant from './attendant';

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: [true, 'Se requiere el nombre de la empresa'] },
  description: String,
  attendants: [{ type: Schema.Types.ObjectId, ref: Attendant }],
});

module.exports = mongoose.model('Company', CompanySchema);
