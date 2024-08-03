const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";

main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    mongoose.connect(mongo_url);
};



const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: '66a10c526b4402cc8f278101'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");

};

initDB();
