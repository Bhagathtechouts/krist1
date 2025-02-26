import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import "../styles/cart.module.css"

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = (id: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id: number) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card className="cartCard">
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <CardMedia component="img" image={item.image} alt={item.title} height="100" className="productImage" />
                  </Grid>
                  <Grid item xs={5}>
                    <CardContent>
                      <Typography variant="h6" className="productTitle">{item.title}</Typography>
                      <Typography variant="body1">Price: ${item.price.toFixed(2)}</Typography>
                      <Typography variant="body1">Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs={3} className="quantityContainer">
                    <Button className="quantityBtn" onClick={() => decreaseQuantity(item.id)}>-</Button>
                    <Typography className="quantity">{item.quantity}</Typography>
                    <Button className="quantityBtn" onClick={() => increaseQuantity(item.id)}>+</Button>
                  </Grid>
                  <Grid item xs={1} className="deleteContainer">
                    <Button className="deleteBtn" onClick={() => removeFromCart(item.id)}>🗑️</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mt: 3 }} className="grandTotal">
              Grand Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
