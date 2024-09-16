// lib/mongodb.js
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 30000,
  connectTimeoutMS: 30000,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Lütfen MONGODB_URI ortam değişkenini ayarlayın')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise