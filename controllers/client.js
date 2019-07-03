import Client from '../models/client';

class Clients {
  static info(req, res) {
    Client.findById(req.params.id)
      .then((user) => {
        res.json(user);
      });
  }
  static imhere(req, res) {
    Client.findById(req.params.id)
      .then((user) => {
        switch (user.here) {
          case true:
            user.here = false;
            break;
          case false:
            user.here = true;
            break;
        }
        user.save();
        res.status(200).send();
      })
      .catch(error => res.status(400).send(error));
  }
}

export default Clients;
