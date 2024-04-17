import express from 'express';
import ProductManager from './app.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
const productManager = new ProductManager('./src/products.json');

app.get('/products', async (req, res) => {
	const limit = req.query.limit;
	const products = await productManager.getProducts(limit);
	res.send({ status: 1, payload: products });
});

app.get('/products/:pid', async (req, res) => {
	const pid = parseInt(req.params.pid);
	const product = await productManager.getProductsById(pid);
	res.send({ status: 1, payload: product });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
