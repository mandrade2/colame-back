import AttendingTime from '../models/attendingtime';
import WaitingTime from '../models/waitingtime';

class Times {
  static createAttending(req, res) {
    const {
      date,
      seconds,
      clientId,
      attendantId,
      lineId,
    } = req.body;
    return AttendingTime.create({ date, seconds, clientId, attendantId, lineId })
      .then(attendingtime => res.status(201).send(attendingtime))
      .catch(error => res.status(400).send(error));
  }

  static createWaiting(req, res) {
    const {
      date,
      seconds,
      clientId,
      attendants,
      lineId,
    } = req.body;
    return WaitingTime.create({ date, seconds, clientId, attendants, lineId })
      .then(waitingtime => res.status(201).send(waitingtime))
      .catch(error => res.status(400).send(error));
  }

  static listAttending(req, res) {
    AttendingTime.find({}).then((att) => {
      res.json(att);
    });
  }

  static listWaiting(req, res) {
    WaitingTime.find({}).then((wait) => {
      res.json(wait);
    });
  }
}

export default Times;
