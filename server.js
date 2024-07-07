const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let customers = [];

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { no_pelanggan, nama, telp, point } = req.body;
  const customerExists = customers.some(customer => customer.telp === telp);

  if (customerExists) {
    res.status(400).json({ error: 'Customer already exists' });
  } else {
    const newCustomer = { no_pelanggan, nama, telp, point };
    customers.push(newCustomer);
    res.json(newCustomer);
  }
});

app.put('/update', (req, res) => {
  const { telp, nama } = req.body;
  const customer = customers.find(customer => customer.telp === telp);
  if (customer) {
    customer.nama = nama;
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

app.put('/updatePoint', (req, res) => {
  const { telp, point } = req.body;
  const customer = customers.find(customer => customer.telp === telp);
  if (customer) {
    customer.point = parseInt(point, 10);
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

app.get('/all', (req, res) => {
  res.json(customers);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
