import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
        <div className="absolute w-full p-4 flex items-center justify-between z-50">
            <Link to="/">
                <h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-5xl">
                    Netflix
                </h1>
            </Link>

            <div>
                <Link to="/login">
                    <button className="capitalize pr-4">
                        login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer">
                        sign up
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
