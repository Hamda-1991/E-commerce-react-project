import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Rating,
  CircularProgress,
  Container,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useGetProductByNameQuery } from "../Redux/product";
import { CartContext } from "../context/CartContext"; // Import CartContext

const WishList = () => {
  const { WishList: wishList } = useParams();
  const { data, error, isLoading } = useGetProductByNameQuery(
    "products?populate=*"
  );

  const { addToCart } = useContext(CartContext); // Get addToCart from CartContext

  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [favoritedProducts, setFavoritedProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setDisplayedProducts(data.data);
    }
  }, [data]);

  const handleFavorite = (productId) => {
    const updatedFavorites = [...favoritedProducts];
    if (updatedFavorites.includes(productId)) {
      // Remove from favorites
      const index = updatedFavorites.indexOf(productId);
      updatedFavorites.splice(index, 1);
    } else {
      // Add to favorites
      updatedFavorites.push(productId);
    }
    setFavoritedProducts(updatedFavorites);
  };

  const filteredProducts = displayedProducts.filter((product) =>
    favoritedProducts.includes(product.id)
  );

  useEffect(() => {
    if (data) {
      // Shuffle the products
      const shuffledProducts = [...data.data].sort(() => 0.5 - Math.random());
      // Slice to get only 4 products
      setDisplayedProducts(shuffledProducts.slice(0, 4));
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
      <>
        {wishList}
        <Box sx={{ marginTop: "80px" }}>
          <Stack spacing={4} sx={{ width: "100%", marginBottom: "100px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "400",
                  color: "rgba(0, 0, 0, 1)",
                }}
              >
                Wishlist ({favoritedProducts.length})
              </Typography>
              <Button
                sx={{
                  width: "223px",
                  height: "56px",
                  padding: "16px 48px",
                  borderRadius: "4px",
                  border: "1px solid #7777",
                  backgroundColor: "#fff",
                  color: "#000",
                  ":hover": {
                    backgroundColor: "rgba(219, 68, 68, 1)",
                    color: "#fff",
                  },
                }}
                onClick={() => setDisplayedProducts(filteredProducts)}
              >
                Move All To Bag
              </Button>
            </Box>
            <Grid container spacing={4}>
              {filteredProducts.map((card) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <Card
                    sx={{
                      width: "100%",
                      position: "relative",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px",
                        top: "0",
                        right: "0",
                      }}
                    >
                      <Button onClick={() => handleFavorite(card.id)}>
                        <FavoriteBorderOutlinedIcon
                          style={{
                            color: favoritedProducts.includes(card.id)
                              ? "#DB4444"
                              : "#000",
                          }}
                        />
                      </Button>
                      <Link to="/ProductDetailsPage">
                        <VisibilityOutlinedIcon
                          style={{ color: "#000", backgroundColor: "#ffff" }}
                        />
                      </Link>
                    </div>
                    <CardMedia
                      component="img"
                      sx={{ width: "60%", height: "auto", margin: "0 auto" }}
                      alt={card.title}
                      height="180"
                      image={`${import.meta.env.VITE_BASE_URL}${
                        card.attributes.image.data[0].attributes.url
                      }`}
                    />
                    <CardContent>
                      <Button
                        sx={{
                          width: "100%",
                          height: "41px",
                          borderRadius: "0 0 4px 4px",
                          backgroundColor: "#000",
                          color: "#fff",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                        onClick={() =>
                          addToCart({
                            id: card.id,
                            title: card.attributes.title,
                            price: card.attributes.price,
                            discountedPrice: card.attributes.discountPrice,
                            image: `${import.meta.env.VITE_BASE_URL}${
                              card.attributes.image.data[0].attributes.url
                            }`,
                          })
                        }
                      >
                        <LocalGroceryStoreOutlinedIcon />
                        <div>Add To Cart</div>
                      </Button>
                      <Typography
                        gutterBottom
                        variant="h6 small"
                        component="div"
                        color="rgba(0, 0, 0, 1)"
                        marginTop="15px"
                      >
                        {card.attributes.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(219, 68, 68, 1)",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          ${card.attributes.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "#777",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          ${card.attributes.discountPrice}
                        </Typography>
                      </Box>
                      <Rating
                        name={`rating-${card.id}`}
                        value={card.attributes.rating}
                        readOnly
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack spacing={4} sx={{ width: "100%", marginTop: 4 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap="10px">
                <svg
                  width="15"
                  height="35"
                  viewBox="0 0 20 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="40" rx="4" fill="#DB4444" />
                </svg>

                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    fontWeight: "600",
                    color: "rgba(219, 68, 68, 1)",
                  }}
                >
                  Just For You
                </Typography>
              </Box>
              <Button
                sx={{
                  width: "223px",
                  height: "56px",
                  padding: "16px 48px",
                  borderRadius: "4px",
                  border: "1px solid #7777",
                  backgroundColor: "#fff",
                  color: "#000",
                  ":hover": {
                    backgroundColor: "rgba(219, 68, 68, 1)",
                    color: "#fff",
                  },
                }}
                component={Link}
                to="/Product"
              >
                See All
              </Button>
            </Stack>
            <Grid container spacing={4}>
              {displayedProducts.map((card) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <Card
                    sx={{
                      width: "100%",
                      position: "relative",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px",
                        top: "0",
                        right: "0",
                      }}
                    >
                      <Button onClick={() => handleFavorite(card.id)}>
                        <FavoriteBorderOutlinedIcon
                          style={{
                            color: favoritedProducts.includes(card.id)
                              ? "#DB4444"
                              : "#000",
                          }}
                        />
                      </Button>
                      <Link to="/ProductDetailsPage">
                        <VisibilityOutlinedIcon
                          style={{ color: "#000", backgroundColor: "#ffff" }}
                        />
                      </Link>
                    </div>
                    <CardMedia
                      component="img"
                      sx={{ width: "60%", height: "auto", margin: "0 auto" }}
                      alt={card.title}
                      height="180"
                      image={`${import.meta.env.VITE_BASE_URL}${
                        card.attributes.image.data[0].attributes.url
                      }`}
                    />
                    <CardContent>
                      <Button
                        sx={{
                          width: "100%",
                          height: "41px",
                          borderRadius: "0 0 4px 4px",
                          backgroundColor: "#000",
                          color: "#fff",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                        onClick={() =>
                          addToCart({
                            id: card.id,
                            title: card.attributes.title,
                            price: card.attributes.price,
                            discountedPrice: card.attributes.discountPrice,
                            image: `${import.meta.env.VITE_BASE_URL}${
                              card.attributes.image.data[0].attributes.url
                            }`,
                          })
                        }
                      >
                        <LocalGroceryStoreOutlinedIcon />
                        <div>Add To Cart</div>
                      </Button>
                      <Typography
                        gutterBottom
                        variant="h6 small"
                        component="div"
                        color="rgba(0, 0, 0, 1)"
                        marginTop="15px"
                      >
                        {card.attributes.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(219, 68, 68, 1)",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          ${card.attributes.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "#777",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          ${card.attributes.discountPrice}
                        </Typography>
                      </Box>
                      <Rating
                        name={`rating-${card.id}`}
                        value={card.attributes.rating}
                        readOnly
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Box>
      </>
    );
  }

  return null;
};

export default WishList;
