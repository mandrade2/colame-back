import Line from '../models/line';

class Lines {
  static create(req, res) {
    const {
      companyId,
      name,
    } = req.body;
    return Line.create({ name, companyId })
      .then(line => res.status(201).send(line))
      .catch(error => res.status(400).send(error));
  }

  static list(req, res) {
    Line.find({}).then((line) => {
      res.json(line);
    });
  }
}

export default Lines;
