import React, { useEffect, useState } from "react";
import axios from "axios";
// import Cookies from "js-cookies";
import Header from "../Header";
import { Link } from "react-router-dom";
import {
  ProductContainer,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "../ProductItem/styledComponents";

const MyCart = () => {
  const userId = localStorage.getItem("userId");
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    axios
      .get(`http://localhost:5100/api/cart/user/${userId}`)
      .then((response) => {
        setCartData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const handleCancelClick = (cartItemId) => {
    axios
      .delete(`http://localhost:5100/api/cart/${cartItemId}`)
      .then(() => {
        setCartData((prevCartData) =>
          prevCartData.filter((item) => item._id !== cartItemId)
        );
        getProductsList();
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="pt-[100px] px-4">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">🛒 My Cart</h1>

        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cartData.map((product) => (
              <ProductContainer
                key={product._id}
                className="shadow-lg rounded-lg overflow-hidden bg-white"
              >
                <ProductImage
                  src={product.image}
                  alt={product.productname}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <ProductName className="text-xl font-semibold mb-1">
                    {product.productname}
                  </ProductName>
                  <ProductPrice className="text-green-600 font-bold mb-3">
                    ${product.price}
                  </ProductPrice>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleCancelClick(product._id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/checkout/${product._id}`}
                      className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </ProductContainer>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;























