import { Product } from "../models/product.model.js";
import { Categoria } from "../models/categoria.model.js"; // 👈 Importamos el modelo relacionado

// --- GET ALL ---
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Categoria,        // 👈 Incluimos la relación
        as: "categoria",         // 👈 Usa el alias definido en product.model.js
        attributes: ["nombre"],  // 👈 Solo traemos el nombre, no todo el objeto
      },
    });
    res.json(products);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// --- GET BY ID ---
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Categoria,
        as: "categoria",
        attributes: ["nombre"],
      },
    });

    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

// --- CREATE ---
export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;

    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      categoria_id, // 👈 Aseguramos que guarde su categoría
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// --- UPDATE ---
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    await product.update(req.body);
    res.json({ message: "✅ Producto actualizado correctamente", product });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// --- DELETE ---
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    await product.destroy();
    res.json({ message: "🗑️ Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
