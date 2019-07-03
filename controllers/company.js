import bcrypt from 'bcrypt';
import Company from '../models/company';

class Companies {
  static async create(req, res) {
    const {
      name,
      description,
      username,
      plainpassword,
    } = req.body;
    const hashedpwd = await bcrypt.hashSync(plainpassword, 10).then(hash => hash);
    return Company.create({
      name,
      description,
      username,
      password: hashedpwd,
    })
      .then(company => res.status(201).send(company))
      .catch(error => res.status(400).send(error));
  }

  static list(req, res) {
    Company.find({}).then((line) => {
      res.json(line);
    });
  }

  static async update(req, res) {
    const {
      name,
      description,
      username,
      plainpassword,
    } = req.body;
    const hashedpwd = await bcrypt.hash(plainpassword, 10).then(hash => hash);
    return Company.findByIdAndUpdate(req.params.id, {
      $set: {
        name,
        description,
        username,
        password: hashedpwd,
      },
    })
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
