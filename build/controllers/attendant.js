'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _attendant = require('../models/attendant');

var _attendant2 = _interopRequireDefault(_attendant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Attendants = function () {
  function Attendants() {
    _classCallCheck(this, Attendants);
  }

  _createClass(Attendants, null, [{
    key: 'create',
    value: function create(req, res) {
      var name = req.body.name;

      return _attendant2.default.create({ name: name, companyId: req.params.id }).then(function (attendant) {
        return res.status(201).send(attendant);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'list',
    value: function list(req, res) {
      _attendant2.default.find({}).then(function (attendant) {
        res.json(attendant);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var name = req.body.name;

      return _attendant2.default.findByIdAndUpdate(req.params.id, { $set: { name: name } }).then(function (attendant) {
        return res.status(201).send(attendant);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(req, res) {
      return _attendant2.default.findByIdAndRemove(req.params.id).then(function (attendant) {
        return res.status(201).send(attendant);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'list_per_company',
    value: function list_per_company(req, res) {
      _attendant2.default.find({ companyId: req.params.id }).then(function (attendants) {
        res.json(attendants);
      });
    }
  }]);

  return Attendants;
}();

exports.default = Attendants;