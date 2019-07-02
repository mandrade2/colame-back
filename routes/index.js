import Companies from '../controllers/company';
import Lines from '../controllers/line';
import Attendants from '../controllers/attendant';
import Clients from '../controllers/client';
import Times from '../controllers/time';

export default (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({
      success: true,
      message: 'Welcome to the Colame API!',
    });
  });
  /* COMPANY */
  app.post('/company', Companies.create);
  app.get('/company', Companies.list);
  app.put('/company/:id', Companies.update);
  app.delete('/company/:id', Companies.destroy);
  /* LINE */
  app.post('/company/:id/line', Lines.create);
  app.get('/line', Lines.list);
  app.patch('/line/:lineId', Lines.update);
  app.delete('/line/:lineId', Lines.destroy);
  app.get('/company/:id/lines', Lines.list_per_company);
  app.get('/line/:lineId', Lines.get);
  app.patch('/line/:lineId', Lines.next);
  app.patch('/line/:lineId/notArrived', Lines.notArrived);
  app.post('/line/:lineId', Lines.join);
  app.post('/line/:lineId/attendant', Lines.joinAttendant);
  app.patch('/line/:lineId/:userId', Lines.out)
  /* attendants */
  app.post('/company/:companyId/attendant', Attendants.create);
  app.get('/attendant', Attendants.list);
  app.patch('/attendant/:id', Attendants.update);
  app.delete('/attendant/:id', Attendants.destroy);
  app.get('/company/:companyId/attendants', Attendants.list_per_company);
  /* client*/
  app.patch('/client/:id', Clients.imhere);
  app.get('/client/:id', Clients.info);
  /*time*/
  app.post('/atttime', Times.createAttending);
  app.post('/waittime', Times.createWaiting);
  app.get('/line/:id/waitinfo', Times.lineInfoWaitingByDate);
  app.get('/line/:id/attinfo', Times.lineInfoAttendingByDate);
  app.get('/attendant/:id/info', Times.attendantInfoByDate);
};
