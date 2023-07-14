const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL).then(e=> 
    console.log('Connected to MongoDB') 
    );