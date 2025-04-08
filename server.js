const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3200;


app.use(cors());    
app.use(express.json());
app.use(express.static(path.join(__dirname + 'pages')));

app.use(cors({
    origin: 'http://localhost:3200', // or any specific domain
    methods: ['GET', 'POST'],        // allowed methods
    credentials: true                // if using cookies or auth headers
}));

app.listen(PORT, () => {
    console.log('listening!')
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    
});

