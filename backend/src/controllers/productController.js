const products = require("../data/products.json");

// Get all products
exports.getProducts = (req, res) => {
    try {
        const {
            category,
            search,
            featured
        } = req.query;

        let result = [...products];

        // Filter by category
        if (category) {
            result = result.filter(
                product =>
                    product.category.toLowerCase() ===
                    category.toLowerCase()
            );
        }

        // Search products
        if (search) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter featured products
        if (featured === "true") {
            result = result.filter(product => product.is_featured);
        }

        res.status(200).json({
            success: true,
            count: result.length,
            products: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve products"
        });
    }
};


// Get product by ID
exports.getProductById = (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        item => item.id === id
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(200).json({
        success: true,
        product
    });
};


// Get product categories
exports.getCategories = (req, res) => {
    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    res.status(200).json({
        success: true,
        categories
    });
};