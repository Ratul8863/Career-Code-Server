const express = require('express'); 

const cors = require('cors')  
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// Create an Express application 

const app = express(); 
const port = process.env.PORT || 3000; 
require('dotenv').config()

app.use(cors()) 
app.use(express.json()) 





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vdu9uqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri  , {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


const jobscollection = client.db("Career-Code").collection("Jobs");
const applications = client.db("Career-Code").collection("applications");

app.get('/jobs' ,async(req ,res)=>{
  const cursor = jobscollection.find();
  const result = await cursor.toArray();
  res.send(result);
})
    
app.get ('/jobs/:id', async(req,res) => {
  const id =req.params.id;
  const query = {_id : new ObjectId(id)};
  const result = await jobscollection.findOne(query);
  res.send(result);
})

app.get('/applications', async (req,res)=>
{
  const email = req.query.email;
  const query = 
  {
    email : email
  }

  const result = await applications.find(query).toArray();
  res.send(result)
})



app.post('/applications', async(req,res)=>{
  const application = req.body;
  const result = await applications.insertOne(application);
  res.send(result)
})


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Define a route for the root URL ('/') that sends "Hello World!" as the response 

app.get('/', (req, res) => { 

  res.send('Job Portal '); 

}); 


 



 

// Start the server and listen on the defined port 

app.listen(port, () => { 

  console.log(`Example app listening on port ${port}`); 

}); 