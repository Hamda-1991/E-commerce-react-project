import { Grid, Container, CircularProgress, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useGetProductByNameQuery } from "../Redux/product";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ProductList = () => {
  const { data, error, isLoading } = useGetProductByNameQuery(
    "products?populate=*"
  );
  const [randomProducts, setRandomProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (data) {
      const shuffledProducts = shuffleArray([...data.data]);
      setRandomProducts(shuffledProducts.slice(0, 4));
    }
  }, [data]);

  if (isLoading) {
    return (
      <Container sx={{ marginTop: "50px", textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: "50px", textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Failed to load products
        </Typography>
      </Container>
    );
  }

  if (data) {
    return (
      <Container sx={{ marginTop: "50px" }}>
        <Grid container spacing={2}>
          {randomProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard
                product={{
                  id: product.id,
                  image: `${import.meta.env.VITE_BASE_URL}${
                    product.attributes.image.data[0].attributes.url
                  }`,
                  title: product.attributes.title,
                  price: product.attributes.price,
                  discountedPrice: product.attributes.discountPrice,
                  rating: product.attributes.rating,
                }}
                addToCart={addToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return null;
};

export default ProductList;
