const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;



// Middleware
app.use(cors());



// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true,
//     optionsSuccessStatus: 200,
// }

app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ola8x0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
    //   await client.connect();

    const productCollections = client.db("nextgenshop").collection("products");


    // Get all surveys data methods
    app.get('/products', async (req, res) => {
      let sortQuery = { ratings: -1 };

      const { sort } = req.query;
      if (sort === 'top_DESC') {
        sortQuery = { ratings: -1 };
      }
      try {
        const result = await productCollections.find({}).sort(sortQuery).limit(6).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching top foods:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });




    app.get('/all-surveys', async (req, res) => {
      const size = parseInt(req.query.size) || 10;
      const page = parseInt(req.query.page) || 1; // Page 1-based indexing
      const filter = req.query.filter;
      const sort = req.query.sort;
      const search = req.query.search;

      // Build the query object
      let query = search ? { product_name: { $regex: search, $options: 'i' } } : {};
      if (filter) query.category = filter;

      // Build the sort options
      let sortOptions = {};
      if (sort) sortOptions.voteCount = sort === 'asc' ? 1 : -1;

      try {
        // Fetch surveys and total count
        const [surveys, totalCount] = await Promise.all([
          productCollections.find(query).sort(sortOptions).skip((page - 1) * size).limit(size).toArray(),
          productCollections.countDocuments(query)
        ]);

        res.send({ surveys, totalCount });
      } catch (error) {
        console.error('Error fetching surveys:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });


    // Get all surveys data count from db
    app.get('/products-count', async (req, res) => {
      const filter = req.query.filter;
      const search = req.query.search;

      // Build the query object
      let query = search ? { title: { $regex: search, $options: 'i' } } : {};
      if (filter) query.category = filter;

      try {
        const count = await productCollections.countDocuments(query);
        res.send({ count });
      } catch (error) {
        console.error('Error fetching survey count:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });




      // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Welcome...');
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });