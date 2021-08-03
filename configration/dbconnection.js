const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Kaar-Share', 
{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('Connected To mongo')
})
mongoose.connection.on('error', (eror) => {
    console.log('Error', eror)
})