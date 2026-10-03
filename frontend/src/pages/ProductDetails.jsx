import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import api from "../services/api";

import { ArrowLeft, ShoppingCart } from "lucide-react";

function ProductDetails({ addToCart }) {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await api.get(`/products/${id}`);

                setProduct(response.data.product);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        fetchProduct();

    }, [id]);

    if (loading) {
        return <div className="p-20 text-center">Loading...</div>;
    }

    if (!product) {
        return <div className="p-20 text-center">Product not found.</div>;
    }

    return (

        <section className="mx-auto max-w-7xl px-6 py-14">

            <Link to="/products" className="mb-8 inline-flex items-center gap-2 text-blue-600">
                <ArrowLeft size={18} />
                Back to Products
            </Link>

            <div className="grid gap-12 md:grid-cols-2">

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-[450px] w-full rounded-2xl bg-gray-100 object-cover"
                />

                <div className="flex flex-col justify-center">

                    <span className="font-semibold uppercase tracking-widest text-blue-600">
                        {product.category}
                    </span>

                    <h1 className="mt-4 text-4xl font-extrabold">
                        {product.name}
                    </h1>

                    <p className="mt-5 leading-8 text-gray-500">
                        {product.description}
                    </p>

                    <h2 className="mt-8 text-3xl font-extrabold">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                    </h2>

                    <p className="mt-4 text-sm text-gray-500">
                        {product.stock > 0
                            ? `${product.stock} items available`
                            : "Out of stock"}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="mt-8 flex w-fit items-center gap-3 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>

                </div>

            </div>

        </section>
    );
}

export default ProductDetails;