import Attendant from '../models/attendant';

class Attendants {
  static create(req, res) {
    const {
      name,
    } = req.body;
    return Attendant.create({ name: name, companyId: req.params.id })
      .then(attendant => res.status(201).send(attendant))
      .catch(error => res.status(400).send(error));
  }

  static list(req, res) {
    Attendant.find({}).then((attendant) => {
      res.json(attendant);
    });
  }

  static update(req, res) {
    const {
      name,
    } = req.body;
    return Attendant.findByIdAndUpdate(req.params.id, {$set: {name: name}})
      .then(attendant => res.status(201).send(attendant))
      .catch(error => res.status(400).send(error));
  }

  static destroy(req, res) {
    return Attendant.findByIdAndRemove(req.params.id)
      .then(attendant => res.status(201).send(attendant))
      .catch(error => res.status(400).send(error));
  }

  static list_per_company(req, res) {
    Attendant.find({companyId: req.params.id}).then((attendants) => {
      res.json(attendants);
    });
  }
}

export default Attendants;
