'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _company = require('../controllers/company');

var _company2 = _interopRequireDefault(_company);

var _line = require('../controllers/line');

var _line2 = _interopRequireDefault(_line);

var _attendant = require('../controllers/attendant');

var _attendant2 = _interopRequireDefault(_attendant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.get('/', function (req, res) {
    res.status(200).send({
      success: true,
      message: 'Welcome to the Colame API!'
    });
  });
  /* COMPANY */
  app.post('/company', _company2.default.create);
  app.get('/company', _company2.default.list);
  app.put('/company/:id', _company2.default.update);
  app.delete('/company/:id', _company2.default.destroy);
  /* LINE */
  app.post('/company/:id/line', _line2.default.create);
  app.get('/line', _line2.default.list);
  app.put('/line/:lineId', _line2.default.update);
  app.delete('/line/:lineId', _line2.default.destroy);
  app.get('/company/:id/lines', _line2.default.list_per_company);
  app.patch('/line/:lineId', _line2.default.next);
  app.post('/line/:lineId', _line2.default.join);
  app.patch('/line/:lineId/:userId', _line2.default.out);
  /* attendants */
  app.post('/company/:id/attendant', _attendant2.default.create);
  app.get('/attendant', _attendant2.default.list);
  app.put('/attendant/:id', _attendant2.default.update);
  app.delete('/attendant/:id', _attendant2.default.destroy);
  app.get('/company/:id/attendants', _attendant2.default.list_per_company);
};