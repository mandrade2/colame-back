import Companies from '../controllers/company';
import Lines from '../controllers/line';
import Attendants from '../controllers/attendant';

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
  app.put('/line/:lineId', Lines.update);
  app.delete('/line/:lineId', Lines.destroy);
  app.get('/company/:id/lines', Lines.list_per_company);
  app.get('/line/:lineId', Lines.get);
  app.patch('/line/:lineId', Lines.next);
  app.post('/line/:lineId', Lines.join);
  app.patch('/line/:lineId/:userId', Lines.out)
  /* attendants */
  app.post('/company/:id/attendant', Attendants.create);
  app.get('/attendant', Attendants.list);
  app.put('/attendant/:id', Attendants.update);
  app.delete('/attendant/:id', Attendants.destroy);
  app.get('/company/:id/attendants', Attendants.list_per_company);
};
