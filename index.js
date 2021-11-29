const express = require('express')
require("dotenv").config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sqmxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        client.connect()
        // create database
        const database = client.db("portfolio");
        const projectCollection = database.collection("projects");

        app.get('/projects', async (req, res) => {
            const cursor = projectCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        })
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await projectCollection.findOne(query)
            res.json(result)
        })

    }


    catch {
        // client.close()
    }
}
run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})