const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI =
  process.env.mongodb ||
  "mongodb+srv://musharizh56:admin@cluster0.clvs4os.mongodb.net/ExpenseTracker";
mongoose.connect(MONGODB_URI).then(() => {
  console.log("connected to the data base");
});

const schema = new mongoose.Schema({
  type: { type: String },
  description: { type: String },
  amount: { type: Number },
});

const Receipt = mongoose.model("Receipt", schema);

app.get("/", async (req, res) => {
  try {
    const receipts = await Receipt.find({});
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching receipts", error });
  }
});

app.post("/addTransaction", async (req, res) => {
  const { type, description, amount } = req.body;
  try {
    const newTransaction = new Receipt({ type, description, amount });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error adding transaction", error });
  }
});

app.delete("/resetTransactions", async (req, res) => {
  try {
    const emptyTransaction = await Receipt.deleteMany({});
    res.status(201).json(emptyTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error resetting transactions", error });
  }
});

const PORT = process.env.PORT || 3111;
app.listen(PORT, () => {
  console.log("listening on 3111");
});
