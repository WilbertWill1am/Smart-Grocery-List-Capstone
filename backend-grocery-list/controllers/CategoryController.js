import Category from "../models/CategoryModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const response = await Category.findAll({
      attributes: ["id", "categoryName"],
    });
    res.status(200).json({
      message: "Berhasil menampilkan semua Data Kategori",
      response: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoriesById = async (req, res) => {
  try {
    const response = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Berhasil menampilkan data kategori",
      response: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addCategories = async (req, res) => {
  const { id } = req.body;
  try {
    const newProduct = new Category({
      id,
    });
    await newProduct.save();
    res.status(200).json({ msg: "Kategori baru berhasil tersimpan" });
  } catch (error) {
    res.status(404).json({ msg: "Gagal menambahkan data produk" });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const response = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Berhasil menghapus kategori" });
  } catch (error) {
    console.log(error.message);
  }
};
