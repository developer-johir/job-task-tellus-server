const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
 
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lo9eyry.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
   try {

       const postCollection = client.db('tellus').collection('allPost')


       app.post('/allPost', async (req, res) => {
           const totalPost = req.body;
           const result = await postCollection.insertOne(totalPost)
           console.log(result);
           res.send(result)
       });

       app.get('/allPost', async (req, res) => {
           const query = {}
           const cursor = postCollection.find(query)
           const posts = await cursor.toArray();
           res.send(posts);
       });

       app.get('/allPost/:id', async (req, res) => {
           const id = req.params.id;
           const query = { _id: ObjectId(id) }
           const posts = await postCollection.findOne(query)
           res.send(posts);
       });

   }
   finally {

   }
}
run().catch(error => console.error(error))



app.get('/', (req, res) => {
   res.send('Hello from node mongo Tellus server');
});
 
app.listen(port, () => {
   console.log(`Listening to port ${port}`);
})





// [
//     {
//       "name": "Tesla",
//       "image": "https://i.ytimg.com/vi/K-LWM-ZyvOc/maxresdefault.jpg"
//     },
//     {
//       "name": "Toyota",
//       "image": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Innova-Crysta/8105/1606215226663/front-view-118.jpg"
//     },
//     {
//       "name": "Lexus",
//       "image": "https://i.pinimg.com/736x/e3/f5/2b/e3f52b9cf5223144f09ec28e560d370f--solar-flares-orange-color.jpg"
//     }
//   ]
 