import { Link } from "react-router-dom";
import axios from "axios";
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "./styledComponents";

const ProductItem = ({ id, name, description, price, img }) => {
  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId"); // now from localStorage

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5100/api/cart/addToCart", {
        userId,
        productId: id,
        productname: name,
        price,
        image: img,
        quantity: 1,
      });

      console.log(response.data);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <ProductContainer className="shadow-lg rounded-xl overflow-hidden bg-white hover:shadow-2xl transition duration-300">
      <ProductImage
        src={img}
        alt={name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <ProductName className="text-xl font-semibold mb-2 text-gray-800">
          {name}
        </ProductName>
        <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden">
          {description}
        </p>
        <ProductPrice className="text-lg font-bold text-green-600 mb-4">
          ${price}
        </ProductPrice>
        <ButtonContainer className="flex justify-between gap-2">
          <Link
            to={`/checkout/${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition duration-200 w-1/2 text-center"
          
          >
            Buy Now
          </Link>
          <Button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm transition duration-200 w-1/2"
          >
            Add to Cart
          </Button>
        </ButtonContainer>
      </div>
    </ProductContainer>
  );
};

export default ProductItem;
