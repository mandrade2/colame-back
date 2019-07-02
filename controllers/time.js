import AttendingTime from '../models/attendingtime';
import WaitingTime from '../models/waitingtime';

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function hex(value) {
  return Math.floor(value).toString(16)
}

function objectId() {
  return hex(Date.now() / 1000) +
    ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16))
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

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

  static waitingSeed(req, res) {
    const seconds = Math.floor(Math.random() * 600) + 30;
    const attendants = ['5cf48996b37c562729a46de6', '5cf48aa1e60cad275a38ef43', '5cf53da7db51cc280b454670'];
    const clientId = objectId();
    const lineId = '5cf415065a6d0d08a6b8bdfd';
    const date = randomDate(new Date(2019, 5, 16), new Date());
    const obj = {
      seconds, attendants, clientId, lineId, date,
    };
    return WaitingTime.create(obj)
      .then(waitingtime => res.status(201).send(waitingtime))
      .catch(error => res.status(400).send(error));
  }

  static attendingSeed(req, res) {
    const seconds = Math.floor(Math.random() * 210) + 30;
    const attendants = ['5cf48996b37c562729a46de6', '5cf48aa1e60cad275a38ef43', '5cf53da7db51cc280b454670'];
    const clientId = objectId();
    const lineId = '5cf415065a6d0d08a6b8bdfd';
    const date = randomDate(new Date(2019, 5, 16), new Date());
    const attendantId = attendants[Math.floor(Math.random() * attendants.length)]
    const obj = {
      seconds, attendantId, clientId, lineId, date,
    };
    return AttendingTime.create(obj)
      .then(waitingtime => res.status(201).send(waitingtime))
      .catch(error => res.status(400).send(error));
  }

  static lineInfoWaitingByDate(req, res) {
    const { initialDate, finalDate } = req.query;
    return WaitingTime.find({ lineId: req.params.id }).sort({ date: 1 }).then((wait) => {
      if (wait.length < 1) {
        return res.json({
          clients: 0, avgTime: 0, clientPerDay: 0, maxtime: 0, mintime: 0,
        });
      }
      let clients = 0.0;
      let time = 0.0;
      let maxDate = new Date(1970, 0, 1);
      let minDate = new Date(2080, 11, 31);
      let maxtime = -1;
      let mintime = 10 ** 10;
      let avgTime = 0;
      let clientPerDay = 0;
      let dataPerDate = {};
      const init = new Date(initialDate);
      const final = new Date(finalDate);
      for (let x in wait) {
        let currentDate = new Date(wait[x].date);
        currentDate = new Date(Date.UTC(currentDate.getFullYear(),currentDate.getMonth(), currentDate.getDate()));
        let srtingDate = formatDate(currentDate);
        if (currentDate < init) {
          continue;
        }
        if (currentDate > final) {
          break;
        }
        if (currentDate > maxDate) {
          maxDate = currentDate;
        }
        if (currentDate < minDate) {
          minDate = currentDate;
        }
        clients = clients + 1;
        time = time + wait[x].seconds;
        if (wait[x].seconds > maxtime) {
          maxtime = wait[x].seconds;
        }
        if (wait[x].seconds < mintime) {
          mintime = wait[x].seconds;
        }
        if (srtingDate in dataPerDate){
          dataPerDate[srtingDate].avgTime = dataPerDate[srtingDate].avgTime + wait[x].seconds;
          dataPerDate[srtingDate].clients = dataPerDate[srtingDate].clients + 1;
          if (wait[x].seconds > dataPerDate[srtingDate].maxtime) {
            dataPerDate[srtingDate].maxtime = wait[x].seconds;
          }
          if (wait[x].seconds < dataPerDate[srtingDate].mintime) {
            dataPerDate[srtingDate].mintime = wait[x].seconds;
          }
        } else {
          dataPerDate[srtingDate] = {};
          dataPerDate[srtingDate]['clients'] = 1;
          dataPerDate[srtingDate]['avgTime'] = wait[x].seconds;
          dataPerDate[srtingDate]['maxtime'] = wait[x].seconds;
          dataPerDate[srtingDate]['mintime'] = wait[x].seconds;
        }
      }
      const diffTime = Math.abs(maxDate.getTime() - minDate.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        diffDays = 1;
      }
      clientPerDay = clients / diffDays;
      if (clients > 0) {
        avgTime = time / clients;
      }
      for (let x in dataPerDate) {
        if (dataPerDate[x].clients > 0 ) {
            dataPerDate[x].avgTime = dataPerDate[x].avgTime / dataPerDate[x].clients
        }
      }
      return res.json({
        clients, avgTime, clientPerDay, maxtime, mintime, dataPerDate,
      });
    })
      .catch(error => res.status(400).send(error));
  }

  static lineInfoAttendingByDate(req, res) {
    const { initialDate, finalDate } = req.query;
    return AttendingTime.find({ lineId: req.params.id }).sort({ date: 1 }).then((wait) => {
      if (wait.length < 1) {
        return res.json({
          clients: 0, avgTime: 0, clientPerDay: 0, maxtime: 0, mintime: 0,
        });
      }
      let clients = 0.0;
      let time = 0.0;
      let maxDate = new Date(1970, 0, 1);
      let minDate = new Date(2080, 11, 31);
      let maxtime = -1;
      let mintime = 10 ** 10;
      let avgTime = 0;
      let clientPerDay = 0;
      const init = new Date(initialDate);
      const final = new Date(finalDate);
      let dataPerAttendant = {};
      let dataPerDate = {};
      for (let x in wait) {
        let currentDate = new Date(wait[x].date);
        currentDate = new Date(Date.UTC(currentDate.getFullYear(),currentDate.getMonth(), currentDate.getDate()));
        let srtingDate = formatDate(currentDate);
        if (currentDate < init) {
          continue;
        }
        if (currentDate > final) {
          break;
        }
        if (currentDate > maxDate) {
          maxDate = currentDate;
        }
        if (currentDate < minDate) {
          minDate = currentDate;
        }
        clients = clients + 1;
        time = time + wait[x].seconds;
        if (wait[x].seconds > maxtime) {
          maxtime = wait[x].seconds;
        }
        if (wait[x].seconds < mintime) {
          mintime = wait[x].seconds;
        }
        if (wait[x].attendantId in dataPerAttendant){
          dataPerAttendant[wait[x].attendantId].avgTime = dataPerAttendant[wait[x].attendantId].avgTime + wait[x].seconds;
          dataPerAttendant[wait[x].attendantId].clients = dataPerAttendant[wait[x].attendantId].clients + 1;
          if (wait[x].seconds > dataPerAttendant[wait[x].attendantId].maxtime) {
            dataPerAttendant[wait[x].attendantId].maxtime = wait[x].seconds;
          }
          if (wait[x].seconds < dataPerAttendant[wait[x].attendantId].mintime) {
            dataPerAttendant[wait[x].attendantId].mintime = wait[x].seconds;
          }
          if (new Date(wait[x].date) < dataPerAttendant[wait[x].attendantId].minDate) {
            dataPerAttendant[wait[x].attendantId].minDate = new Date(wait[x].date);
          }
          if (new Date(wait[x].date) > dataPerAttendant[wait[x].attendantId].maxDate) {
            dataPerAttendant[wait[x].attendantId].maxDate = new Date(wait[x].date);
          }
        } else {
          dataPerAttendant[wait[x].attendantId] = {};
          dataPerAttendant[wait[x].attendantId]['clients'] = 1;
          dataPerAttendant[wait[x].attendantId]['avgTime'] = wait[x].seconds;
          dataPerAttendant[wait[x].attendantId]['maxtime'] = wait[x].seconds;
          dataPerAttendant[wait[x].attendantId]['mintime'] = wait[x].seconds;
          dataPerAttendant[wait[x].attendantId]['minDate'] = new Date(wait[x].date);
          dataPerAttendant[wait[x].attendantId]['maxDate'] = new Date(wait[x].date);
        }
        if (srtingDate in dataPerDate){
          dataPerDate[srtingDate].avgTime = dataPerDate[srtingDate].avgTime + wait[x].seconds;
          dataPerDate[srtingDate].clients = dataPerDate[srtingDate].clients + 1;
          if (wait[x].seconds > dataPerDate[srtingDate].maxtime) {
            dataPerDate[srtingDate].maxtime = wait[x].seconds;
          }
          if (wait[x].seconds < dataPerDate[srtingDate].mintime) {
            dataPerDate[srtingDate].mintime = wait[x].seconds;
          }
          if (wait[x].attendantId in dataPerDate[srtingDate].dataPerAttendant) {
            dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].avgTime = dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].avgTime + wait[x].seconds;
            dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].clients = dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].clients + 1;
            if (wait[x].seconds > dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].maxtime) {
              dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].maxtime = wait[x].seconds;
            }
            if (wait[x].seconds < dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].mintime) {
              dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId].mintime = wait[x].seconds;
            }
          } else {
            dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId] = {};
            dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['clients'] = 1;
            dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['avgTime'] = wait[x].seconds;
            dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['maxtime'] = wait[x].seconds;
            dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['mintime'] = wait[x].seconds;
          }
        } else {
          dataPerDate[srtingDate] = {};
          dataPerDate[srtingDate]['clients'] = 1;
          dataPerDate[srtingDate]['avgTime'] = wait[x].seconds;
          dataPerDate[srtingDate]['maxtime'] = wait[x].seconds;
          dataPerDate[srtingDate]['mintime'] = wait[x].seconds;
          dataPerDate[srtingDate]['dataPerAttendant'] = {};
          dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId] = {};
          dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['clients'] = 1;
          dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['avgTime'] = wait[x].seconds;
          dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['maxtime'] = wait[x].seconds;
          dataPerDate[srtingDate].dataPerAttendant[wait[x].attendantId]['mintime'] = wait[x].seconds;
        }
      }
      const diffTime = Math.abs(maxDate.getTime() - minDate.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        diffDays = 1;
      }
      clientPerDay = clients / diffDays;
      if (clients > 0) {
        avgTime = time / clients;
      }
      for (let x in dataPerAttendant){
        if (dataPerAttendant[x].clients > 0 ){
            dataPerAttendant[x].avgTime = dataPerAttendant[x].avgTime / dataPerAttendant[x].clients
        }
        let diffTime1 = Math.abs(dataPerAttendant[x].maxDate.getTime() - dataPerAttendant[x].minDate.getTime());
        let diffDays1 = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays1 === 0) {
          diffDays1 = 1;
        }
        dataPerAttendant[x]['clientPerDay'] = dataPerAttendant[x].clients / diffDays1;
        delete dataPerAttendant[x]['maxDate'];
        delete dataPerAttendant[x]['minDate'];
      }
      for (let x in dataPerDate){
        if (dataPerDate[x].clients > 0 ){
            dataPerDate[x].avgTime = dataPerDate[x].avgTime / dataPerDate[x].clients
        }
        for (let y in dataPerDate[x].dataPerAttendant){
          if (dataPerDate[x].dataPerAttendant[y].clients > 0 ){
              dataPerDate[x].dataPerAttendant[y].avgTime = dataPerDate[x].dataPerAttendant[y].avgTime / dataPerDate[x].dataPerAttendant[y].clients
          }
        }
      }
      return res.json({
        clients, avgTime, clientPerDay, maxtime, mintime, dataPerAttendant, dataPerDate,
      });
    })
      .catch(error => res.status(400).send(error));
  }

  static attendantInfoByDate(req, res) {
    const { initialDate, finalDate } = req.query;
    return AttendingTime.find({ attendantId: req.params.id }).sort({ date: 1 }).then((wait) => {
      if (wait.length < 1) {
        return res.json({
          clients: 0, avgTime: 0, clientPerDay: 0, maxtime: 0, mintime: 0,
        });
      }
      let clients = 0.0;
      let time = 0.0;
      let maxDate = new Date(1970, 0, 1);
      let minDate = new Date(2080, 11, 31);
      let maxtime = -1;
      let mintime = 10 ** 10;
      let avgTime = 0;
      let dataPerLine = {};
      let dataPerDate = {};
      let clientPerDay = 0;
      const init = new Date(initialDate);
      const final = new Date(finalDate);
      for (let x in wait) {
        let currentDate = new Date(wait[x].date);
        let srtingDate = formatDate(currentDate);
        currentDate = new Date(Date.UTC(currentDate.getFullYear(),currentDate.getMonth(), currentDate.getDate()));
        if (currentDate < init) {
          continue;
        }
        if (currentDate > final) {
          break;
        }
        if (currentDate > maxDate) {
          maxDate = currentDate;
        }
        if (currentDate < minDate) {
          minDate = currentDate;
        }
          clients = clients + 1;
          time = time + wait[x].seconds;
          if (wait[x].seconds > maxtime) {
            maxtime = wait[x].seconds;
          }
          if (wait[x].seconds < mintime) {
            mintime = wait[x].seconds;
          }
          if (wait[x].lineId in dataPerLine){
            dataPerLine[wait[x].lineId].avgTime = dataPerLine[wait[x].lineId].avgTime + wait[x].seconds;
            dataPerLine[wait[x].lineId].clients = dataPerLine[wait[x].lineId].clients + 1;
            if (wait[x].seconds > dataPerLine[wait[x].lineId].maxtime) {
              dataPerLine[wait[x].lineId].maxtime = wait[x].seconds;
            }
            if (wait[x].seconds < dataPerLine[wait[x].lineId].mintime) {
              dataPerLine[wait[x].lineId].mintime = wait[x].seconds;
            }
            if (new Date(wait[x].date) < dataPerLine[wait[x].lineId].minDate) {
              dataPerLine[wait[x].lineId].minDate = new Date(wait[x].date);
            }
            if (new Date(wait[x].date) > dataPerLine[wait[x].lineId].maxDate) {
              dataPerLine[wait[x].lineId].maxDate = new Date(wait[x].date);
            }
          } else {
            dataPerLine[wait[x].lineId] = {};
            dataPerLine[wait[x].lineId]['clients'] = 1;
            dataPerLine[wait[x].lineId]['avgTime'] = wait[x].seconds;
            dataPerLine[wait[x].lineId]['maxtime'] = wait[x].seconds;
            dataPerLine[wait[x].lineId]['mintime'] = wait[x].seconds;
            dataPerLine[wait[x].lineId]['minDate'] = new Date(wait[x].date);
            dataPerLine[wait[x].lineId]['maxDate'] = new Date(wait[x].date);
          }
          if (srtingDate in dataPerDate){
            dataPerDate[srtingDate].avgTime = dataPerDate[srtingDate].avgTime + wait[x].seconds;
            dataPerDate[srtingDate].clients = dataPerDate[srtingDate].clients + 1;
            if (wait[x].seconds > dataPerDate[srtingDate].maxtime) {
              dataPerDate[srtingDate].maxtime = wait[x].seconds;
            }
            if (wait[x].seconds < dataPerDate[srtingDate].mintime) {
              dataPerDate[srtingDate].mintime = wait[x].seconds;
            }
            if (wait[x].lineId in dataPerDate[srtingDate].dataPerLine) {
              dataPerDate[srtingDate].dataPerLine[wait[x].lineId].avgTime = dataPerDate[srtingDate].dataPerLine[wait[x].lineId].avgTime + wait[x].seconds;
              dataPerDate[srtingDate].dataPerLine[wait[x].lineId].clients = dataPerDate[srtingDate].dataPerLine[wait[x].lineId].clients + 1;
              if (wait[x].seconds > dataPerDate[srtingDate].dataPerLine[wait[x].lineId].maxtime) {
                dataPerDate[srtingDate].dataPerLine[wait[x].lineId].maxtime = wait[x].seconds;
              }
              if (wait[x].seconds < dataPerDate[srtingDate].dataPerLine[wait[x].lineId].mintime) {
                dataPerDate[srtingDate].dataPerLine[wait[x].lineId].mintime = wait[x].seconds;
              }
            } else {
              dataPerDate[srtingDate].dataPerLine[wait[x].lineId] = {};
              dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['clients'] = 1;
              dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['avgTime'] = wait[x].seconds;
              dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['maxtime'] = wait[x].seconds;
              dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['mintime'] = wait[x].seconds;
            }
          } else {
            dataPerDate[srtingDate] = {};
            dataPerDate[srtingDate]['clients'] = 1;
            dataPerDate[srtingDate]['avgTime'] = wait[x].seconds;
            dataPerDate[srtingDate]['maxtime'] = wait[x].seconds;
            dataPerDate[srtingDate]['mintime'] = wait[x].seconds;
            dataPerDate[srtingDate]['dataPerLine'] = {};
            dataPerDate[srtingDate].dataPerLine[wait[x].lineId] = {};
            dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['clients'] = 1;
            dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['avgTime'] = wait[x].seconds;
            dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['maxtime'] = wait[x].seconds;
            dataPerDate[srtingDate].dataPerLine[wait[x].lineId]['mintime'] = wait[x].seconds;
          }
      }
      const diffTime = Math.abs(maxDate.getTime() - minDate.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        diffDays = 1;
      }
      clientPerDay = clients / diffDays;
      if (clients > 0) {
        avgTime = time / clients;
      }
      for (let x in dataPerLine){
        if (dataPerLine[x].clients > 0 ){
            dataPerLine[x].avgTime = dataPerLine[x].avgTime / dataPerLine[x].clients
        }
        let diffTime1 = Math.abs(dataPerLine[x].maxDate.getTime() - dataPerLine[x].minDate.getTime());
        let diffDays1 = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays1 === 0) {
          diffDays1 = 1;
        }
        dataPerLine[x]['clientPerDay'] = dataPerLine[x].clients / diffDays1;
        delete dataPerLine[x]['maxDate'];
        delete dataPerLine[x]['minDate'];
      }

      for (let x in dataPerDate){
        if (dataPerDate[x].clients > 0 ){
            dataPerDate[x].avgTime = dataPerDate[x].avgTime / dataPerDate[x].clients
        }
        for (let y in dataPerDate[x].dataPerLine){
          if (dataPerDate[x].dataPerLine[y].clients > 0 ){
              dataPerDate[x].dataPerLine[y].avgTime = dataPerDate[x].dataPerLine[y].avgTime / dataPerDate[x].dataPerLine[y].clients
          }
        }
      }
      return res.json({
        clients, avgTime, clientPerDay, maxtime, mintime, dataPerLine, dataPerDate,
      });
    })
      .catch(error => res.status(400).send(error));
  }
}


export default Times;
