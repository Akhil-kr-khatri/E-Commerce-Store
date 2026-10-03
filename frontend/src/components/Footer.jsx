function Footer() {

    return (

        <footer className="bg-slate-950 px-6 py-10 text-white">

            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">

                <div>
                    <h2 className="text-2xl font-extrabold text-blue-400">
                        ShopSphere
                    </h2>

                    <p className="mt-3 text-sm text-gray-400">
                        Discover products that define you.
                    </p>
                </div>

                <div className="text-sm text-gray-400">
                    © {new Date().getFullYear()} ShopSphere. All rights reserved.
                </div>

            </div>

        </footer>
    );
}

export default Footer;