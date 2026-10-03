import { ShoppingCart } from "lucide-react";

function ProductCard({ product, addToCart }) {

    return (
        <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="h-56 overflow-hidden bg-gray-100">

                <img
                    src={product.image_url}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

            </div>

            <div className="p-5">

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {product.category}
                </span>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {product.name}
                </h3>

                <p className="mt-2 min-h-10 text-sm leading-relaxed text-gray-500">
                    {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between">

                    <span className="text-xl font-extrabold text-gray-900">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        <ShoppingCart size={16} />
                        {product.stock === 0 ? "Out of stock" : "Add"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;