import Line from '../models/line';

class Lines {
  static create(req, res) {
    const {
      name,
    } = req.body;
    return Line.create({ name: name, companyId: req.params.id })
      .then(line => res.status(201).send(line))
      .catch(error => res.status(400).send(error));
  }

  static list(req, res) {
    Line.find({}).then((line) => {
      res.json(line);
    });
  }

  static update(req, res) {
    const {
      name,
    } = req.body;
    return Line.findByIdAndUpdate(req.params.id, {$set: {name: name}})
      .then(line => res.status(201).send(line))
      .catch(error => res.status(400).send(error));
  }

  static destroy(req, res) {
    return Line.findByIdAndRemove(req.params.id)
      .then(line => res.status(201).send(line))
      .catch(error => res.status(400).send(error));
  }

  static list_per_company(req, res) {
    Line.find({companyId: req.params.id}).then((lines) => {
      res.json(lines);
    });
  }
}

export default Lines;
