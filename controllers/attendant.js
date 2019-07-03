import bcrypt from 'bcrypt';
import Attendant from '../models/attendant';

class Attendants {
  static async create(req, res) {
    const {
      name,
      username,
      plainpassword,
    } = req.body;
    const hashedpwd = await bcrypt.hash(plainpassword, 10).then(hash => hash);
    return Attendant.create({
      name,
      username,
      password: hashedpwd,
      companyId: req.params.companyId,
    })
      .then(attendant => res.status(201).send(attendant))
      .catch(error => res.status(400).send(error));
  }

  static list(req, res) {
    Attendant.find({}).then((attendant) => {
      res.json(attendant);
    });
  }

  static async update(req, res) {
    const {
      name,
      username,
    } = req.body;
    return Attendant.findByIdAndUpdate(req.params.id, {
      $set: {
        name,
        username,
      },
    })
      .then(attendant => res.status(201).send(attendant))
      .catch(error => res.status(400).send(error));
  }

  static destroy(req, res) {
    return Attendant.findByIdAndRemove(req.params.id)
      .then(attendant => res.status(201).send(attendant))
      .catch(error => res.status(400).send(error));
  }

  static list_per_company(req, res) {
    Attendant.find({
      companyId: req.params.id,
    }).then((attendants) => {
      res.json(attendants);
    });
  }
}

export default Attendants;
