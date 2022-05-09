const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
let costumers = [
    { name: 'costumer 1', id: 1 },
    { name: 'costumer 2', id: 2 },
    { name: 'costumer 3', id: 3 },
    { name: 'costumer 4', id: 4 },
];
app.get('/', (req, res) => {
    res.send('hello world!!');
});

app.get('/api/costumers/:id', (req, res) => {
    const costumer = customers.find(c => c.id == parseInt(req.params.id));
    if (!costumer) res.status(404).send('no costumer was found with this id');
    res.send(costumer);
});
app.get('/api/costumers', (req, res) => {
    res.send([1, 2, 3]);
});
app.post('/api/costumers', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const costumer = {
        id: costumers.length + 1,
        name: req.body.name
    };
    costumers.push(costumer);
    res.send(costumer);
});
// const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening on port 3000...`));