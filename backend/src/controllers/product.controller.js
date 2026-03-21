import {
  createProductService,
  fetchAllComputedProductsService,
  fetchProductService,
  fetchProductsService,
} from "../services/product.services.js";

export const createProduct = async (req, res) => {
  try {
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
    res.json({
      products: product.products,
      mostExpensiveProduct: product.mostExpensiveProduct,
      lowestProfitableProduct: product.lowestProfitableProduct,
      mostProfitableProduct: product.mostProfitableProduct,
      highestROIProduct: product.highestROIProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Product not found", error: err.message });
  }
};

export const fetchAllComputedProducts = async (req, res) => {
  try {
    const products = await fetchAllComputedProductsService({
      userId: req.user.id,
    });
    res.json({products});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
};

export const fetchProduct = async (req, res) => {
  try {
    const { computedProduct } = await fetchProductService({
      id: req.params.id,
      userId: req.user.id,
    });

    res.json({ computedProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: err.message });
  }
};
