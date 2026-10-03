import { Link } from "react-router-dom";

import { Trash2, Minus, Plus } from "lucide-react";

function Cart({ cart, updateQuantity, removeFromCart }) {

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    return (

        <section className="mx-auto min-h-screen max-w-7xl px-6 py-14">

            <h1 className="text-3xl font-extrabold">
                Shopping Cart
            </h1>

            {cart.length === 0 ? (

                <div className="py-24 text-center">

                    <h2 className="text-xl font-bold">
                        Your cart is empty
                    </h2>

                    <Link
                        to="/products"
                        className="mt-6 inline-block rounded-lg bg-blue-600 px-7 py-3 text-white"
                    >
                        Continue Shopping
                    </Link>

                </div>

            ) : (

                <div className="mt-10 grid gap-10 lg:grid-cols-3">

                    <div className="space-y-4 lg:col-span-2">

                        {cart.map(item => (

                            <div
                                key={item.id}
                                className="flex gap-5 rounded-xl border border-gray-200 bg-white p-5"
                            >

                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="h-28 w-28 rounded-lg object-cover"
                                />

                                <div className="flex-1">

                                    <h3 className="font-bold">
                                        {item.name}
                                    </h3>

                                    <p className="mt-2 font-semibold">
                                        ₹{Number(item.price).toLocaleString("en-IN")}
                                    </p>

                                    <div className="mt-4 flex items-center gap-4">

                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="rounded border p-1"
                                        >
                                            <Minus size={15} />
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="rounded border p-1"
                                        >
                                            <Plus size={15} />
                                        </button>

                                    </div>

                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="self-start text-red-500"
                                >
                                    <Trash2 size={20} />
                                </button>

                            </div>

                        ))}

                    </div>

                    <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">

                        <h2 className="text-xl font-bold">
                            Order Summary
                        </h2>

                        <div className="mt-6 flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString("en-IN")}</span>
                        </div>

                        <div className="mt-4 flex justify-between border-t pt-4 text-lg font-extrabold">
                            <span>Total</span>
                            <span>₹{total.toLocaleString("en-IN")}</span>
                        </div>

                        <button
                            disabled
                            className="mt-7 w-full rounded-lg bg-gray-400 py-3 font-semibold text-white"
                        >
                            Checkout (Coming Soon)
                        </button>

                    </div>

                </div>

            )}

        </section>
    );
}

export default Cart;