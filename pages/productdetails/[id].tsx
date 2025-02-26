import { GetServerSideProps } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Box, Typography, Button, ButtonGroup } from "@mui/material";
import styles from "../../styles/productdetails.module.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductProps) => {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("M"); 
  const router = useRouter();

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, { ...product, quantity: count, size }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.title} (Size: ${size}) added to cart!`); 
    router.push("/cart"); 
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      <Box className={styles.content}>
        <img src={product.image} alt={product.title} className={styles.image} />

        <Box className={styles.details}>
          <Typography variant="h4" className={styles.title}>{product.title}</Typography>
          <Typography variant="h5" className={styles.price}>${product.price}</Typography>
          <Typography variant="body1" className={styles.description}>{product.description}</Typography>

          {/* Size Selection */}
          <Box className={styles.sizeOptions}>
            <Typography variant="h6">Select Size:</Typography>
            <ButtonGroup>
              {["S", "M", "L", "XL"].map((s) => (
                <Button 
                  key={s} 
                  className={`${styles.sizeButton} ${size === s ? styles.active : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          {/* Quantity Selection */}
          <Box className={styles.quantity}>
            <Button onClick={() => setCount((c) => Math.max(1, c - 1))}>-</Button>
            <Typography>{count}</Typography>
            <Button onClick={() => setCount(c => c + 1)}>+</Button>
          </Box>

          {/* Action Buttons */}
          <Box className={styles.buttons}>
            <Button variant="contained" className={styles.addToCart} onClick={addToCart}>
              Add to Cart
            </Button>
            <Button variant="outlined" className={styles.wishlist}>Add to Wishlist</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
  const product: Product = await res.json();

  return {
    props: { product },
  };
};
