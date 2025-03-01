import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; 
import styles from "../styles/ProductList.module.css";
import ProductDetails from "./productdetails/[id]";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [cart, setCart] = useState<Product[]>([]);

  const handleLike = (id: number, event: React.MouseEvent) => {
    event.stopPropagation(); 
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation(); 
    setCart((prev) => [...prev, product]);
    alert(`${product.title} added to cart!`);
  };

  return (
    <Box className={styles.container}>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
<Link href={`/productdetails/${product.id}`} passHref>

              <Card className={styles.card}>
                <div className={styles.imageContainer}>
                  <CardMedia component="img" image={product.image} alt={product.title} className={styles.image} />
                  <div 
                    className={styles.likeButton} 
                    onClick={(e) => handleLike(product.id, e)}
                  >
                    <FavoriteIcon style={{ color: liked[product.id] ? "red" : "black" }} />
                  </div>
                </div>
                <CardContent>
                  <Typography variant="h6" className={styles.title}>{product.title}</Typography>
                  <Typography variant="body2" className={styles.desc}>
                    {product.description.slice(0, 60)}...
                  </Typography>
                  <Typography variant="body1" className={styles.price}>${product.price}</Typography>
                  <Button 
                    variant="contained" 
                    className={styles.button} 
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outlined" className={styles.wishlist}>Add to Wishlist</Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return {
    props: { products },
  };
};
