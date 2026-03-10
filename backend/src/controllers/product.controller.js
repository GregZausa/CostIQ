import { createProductService } from "../services/product.services.js";

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
