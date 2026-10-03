
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import api from "../services/api";
import featuredProducts from "../data/featuredProducts";
import ProductCard from "../components/ProductCard";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Unable to fetch products:", error);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-950 to-slate-900 opacity-95" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Sparkles size={16} />
              NEW COLLECTION
            </span>

            <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Products
              <br />
              That <span className="text-blue-400">Define You.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Explore our collection of electronics, fashion and everyday
              essentials. Find products that match your lifestyle.
            </p>

            <a
              href="#products"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Products
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661"
              alt="Electronics collection"
              className="h-80 w-full rounded-2xl object-cover shadow-2xl lg:h-96"
            />
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
            HANDPICKED FOR YOU
          </span>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Featured Products
          </h2>

          <p className="mt-3 text-gray-500">
            Explore some of our specially selected products.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

      </section>

      {/* Latest Products */}
      <section
        className="bg-slate-50"
        id="products"
      >
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="mb-10">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              EXPLORE OUR COLLECTION
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Latest Products
            </h2>

            <p className="mt-3 text-gray-500">
              Discover the latest additions to our collection.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-xl bg-gray-200"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-5 text-red-700">
              {error}
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500">
              No products available currently.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Home;