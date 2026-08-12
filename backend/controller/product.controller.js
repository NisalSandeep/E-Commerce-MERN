import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ message: "Error fetching products" });
    }
}