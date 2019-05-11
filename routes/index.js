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
  /* LINE */
  app.post('/line', Lines.create);
  app.get('/line', Lines.list);
  /* attendants */
  app.post('/attendant', Attendants.create);
  app.get('/attendant', Attendants.list);
};
