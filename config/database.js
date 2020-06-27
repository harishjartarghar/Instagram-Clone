mongoose=require('mongoose');
const {MongoUri}=require('./keys');
const colors = require('colors');

module.exports= mongoConnect=()=>{
    mongoose
    .connect(
      MongoUri,
      { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify:false, useCreateIndex: true }
    )
    .then(() => console.log('MongoDB Connected'.blue.underline))
    .catch(err => console.log(`${err}`.red));
}