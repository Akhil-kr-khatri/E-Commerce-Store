import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart } from "lucide-react";

function Navbar({ cartCount }) {

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-blue-600">
                    <ShoppingBag size={28} />
                    ShopSphere
                </Link>

                <div className="flex items-center gap-8 text-sm font-semibold text-gray-700">

                    <Link to="/" className="hover:text-blue-600">
                        Home
                    </Link>

                    <Link to="/products" className="hover:text-blue-600">
                        Products
                    </Link>

                    <Link to="/cart" className="flex items-center gap-2 hover:text-blue-600">
                        <ShoppingCart size={20} />
                        Cart

                        <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                            {cartCount}
                        </span>
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;