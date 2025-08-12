// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import ProductItem from '../ProductItem';
// import Cookies from 'js-cookies';
// import axios from 'axios';
// import AdminNavabar from '../AdminNavbar';

// const ProductsContainer = styled.div`
//   margin-top: 4vh;
//   padding: 30px 40px;
//   background-color: #f8f9fa;
//   min-height: 100vh;
// `;

// const Heading = styled.h1`
//   font-size: 32px;
//   font-weight: 600;
//   color: #212529;
//   text-align: center;
//   margin-top: 30px;
//   margin-bottom: 30px;
// `;

// const StyledList = styled.ul`
//   list-style: none;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
//   gap: 25px;
//   padding: 0;
// `;

// const AdminProducts = () => {
//   const api = 'http://localhost:5100/api/products/getAllProducts';
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     fetch(api)
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   };

//   const handleDeleteProduct = async (id) => {
//     const userId = Cookies.getItem("userId");
//     try {
//       await axios.delete(`http://localhost:5100/api/products/${id}`);
//       getData();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div>
//       <AdminNavabar />
//       <Heading>All Products</Heading>
//       <ProductsContainer>
//         <StyledList>
//           {products.map(product => (
//             <ProductItem
//               key={product._id}
//               id={product._id}
//               img={product.image}
//               name={product.productname}
//               description={product.description}
//               price={product.price}
//               handleDeleteProduct={handleDeleteProduct}
//             />
//           ))}
//         </StyledList>
//       </ProductsContainer>
//     </div>
//   );
// };

// export default AdminProducts;





















// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import ProductItem from '../ProductItem';
// import Cookies from 'js-cookies';
// import axios from 'axios';
// import AdminNavabar from '../AdminNavbar';

// const PageWrapper = styled.div`
//   background-color: #f5f6fa;
//   min-height: 100vh;
// `;

// const ProductsContainer = styled.div`
//   padding: 40px 50px;
//   max-width: 1400px;
//   margin: auto;
// `;

// const Heading = styled.h1`
//   font-size: 36px;
//   font-weight: 700;
//   color: #2d3436;
//   text-align: center;
//   margin: 40px 0 30px;
//   position: relative;

//   &::after {
//     content: '';
//     display: block;
//     width: 60px;
//     height: 4px;
//     background-color: #6c63ff;
//     margin: 10px auto 0;
//     border-radius: 2px;
//   }
// `;

// const StyledList = styled.ul`
//   list-style: none;
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//   gap: 30px;
//   padding: 0;
// `;

// const EmptyState = styled.p`
//   text-align: center;
//   font-size: 18px;
//   color: #777;
//   margin-top: 40px;
// `;

// const AdminProducts = () => {
//   const api = 'http://localhost:5100/api/products/getAllProducts';
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     fetch(api)
//       .then(response => response.json())
//       .then(data => setProducts(data))
//       .catch(error => console.error('Error fetching products:', error));
//   };

//   const handleDeleteProduct = async (id) => {
//     const userId = Cookies.getItem("userId");
//     try {
//       await axios.delete(`http://localhost:5100/api/products/${id}`);
//       getData();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <PageWrapper>
//       <AdminNavabar />
//       <ProductsContainer>
//         <Heading>All Products</Heading>
//         {products.length === 0 ? (
//           <EmptyState>No products available at the moment.</EmptyState>
//         ) : (
//           <StyledList>
//             {products.map(product => (
//               <ProductItem
//                 key={product._id}
//                 id={product._id}
//                 img={product.image}
//                 name={product.productname}
//                 description={product.description}
//                 price={product.price}
//                 handleDeleteProduct={handleDeleteProduct}
//               />
//             ))}
//           </StyledList>
//         )}
//       </ProductsContainer>
//     </PageWrapper>
//   );
// };

// export default AdminProducts;
















import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie'; // (Optional, if you want to read cookies)
import ProductItem from '../ProductItem';
import AdminNavabar from '../AdminNavbar';

const PageWrapper = styled.div`
  background-color: #f5f6fa;
  min-height: 100vh;
`;

const ProductsContainer = styled.div`
  padding: 40px 50px;
  max-width: 1400px;
  margin: auto;
`;

const Heading = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #2d3436;
  text-align: center;
  margin: 40px 0 30px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: #6c63ff;
    margin: 10px auto 0;
    border-radius: 2px;
  }
`;

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 0;
`;

const EmptyState = styled.p`
  text-align: center;
  font-size: 18px;
  color: #777;
  margin-top: 40px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const AdminProducts = () => {
  const api = 'http://localhost:5100/api/products/getAllProducts';
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(api, {
        withCredentials: true, // important to send cookies
      });
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please login.');
      setProducts([]);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5100/api/products/${id}`, {
        withCredentials: true,
      });
      getData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <PageWrapper>
      <AdminNavabar />
      <ProductsContainer>
        <Heading>All Products</Heading>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!error && products.length === 0 ? (
          <EmptyState>No products available at the moment.</EmptyState>
        ) : (
          <StyledList>
            {products.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                img={product.image}
                name={product.productname}
                description={product.description}
                price={product.price}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </StyledList>
        )}
      </ProductsContainer>
    </PageWrapper>
  );
};

export default AdminProducts;
