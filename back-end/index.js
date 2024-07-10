const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://musharizh56:admin@cluster0.clvs4os.mongodb.net/ExpenseTracker"
);

const schema = new mongoose.Schema({
  type: { type: String },
  description: { type: String },
  amount: { type: Number },
});

const Receipt = mongoose.model("Receipt", schema);

app.get("/", (req, res) => {
  Receipt.find({}).then((receipt) => {
    res.json(receipt);
  });
});
app.post("/addTransaction", async (req, res) => {
  const { type, description, amount } = req.body;
  newTransaction = new Receipt({ type, description, amount });
  console.log(newTransaction);
  await newTransaction.save();
});
app.delete("/resetTransactions", async (req, res) => {
  Receipt.deleteMany({}).then(() => {
    console.log("DELeETD");
  });
});
app.listen(3111, () => {
  console.log("listening on 3111");
});
