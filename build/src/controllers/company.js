'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Companies = function () {
  function Companies() {
    _classCallCheck(this, Companies);
  }

  _createClass(Companies, null, [{
    key: 'create',
    value: function create(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          description = _req$body.description;

      return _company2.default.create({ name: name, description: description }).then(function (company) {
        return res.status(201).send(company);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'list',
    value: function list(req, res) {
      _company2.default.find({}).then(function (line) {
        res.json(line);
      });
    }
  }, {
    key: 'update',
    value: function update(req, res) {
      var _req$body2 = req.body,
          name = _req$body2.name,
          description = _req$body2.description;

      return _company2.default.findByIdAndUpdate(req.params.id, { $set: { name: name, description: description } }).then(function (company) {
        return res.status(201).send(company);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy(req, res) {
      return _company2.default.findByIdAndRemove(req.params.id).then(function (company) {
        return res.status(201).send(company);
      }).catch(function (error) {
        return res.status(400).send(error);
      });
    }
  }]);

  return Companies;
}();

exports.default = Companies;