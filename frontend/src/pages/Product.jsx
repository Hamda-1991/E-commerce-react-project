import { useState } from "react";
import {
  Box,
  Button,
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

const Product = () => {
  const { Product } = useParams();
  const [visibleCards, setVisibleCards] = useState(4);

  const { data, error, isLoading } = useGetProductByNameQuery(
    "products?populate=*"
  );

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
    const handleLoadMore = () => {
      setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    };

    return (
      <>
        <Box sx={{ marginTop: "100px" }}>
          <Typography variant="h4" component="div" gutterBottom>
            {Product}
          </Typography>
          <Grid container spacing={4}>
            {data.data.slice(0, visibleCards).map((card) => (
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
                    <Button component={Link} to="/WishList">
                      <FavoriteBorderOutlinedIcon
                        style={{ color: "#000", backgroundColor: "#ffff" }}
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
          {visibleCards < data.data.length && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginY: "50px",
              }}
            >
              <Button
                onClick={handleLoadMore}
                sx={{
                  width: "190px",
                  height: "56px",
                  padding: "16px 48px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(219, 68, 68, 1)",
                  color: "#fff",
                  textAlign: "center",
                  ":hover": {
                    backgroundColor: "#fff",
                    color: "rgba(219, 68, 68, 1)",
                  },
                }}
              >
                Show More
              </Button>
            </Box>
          )}
        </Box>
      </>
    );
  }
};

export default Product;
