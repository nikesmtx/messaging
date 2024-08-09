const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb"://localhost/messaging', { useNewUrlParser: true });

// Middleware
app.use(bodyParser.json());

// Define your API routes (GET, POST, PUT, DELETE)
app.get('/api/messaging', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World!');
});

app.post('/api/messaging', (req: any, res: { send: (arg0: string) => void; }) => {
  console.log(req.body);
  res.send('Message received!');
});

app.put('/api/messages/:id', (req: any, res: { send: (arg0: string) => void; }) => {
    console.log(req.body);
    res.send('Message updated!');
});

app.delete('/api/messages/:id', (req: any, res: { send: (arg0: string) => void; }) => {
    console.log(req.body);
    res.send('Message deleted!');
});


// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

export {};
