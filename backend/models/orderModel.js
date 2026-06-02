import mongoose from "mongoose";
import { useMemoryDB } from "../config/db.js";

const memoryOrders = [];

class MemoryOrderModel {
  constructor(order) {
    Object.assign(this, order);
    this._id = `order_${Date.now()}`;
    this.status = this.status || "Food Processing";
    this.date = this.date || Date.now();
    this.payment = this.payment || false;
  }

  async save() {
    memoryOrders.push({ ...this });
    return this;
  }

  static async find(query = {}) {
    if (query.userId) {
      return memoryOrders.filter((order) => order.userId === query.userId);
    }

    return memoryOrders;
  }

  static async findByIdAndUpdate(id, update) {
    const order = memoryOrders.find((item) => item._id === id);
    if (order) {
      Object.assign(order, update);
    }
    return order;
  }

  static async findByIdAndDelete(id) {
    const index = memoryOrders.findIndex((order) => order._id === id);
    if (index !== -1) {
      memoryOrders.splice(index, 1);
    }
  }
}

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
});

const orderModel =
  useMemoryDB ? MemoryOrderModel : mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
