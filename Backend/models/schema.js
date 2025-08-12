

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
});

const adminSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
});

// category schema
const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  description: { type: String },
});

const productSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, ref: "Category", required: true },
  countInStock: { type: Number, required: true, min: 0 },
  rating: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now },
});



const addToCartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, min: 1, required: true, default: 1 },
  productname: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});


const orderSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String, required: true },
  productId: { type: String, required: true },  
  productname: { type: String, required: true },
  quantity: { type: String, default: 1 },
  price: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Canceled"],
    default: "Pending",
  },
  paymentMethod: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  orderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  deliveryStatus: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const feedbackSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const models = {
  Users: mongoose.model("User", userSchema),
  Admins: mongoose.model("Admin", adminSchema),
  Category: mongoose.model("Category", categorySchema),
  Product: mongoose.model("Product", productSchema),
  AddToCart: mongoose.model("AddToCart", addToCartSchema),
  Order: mongoose.model("Order", orderSchema),
  Payment: mongoose.model("Payment", paymentSchema),
  Feedback: mongoose.model("Feedback", feedbackSchema),
};

module.exports = models;
