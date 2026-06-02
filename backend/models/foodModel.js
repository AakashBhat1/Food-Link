import mongoose from "mongoose";
import { useMemoryDB } from "../config/db.js";

const demoFoods = [
  ["food_1", "Greek salad", "Food provides essential nutrients for overall health and well-being", 12, "Salad", "1722865444288food_1.png"],
  ["food_2", "Veg salad", "Food provides essential nutrients for overall health and well-being", 18, "Salad", "1722865514626food_2.png"],
  ["food_3", "Clover Salad", "Food provides essential nutrients for overall health and well-being", 16, "Salad", "1722865628915food_3.png"],
  ["food_4", "Chicken Salad", "Food provides essential nutrients for overall health and well-being", 24, "Salad", "1722865668073food_4.png"],
  ["food_5", "Lasagna Rolls", "Food provides essential nutrients for overall health and well-being", 14, "Rolls", "1722865738489food_5.png"],
  ["food_6", "Peri Peri Rolls", "Food provides essential nutrients for overall health and well-being", 12, "Rolls", "1722865934153food_6.png"],
  ["food_7", "Chicken Rolls", "Food provides essential nutrients for overall health and well-being", 20, "Rolls", "1722865976487food_7.png"],
  ["food_8", "Veg Rolls", "Food provides essential nutrients for overall health and well-being", 15, "Rolls", "1722866043779food_8.png"],
  ["food_9", "Ripple Ice Cream", "Food provides essential nutrients for overall health and well-being", 14, "Deserts", "1722866109947food_9.png"],
  ["food_10", "Fruit Ice Cream", "Food provides essential nutrients for overall health and well-being", 22, "Deserts", "1722866148130food_10.png"],
  ["food_11", "Jar Ice Cream", "Food provides essential nutrients for overall health and well-being", 10, "Deserts", "1722866329894food_11.png"],
  ["food_12", "Vanilla Ice Cream", "Food provides essential nutrients for overall health and well-being", 12, "Deserts", "1722866385025food_12.png"],
].map(([id, name, description, price, category, image]) => ({
  _id: id,
  name,
  description,
  price,
  category,
  image,
}));

const memoryFoods = [...demoFoods];

class MemoryFoodModel {
  constructor(food) {
    Object.assign(this, food);
    this._id = `food_${Date.now()}`;
  }

  async save() {
    memoryFoods.push({ ...this });
    return this;
  }

  static async find() {
    return memoryFoods;
  }

  static async findById(id) {
    return memoryFoods.find((food) => food._id === id);
  }

  static async findByIdAndDelete(id) {
    const index = memoryFoods.findIndex((food) => food._id === id);
    if (index !== -1) {
      memoryFoods.splice(index, 1);
    }
  }
}

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = useMemoryDB
  ? MemoryFoodModel
  : mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
