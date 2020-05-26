const express = require('express');
const cors = require('cors');
bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  _ = require('lodash');


const customerTable = [];
for (let i = 0; i <= 300; i++) {
  customerTable.push({
    id: i,
    name: `batman${i}`,
    address: Math.random() * 1000,
    phone: `777${Math.random() * 1000}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

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

app.route('/api/customers')
  .get((req, res) => {
    timer(() => {
      const count = customerTable.length;
      const limit = 20;
      const page = req.query.page;
      const startIndex = page * limit;

      res.json({
        items: customerTable.slice(startIndex, startIndex + limit),
        pages: Math.ceil(count / limit),
      });
    });
  })
  .post((req, res) => {
    timer(() => {
      const customer = {
        id: customerTable.length,
        ..._.pick(req.body, ['name', 'address', 'phone']),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      customerTable.push(customer)
      res.json(customer);
    });
  });

app.route('/api/customers/:customer_id')
  .get((req, res) => {
    timer(() => {
      res.json(customerTable.find(item => item.id === Number(req.params.customer_id)));
    });
  })
  .put((req, res) => {
    timer(() => {
      const key = customerTable.findIndex(item => item.id === Number(req.params.customer_id));
      if(key >= 0){
        customerTable[key] = {
          ...customerTable[key],
          ..._.pick(req.query, ['name', 'address', 'phone']),
          updatedAt: new Date(),
        };
        res.json(customerTable[key]);
      }
    });
  })
  .delete((req, res) => {
    timer(() => {
      _.remove(customerTable, ({ id }) => id == Number(req.params.customer_id));
      res.json({ id: Number(req.params.customer_id) });
    });
  });

// Starting express server
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
