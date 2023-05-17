
const cities = require('./seeds/cities.js');
const mongoose = require('mongoose');
const { places, descriptors } = require('./seeds/seedhelpers.js');
const Campground = require('C:/Users/zaidk/OneDrive/Desktop/yelp/models/campground.js');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'644f49c3e68fd35a1f51557f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet con',
            price,
            geometry:{
                type:'Point',
                coordinates:[cities[random1000].longitude,cities[random1000].latitude]
            },
            images:[ {
                url: 'https://res.cloudinary.com/djfjsks1a/image/upload/v1683957299/YelpCamp/ulewiipfk4bfehknw3pg.jpg',
                filename: 'YelpCamp/ulewiipfk4bfehknw3pg',
              }
          ,{url: 'https://res.cloudinary.com/djfjsks1a/image/upload/v1683957349/YelpCamp/jskwswwvqdg9rfe8ucwd.png',
            filename: 'YelpCamp/jskwswwvqdg9rfe8ucwd',
        }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    process.exit();
})


// Path: seeds\seedhelpers.js 