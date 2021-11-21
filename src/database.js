const mongoose = require('mongoose');


mongoose
  .connect('mongodb+srv://ibarbero:51RCa8csRTAQfV0M@cluster0.dx8yw.mongodb.net/SettleChallenge?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('mongo db connected'))
  .catch(err => console.log(err))


module.exports = mongoose;