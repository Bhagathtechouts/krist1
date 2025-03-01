import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Grid } from "@mui/material";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface Props {
  products: Product[];
}

const Home: React.FC<Props> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (products.length === 0) return; // Prevent crash if no products
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <Box className="home-container">
      <Box className="carousel-container">
        {mounted && products.length > 0 ? (
          <Box className="carousel-wrapper">
            <Box className="carousel-content">
              <img className="carousel-image" src={products[currentIndex].image} alt={products[currentIndex].title} />
              <Box className="carousel-text">
                <Typography variant="h6">{products[currentIndex].title}</Typography>
                <Typography variant="body2">{products[currentIndex].description.substring(0, 40)}...</Typography>
              </Box>
            </Box>
            <Box className="carousel-controls">
              <Button onClick={prevSlide} className="carousel-arrow">⬅️</Button>
              <Button onClick={nextSlide} className="carousel-arrow">➡️</Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </Box>
      <h1>Featured Products</h1>

      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card className="product-card">
              <CardMedia className="card-image" component="img" image={product.image} alt={product.title} />
              <CardContent>
                <Typography className="card-title" variant="h6">{product.title}</Typography>
                <Typography className="card-price" variant="body2">${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" className="add-to-cart">Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// 🔥 FIX: Add a timeout to prevent Vercel function timeout
export async function getServerSideProps() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds max timeout

    const res = await fetch("https://fakestoreapi.com/products", { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return {
      props: {
        products: data.slice(0, 10),
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default Home;
