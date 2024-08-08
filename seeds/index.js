const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


// LOCAL CONNECTION // 

// mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// MONGO CONNECTION 

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


main().catch(err => {
    console.log(err)
    console.log('MONGOOSE CONNECTION ERROR')
});

// UPDATE THE BELOW LINES FOR MONGO OR LOCAL // 

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    await mongoose.connect(dbUrl);
    return console.log('Yelpcamp Database Connected ⛺')
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR AUTHOR ID //
            author: '6550e44e76f50d8e563a3bb6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/do7yzcrxs/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1701919100/YelpCamp/xifcexjnmvgldzljxgf8.jpg',
                    filename: 'YelpCamp/nlnx0tlfwypjtrua5bqp',
                },
                {
                    url: 'https://res.cloudinary.com/do7yzcrxs/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1701701157/YelpCamp/mqwsbyg5kbpjnudk0uct.jpg',
                    filename: 'YelpCamp/qlttancgeymbqv1enaqy',
                }
            ],

            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            price
        })
        await camp.save()
    }
}

seedDB();




