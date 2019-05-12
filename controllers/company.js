import Company from '../models/company';

class Companies {
  static create(req, res) {
    const {
      name,
      description,
    } = req.body;
    return Company.create({ name, description })
      .then(company => res.status(201).send(company))
      .catch(error => res.status(400).send(error));
  }

  static list(req, res) {
    Company.find({}).then((line) => {
      res.json(line);
    });
  }

  static update(req, res) {
    const {
      name,
      description,
    } = req.body;
    return Company.findByIdAndUpdate(req.params.id, {$set: {name: name, description: description}})
      .then(company => res.status(201).send(company))
      .catch(error => res.status(400).send(error));
  }

  static destroy(req, res) {
    return Company.findByIdAndRemove(req.params.id)
      .then(company => res.status(201).send(company))
      .catch(error => res.status(400).send(error));
  }
}

export default Companies;
