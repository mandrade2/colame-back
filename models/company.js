import mongoose from 'mongoose';

const {
  Schema
} = mongoose;

const CompanySchema = new Schema({
  name: {
    username: String,
    password: String,
    type: String,
    required: [true, 'Se requiere el nombre de la empresa'],
    unique: true,
    dropDups: true,
  },
  description: String,
  attendants: [{
    type: Schema.Types.ObjectId,
    ref: 'Attendant'
  }],
  lines: [{
    type: Schema.Types.ObjectId,
    ref: 'Line'
  }],
});

module.exports = mongoose.model('Company', CompanySchema);