const DataModel = require('./models/data');
const app = require('express')();


app.get('/api/data', async ( req: any, res: {
    status: any; send: (arg0: any) => void; 
}) => {
    try {
        const data = await DataModel.find();
    res.send(data);
    } catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/data', async (req: any, res: {
    status: any; send: (arg0: any) => void;
}) => {
    try {
        const data = new DataModel(req.body);
        await data.save();
        res.send(data);
    } catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
});

export {};