// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import ProductItem from '../ProductItem';
// import Header from '../Header';

// const ProductsContainer = styled.div`
//   margin-top: 10vh;
//   padding: 2rem;
// `;

// const Heading = styled.h2`
//   font-size: 2rem;
//   color: #222;
//   margin-top: 2rem;
//   margin-bottom: 1.5rem;
// `;

// const StyledList = styled.ul`
//   list-style: none;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2rem;
//   padding: 0;
// `;

// const ListItem = styled.li`
//   flex: 1 1 250px;
// `;

// const SearchBar = styled.input`
//   width: 100%;
//   padding: 12px 16px;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   outline: none;
//   transition: border 0.3s ease;

//   &:focus {
//     border-color: #00bcd4;
//   }
// `;

// const CategoryFilter = styled.select`
//   width: 100%;
//   padding: 12px 16px;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background: #fff;
//   outline: none;
// `;

// const FiltersContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 2rem;
//   margin-top: 2rem;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const FilterBlock = styled.div`
//   flex: 1;
//   min-width: 280px;
// `;

// const CarouselWrapper = styled.div`
//   .carousel-inner img {
//     height: 300px;
//     object-fit: cover;
//     border-radius: 10px;
//   }
// `;

// const Products = () => {
//   const api = 'http://localhost:5100/api/products/getAllProducts';
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   useEffect(() => {
//     fetch(api)
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const filteredProducts = products.filter((product) => {
//     const nameMatch = product.productname.toLowerCase().includes(searchQuery.toLowerCase());
//     if (selectedCategory === 'all') return nameMatch;
//     return nameMatch && product.category.toLowerCase() === selectedCategory;
//   });

//   const categories = [...new Set(products.map((p) => p.category.toLowerCase()))];
//   categories.unshift('all');

//   return (
//     <>
//       <Header />
//       <ProductsContainer>
//         <CarouselWrapper>
//           <div id="carouselExampleIndicators" className="carousel slide mb-5" data-ride="carousel">
//             <ol className="carousel-indicators">
//               <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//               <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//               <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//             </ol>
//             <div className="carousel-inner">
//               <div className="carousel-item active">
//                 <img
//                   className="d-block w-100"
//                   src="https://img.freepik.com/free-vector/beautiful-banner-floral-leaves-template_21799-2812.jpg"
//                   alt="Slide 1"
//                 />
//               </div>
//               <div className="carousel-item">
//                 <img
//                   className="d-block w-100"
//                   src="https://img.freepik.com/free-psd/spring-sale-social-media-cover-template_47987-15231.jpg"
//                   alt="Slide 2"
//                 />
//               </div>
//               <div className="carousel-item">
//                 <img
//                   className="d-block w-100"
//                   src="https://img.freepik.com/premium-vector/vegetable-grocery-delivery-promotion-facebook-cover-web-banner-social-media-post-template_584651-68.jpg"
//                   alt="Slide 3"
//                 />
//               </div>
//             </div>
//             <a className="carousel-control-prev" role="button" data-slide="prev" href="#carouselExampleIndicators">
//               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//               <span className="sr-only">Previous</span>
//             </a>
//             <a className="carousel-control-next" role="button" data-slide="next" href="#carouselExampleIndicators">
//               <span className="carousel-control-next-icon" aria-hidden="true"></span>
//               <span className="sr-only">Next</span>
//             </a>
//           </div>
//         </CarouselWrapper>

//         <FiltersContainer>
//           <FilterBlock>
//             <h5>🔍 Search By Product Name</h5>
//             <SearchBar
//               type="text"
//               placeholder="Type product name..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </FilterBlock>

//           <FilterBlock>
//             <h5>📂 Filter By Category</h5>
//             <CategoryFilter value={selectedCategory} onChange={handleCategoryChange}>
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </option>
//               ))}
//             </CategoryFilter>
//           </FilterBlock>
//         </FiltersContainer>

//         <Heading>🛍️ Products</Heading>
//         <StyledList>
//           {filteredProducts.map((product) => (
//             <ListItem key={product._id}>
//               <ProductItem
//                 id={product._id}
//                 img={product.image}
//                 name={product.productname}
//                 description={product.description}
//                 price={product.price}
//               />
//             </ListItem>
//           ))}
//         </StyledList>
//       </ProductsContainer>
//     </>
//   );
// };

// export default Products;


















import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductItem';
import Header from '../Header';
import axios from 'axios';

const ProductsContainer = styled.div`
  margin-top: 10vh;
  padding: 2rem;
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #222;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 0;
`;

const ListItem = styled.li`
  flex: 1 1 250px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: #00bcd4;
  }
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  outline: none;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterBlock = styled.div`
  flex: 1;
  min-width: 280px;
`;

const CarouselWrapper = styled.div`
  .carousel-inner img {
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Products = () => {
  const api = 'http://localhost:5100/api/products/getAllProducts';
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(api, { withCredentials: true });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.productname.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'all') return nameMatch;
    return nameMatch && product.category.toLowerCase() === selectedCategory;
  });

  const categories = [...new Set(products.map((p) => p.category.toLowerCase()))];
  categories.unshift('all');

  return (
    <>
      <Header />
      <ProductsContainer>
        <CarouselWrapper>
          <div
            id="carouselExampleIndicators"
            className="carousel slide mb-5"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-vector/beautiful-banner-floral-leaves-template_21799-2812.jpg"
                  alt="Slide 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-psd/spring-sale-social-media-cover-template_47987-15231.jpg"
                  alt="Slide 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/premium-vector/vegetable-grocery-delivery-promotion-facebook-cover-web-banner-social-media-post-template_584651-68.jpg"
                  alt="Slide 3"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              role="button"
              data-slide="prev"
              href="#carouselExampleIndicators"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              role="button"
              data-slide="next"
              href="#carouselExampleIndicators"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </CarouselWrapper>

        <FiltersContainer>
          <FilterBlock>
            <h5>🔍 Search By Product Name</h5>
            <SearchBar
              type="text"
              placeholder="Type product name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FilterBlock>

          <FilterBlock>
            <h5>📂 Filter By Category</h5>
            <CategoryFilter value={selectedCategory} onChange={handleCategoryChange}>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </CategoryFilter>
          </FilterBlock>
        </FiltersContainer>

        <Heading>🛍️ Products</Heading>
        <StyledList>
          {filteredProducts.map((product) => (
            <ListItem key={product._id}>
              <ProductItem
                id={product._id}
                img={product.image}
                name={product.productname}
                description={product.description}
                price={product.price}
              />
            </ListItem>
          ))}
        </StyledList>
      </ProductsContainer>
    </>
  );
};

export default Products;
