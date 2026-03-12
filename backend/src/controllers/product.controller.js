import {
  createProductService,
  fetchProductService,
  fetchProductsService,
} from "../services/product.services.js";

export const createProduct = async (req, res) => {
  try {
    console.log("body: ", req.body);
    console.log("file: ", req.file);
    const product = await createProductService({
      userId: req.user.id,
      body: req.body,
      file: req.file,
    });

    res.status(201).json({ message: "Product successfully added", product });
  } catch (err) {
    console.error("createProduct error: ", err.message);
    res
      .status(500)
      .json({ message: "Failed to add product", error: err.message });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const product = await fetchProductsService({
      userId: req.user.id,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Product not found", error: err.message });
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const { computedProduct, products } = await fetchProductService({
      id: req.params.id,
      userId: req.user.id,
    });

    res.json({ computedProduct, products });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: err.message });
  }
};
