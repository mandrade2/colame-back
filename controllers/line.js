import Line from '../models/line';
import Client from '../models/client';

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
    return Line.findByIdAndUpdate(req.params.lineId, { $set: { name } })
      .then((err, line) => {
        res.status(201).send(line);
      })
      .catch(error => res.status(400).send(error));
  }

  static destroy(req, res) {
    return Line.findByIdAndRemove(req.params.lineId)
      .then(line => res.status(201).send(line))
      .catch(error => res.status(400).send(error));
  }

  static list_per_company(req, res) {
    Line.find({companyId: req.params.id}).then((lines) => {
      res.json(lines);
    });
  }

  static get(req, res) {
    Line.findById(req.params.lineId).then(line => res.status(200).send(line));
  }

  static join(req, res) {
    Line.findById(req.params.lineId)
      .then((line) => {
        Client.create({ position: line.clients.length, number: line.currentNumber, lineId: req.params.lineId })
          .then(async (client) => {
            line.clients.push(client._id);
            line.currentNumber += 1;
            await line.save();
            res.status(201).send({ line, client });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  static next(req, res) {
    const {
      clientId,
    } = req.body;
    Line.findById(req.params.lineId)
      .then(async (line) => {
        if (line.attending.indexOf(clientId) > -1) {
          line.attending.splice(line.clients.indexOf(clientId), 1);
        }
        await line.save();
        if (line.clients.length === 0) {
          res.status(204).send({ _id: null, number: null });
        } else {
          const client = line.clients.shift();
          line.attending.push(client);
          line.save();
          Client.findById(client).then(clientModel => res.status(201).send(clientModel));
        }
      })
      .catch(error => res.status(400).send(error));
  }

  static notArrived(req, res) {
    const {
      clientId,
    } = req.body;
    Line.findById(req.params.lineId)
      .then(async (line) => {
        if (line.attending.indexOf(clientId) > -1) {
          line.attending.splice(line.clients.indexOf(clientId), 1);
        }
        line.clients.push(clientId);
        const client = line.clients.shift();
        line.attending.push(client);
        await line.save();
        Client.findById(client).then(clientModel => res.status(201).send(clientModel));
      })
      .catch(error => res.status(400).send(error));
  }

  static out(req, res) {
    Line.findById(req.params.lineId)
      .then((line) => {
        if (line.clients.indexOf(req.params.userId) === -1) {
          res.status(404).send();
        } else {
          line.clients.splice(line.clients.indexOf(req.params.userId), 1);
          line.save();
          res.status(200).send(line);
        }
      });
  }

  static joinAttendant(req, res) {
    const {
      attendantId,
    } = req.body;
    Line.findById(req.params.lineId)
      .then(async (line) => {
        line.attendants.push(attendantId);
        await line.save();
        res.status(201).send(line);
      })
      .catch(error => res.status(400).send(error));
  }
}

export default Lines;
