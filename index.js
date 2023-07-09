const { MongoClient, ObjectId } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// Database and collection names
const dbName = "OIC";
const collectionName = "Person";

// Create a new document
async function createDocument(document) {
  const client = new MongoClient(uri);

  try {
    await client.connect(); //db connection

    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.insertOne(document);
    console.log("Document created:", result.insertedId);
  } finally {
    await client.close();
  }
}

// Read documents
async function readDocuments() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db(dbName).collection(collectionName);
    const documents = await collection.find({}).toArray();
    console.log("Documents found:", documents);
  } finally {
    await client.close();
  }
}

// Update a document
async function updateDocument(filter, update) {
  const client = new MongoClient(uri);

  try {
    console.log({ filter, update });
    await client.connect();

    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.updateOne(filter, { $set: update });
    console.log("Document updated:", result.modifiedCount);
  } finally {
    await client.close();
  }
}

// Delete a document
async function deleteDocument(filter) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db(dbName).collection(collectionName);
    const result = await collection.deleteOne(filter);
    console.log("Document deleted:", result.deletedCount);
  } finally {
    await client.close();
  }
}

// Example usage
// const document = {
//   name: "Shreedhar Shrestha",
//   age: 23,
//   email: "sush@gmail.com",
//   address: "Kathmandu",
// };

// createDocument(document);

// updateDocument(
//   { _id: new ObjectId("64aa1311e1fa4c1028a0ab42") },
//   { name: "Shreedhar Ghimire", age: 23 }
// );

// deleteDocument({ _id: new ObjectId("64aa1311e1fa4c1028a0ab42") });
