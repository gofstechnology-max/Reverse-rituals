const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const products = [
  {
    name: 'Rosemary Alchemy Water',
    price: 299,
    description: 'A potent Rosemary infusion for hair growth and scalp health. Crafted with traditional Ayurvedic heritage and clinically proven ingredients.',
    image: 'https://8upload.com/image/c687fcd4a74c72d7/IMG_4138__1_.jpg',
    category: 'Hair Care',
    countInStock: 20,
  },
  {
    name: 'Neem Wood Comb',
    price: 199,
    description: 'Eco-friendly Neem wood comb for anti-dandruff and healthy scalp. Natural medicinal properties that plastic combs can\'t match.',
    image: 'https://i.ibb.co/ycfwLBYm/IMG-4139-1.jpg',
    category: 'Accessories',
    countInStock: 50,
  },
  {
    name: 'Manual Scalp Massager',
    price: 199,
    description: 'Soft silicone scalp massager to stimulate blood flow and deep clean. Experience instant relaxation and faster growth.',
    image: 'https://i.ibb.co/Y4frtT58/IMG-4140-1.jpg',
    category: 'Accessories',
    countInStock: 30,
  },
  {
    name: 'Reverse Ritual Combo',
    price: 399,
    description: 'The complete Reverse Ritual for total hair transformation. Includes Rosemary Alchemy Water, Neem Wood Comb, and Manual Scalp Massager at a special value.',
    image: 'https://i.ibb.co/XNRbjbM/IMG-4143-1.jpg',
    category: 'Combo',
    countInStock: 10,
  },
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'greensignaltamil@gmail.com',
      password: '123321',
      isAdmin: true,
    });

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}