import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";


export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ message: "Error fetching products" });
    }
}

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");

    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    //if not in redis, fetch from database
    // lean is used to return plain JavaScript objects instead of Mongoose documents, which can improve performance and reduce memory usage.
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    //store in redis for future requests
    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};
