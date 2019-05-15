import Company from '../models/company';
import Attendant from '../models/attendant';
import Line from '../models/line';
import Client from '../models/client';

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/colame_db', { useNewUrlParser: true });

const companies = [
  new Company({name: 'Empresa 1',
               description: 'Esta es la descripción de la empresa 1'
  }),
  new Company({name: 'Empresa 2',
               description: 'Esta es la descripción de la empresa 2'
  }),
  new Company({name: 'Empresa 3',
               description: 'Esta es la descripción de la empresa 3'
  }),
  new Company({name: 'Empresa 4',
               description: 'Esta es la descripción de la empresa 4'
  }),
  new Company({name: 'Empresa 5',
               description: 'Esta es la descripción de la empresa 5'
  })
];

let done = 0;
for (let c = 0; c < companies.length; c++) {
  companies[c].save(function(err, result) {
    done++;
    if (done === companies.length) {
      populate_attendants();
    }
  });
}

const attendants = [
  new Attendant({name: 'Atendedor 1',
                 companyId: companies[0].id
  }),
  new Attendant({name: 'Atendedor 2',
                 companyId: companies[0].id
  }),
  new Attendant({name: 'Atendedor 3',
                 companyId: companies[1].id
  }),
  new Attendant({name: 'Atendedor 4',
                 companyId: companies[1].id
  }),
  new Attendant({name: 'Atendedor 5',
                 companyId: companies[2].id
  }),
  new Attendant({name: 'Atendedor 6',
                 companyId: companies[2].id
  }),
  new Attendant({name: 'Atendedor 7',
                 companyId: companies[3].id
  }),
  new Attendant({name: 'Atendedor 8',
                 companyId: companies[3].id
  }),
  new Attendant({name: 'Atendedor 9',
                 companyId: companies[4].id
  }),
  new Attendant({name: 'Atendedor 10',
                 companyId: companies[4].id
  })
];

function populate_attendants(){
  let done_att = 0;
  for (let a = 0; a < attendants.length; a++) {
    attendants[a].save(function(err, result) {
      done_att++;
      if (done_att === attendants.length) {
        populate_lines();
      }
    });
  }
}

const lines = [
  new Line({name: 'Fila 1',
            companyId: companies[0].id
  }),
  new Line({name: 'Fila 2',
            companyId: companies[0].id
  }),
  new Line({name: 'Fila 3',
            companyId: companies[1].id
  }),
  new Line({name: 'Fila 4',
            companyId: companies[2].id
  }),
  new Line({name: 'Fila 5',
            companyId: companies[2].id
  }),
  new Line({name: 'Fila 6',
            companyId: companies[3].id
  }),
  new Line({name: 'Fila 7',
            companyId: companies[4].id
  }),
  new Line({name: 'Fila 8',
            companyId: companies[4].id
  })
];

function populate_lines(){
  let done_lin = 0;
  for (let l = 0; l < lines.length; l++) {
    lines[l].save(function(err, result) {
      done_lin++;
      if (done_lin === lines.length) {
        populate_clients();
      }
    });
  }
}

const clients = [];

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 8; j++) {
    let client = new Client({position: i,
                             number: i,
                             lineId: lines[j].id
    });
    clients.push(client);
  }
}

function populate_clients(){
  let done_cli = 0;
  for (let c = 0; c < clients.length; c++) {
    clients[c].save(function(err, result) {
      done_cli++;
      if (done_cli === clients.length) {
        exit();
      }
    });
  }
}

function exit() {
  mongoose.disconnect();
}
