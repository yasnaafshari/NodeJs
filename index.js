const express = require('express');
const debug = require('debug')('app:startup');
const config = require('config');
const Joi = require('joi');
const morgan = require('morgan');
const app = express();

app.use(express.json());
console.log(process.env.NODE_ENV);
console.log(app.get('env'));

//config
// console.log(config.get('name'));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('morgan enabled...');
}
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
    const costumer = customers.find(c => c.id === parseInt(req.params.id));
    if (!costumer) return res.status(404).send('no costumer was found with this id');
    res.send(costumer);
});
app.get('/api/costumers', (req, res) => {
    res.send(costumers);
});
app.post('/api/costumers', (req, res) => {

    const { error } = ValidateCostumer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const costumer = {
        id: costumers.length + 1,
        name: req.body.name
    };
    costumers.push(costumer);
    res.send(costumer);
});

app.put('/api/costumers/:id', (req, res) => {
    const costumer = costumers.find(c => c.id === parseInt(req.params.id));
    if (!costumer) return res.status(404).send('no costumer was found with this id');

    const { error } = ValidateCostumer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    costumer.name = req.body.name;
    res.send(costumer);

});

app.delete('/api/costumers/:id', (req, res) => {
    const costumer = costumers.find(c => c.id === parseInt(req.params.id));
    if (!costumer) return res.status(404).send('no costumer was found with this id');

    const index = costumers.indexOf(costumer);
    costumers.splice(index, 1);
    res.send(costumer);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

function ValidateCostumer(costumer) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(costumer, schema);
}
