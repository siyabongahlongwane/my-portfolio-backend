const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const sendMail = require('./controllers/sendEmail');

// app.use(cors({origin: 'http://localhost:4000'}));
app.use(cors({origin: '*'}));
app.use(express.json());

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
app.use('/api/mail/', sendMail);