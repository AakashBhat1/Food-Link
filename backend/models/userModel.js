import mongoose from "mongoose";
import { useMemoryDB } from "../config/db.js";

const memoryUsers = [
  {
    _id: "admin_user",
    name: "Local Admin",
    email: "admin@local.test",
    password: "$2b$10$RcwOcn2nU0j.PrF171wiN.YRFHcZTHLrqHMlB2b0bob.xSYpkIqAC",
    role: "admin",
    cartData: {},
  },
];

class MemoryUserModel {
  constructor(user) {
    Object.assign(this, user);
    this._id = `user_${Date.now()}`;
    this.role = this.role || "user";
    this.cartData = this.cartData || {};
  }

  async save() {
    memoryUsers.push({ ...this });
    return this;
  }

  static async findOne(query) {
    return memoryUsers.find((user) => user.email === query.email);
  }

  static async findById(id) {
    return memoryUsers.find((user) => user._id === id);
  }

  static async findByIdAndUpdate(id, update) {
    const user = memoryUsers.find((item) => item._id === id);
    if (user) {
      Object.assign(user, update);
    }
    return user;
  }
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default:"user" },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = useMemoryDB
  ? MemoryUserModel
  : mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
