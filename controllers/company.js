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
}

export default Companies;
