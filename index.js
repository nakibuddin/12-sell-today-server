const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wire
app.use(cors());            // for cors policy
app.use(express.json());    // for post request

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2arvn0y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const categoryCollection = client.db('sell_today').collection('categories');
        const productCollection = client.db('sell_today').collection('products');

        app.get('/categories',  async(req, res) => {
            const query = {};
            const cursor = categoryCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.post('/product', async(req,res) => {
            const product = req.body;            
            const result = await productCollection.insertOne(product)
            res.send(result);
        })
        
        app.get('/categories/:id',  async(req, res) => {            
            const id = parseInt(req.params.id);
            const query = {categoryId: id}
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);            
        })
    }

    finally{

    }
}

run().catch(err => console.error('my_database_error: ', err));


app.get('/', (req, res) => {
    res.send('welcome from server');
})

app.listen(port, () => console.log(`server is running on port ${port}`));
