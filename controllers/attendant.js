import Attendant from '../models/attendant';

class Attendants {
  static create(req, res) {
    const {
      companyId,
      name,
    } = req.body;
    return Attendant.create({ name, companyId })
      .then(attendant => res.status(201).send(attendant))
      .catch(error => res.status(400).send(error));
  }

  static list(req, res) {
    Attendant.find({}).then((line) => {
      res.json(line);
    });
  }
}

export default Attendants;
