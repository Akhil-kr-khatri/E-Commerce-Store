import { useEffect, useState } from "react";

import api from "../services/api";

import ProductCard from "../components/ProductCard";

import { Search } from "lucide-react";

function Products({ addToCart }) {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [productResponse, categoryResponse] = await Promise.all([
                    api.get("/products"),
                    api.get("/products/categories")
                ]);

                setProducts(productResponse.data.products);

                setCategories(categoryResponse.data.categories);

            } catch (error) {

                console.error("Failed to fetch products", error);

            }
        };

        fetchData();

    }, []);

    const filteredProducts = products.filter(product => {

        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || product.category === category;

        return matchesSearch && matchesCategory;

    });

    return (

        <section className="mx-auto min-h-screen max-w-7xl px-6 py-14">

            <h1 className="text-3xl font-extrabold text-gray-900">
                Our Products
            </h1>

            <p className="mt-2 text-gray-500">
                Explore our complete collection.
            </p>

            <div className="mt-8 flex flex-col gap-4 md:flex-row">

                <div className="relative flex-1">

                    <Search
                        className="absolute top-3.5 left-4 text-gray-400"
                        size={19}
                    />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-12 outline-none focus:border-blue-500"
                    />

                </div>

                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-5 py-3 outline-none"
                >

                    <option value="All">All Categories</option>

                    {categories.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}

                </select>

            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {filteredProducts.map(product => (

                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                    />

                ))}

            </div>

            {filteredProducts.length === 0 && (
                <p className="mt-10 text-center text-gray-500">
                    No products found.
                </p>
            )}

        </section>
    );
}

export default Products;