const express = require('express');
const cors = require('cors');
bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  sqlite3 = require('sqlite3'),
  Sequelize = require('sequelize'),
  _ = require('lodash');


sequelize = new Sequelize(`sqlite://${path.join(__dirname, 'invoices.sqlite')}`, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'invoices.sqlite'),
});

Customer = sequelize.define('customers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
});

sequelize.sync()
  .then(() => {
    Customer.truncate();
  })
  .then(() => {

    Customer.create({
      name: 'catwomen',
      address: 'DS',
      phone: '666',
    });

    for (let i = 0; i <= 300; i++) {
      Customer.create({
        name: `batman${i}`,
        address: Math.random() * 1000,
        phone: `777${Math.random() * 1000}`,
      });
    }
  })
  .catch((e) => {
    console.log('ERROR SYNCING WITH DB', e);
  });

const app = module.exports = express();
app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const timer = (cb) => {
  setTimeout(() => {
    cb();
  }, 1000);
};
// CUSTOMERS API

app.route('/api/customers').get((req, res) => {
  timer(() => {
    Customer.count().then((count) => {
      const limit = 20;
      Customer.findAll({ offset: (req.query.page * limit), limit }).then((customers) => {
        res.json({
          items: customers,
          pages: Math.ceil(count / limit),
        });
      });
    });
  });
})
  .post((req, res) => {
    timer(() => {
      const customer = Customer.build(_.pick(req.body, ['name', 'address', 'phone']));
      customer.save().then((customer) => {
        res.json(customer);
      });
    });
  });

app.route('/api/customers/:customer_id').get((req, res) => {
  timer(() => {
    Customer.findById(req.params.customer_id).then((customer) => {
      res.json(customer);
    });
  });
})
  .put((req, res) => {
    timer(() => {
      Customer.findById(req.params.customer_id).then((customer) => {
        customer.update(_.pick(req.body, ['name', 'address', 'phone'])).then((customer) => {
          res.json(customer);
        });
      });
    });
  })
  .delete((req, res) => {
    timer(() => {
      Customer.findById(req.params.customer_id).then((customer) => {
        customer.destroy().then((customer) => {
          res.json(customer);
        });
      });
    });
  });

// Starting express server
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
