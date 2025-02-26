import Link from "next/link";
import { useState } from "react";
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Box, Typography } from "@mui/material";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { KeyboardArrowDown } from "@mui/icons-material";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        {/* Logo */}
        <Box className={styles.logo}>
          <h1>Krist</h1>
        </Box>

        {/* Navigation Links with Mega Header */}
        <Box className={styles.links} display="flex" alignItems="center" gap={3}>
          <Link href="/" className={styles.link}>
            <Typography variant="body1" className={styles.navText}>
              Home
            </Typography>
          </Link>

          {/* Mega Menu */}
          <Box onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose} className={styles.megaHeader}>
            <Button className={styles.link} endIcon={<KeyboardArrowDown fontSize="small" />}>
              Shop
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className={styles.megaMenu}>
              <Box className={styles.megaContainer} display="flex" gap={3} p={2}>
                <Box>
                  <h4>Men</h4>
                  <MenuItem onClick={handleMenuClose}>T-Shirts</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Casual Shirts</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Blazers & Coats</MenuItem>
                </Box>
                <Box>
                  <h4>Women</h4>
                  <MenuItem onClick={handleMenuClose}>Kurtas & Suits</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Ethnic Wear</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Dresses</MenuItem>
                </Box>
                <Box>
                  <h4>Footwear</h4>
                  <MenuItem onClick={handleMenuClose}>Casual Shoes</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Boots</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Sports Shoes</MenuItem>
                </Box>
                <Box>
                  <h4>Kids</h4>
                  <MenuItem onClick={handleMenuClose}>T-Shirts</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Jeans</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Party Wear</MenuItem>
                </Box>
              </Box>
            </Menu>
          </Box>

          <Link href="/story" className={styles.link}>
            <Typography variant="body1" className={styles.navText}>
              Our Story
            </Typography>
          </Link>
          <Link href="/blog" className={styles.link}>
            <Typography variant="body1" className={styles.navText}>
              Blog
            </Typography>
          </Link>
          <Link href="/contact" className={styles.link}>
            <Typography variant="body1" className={styles.navText}>
              Contact Us
            </Typography>
          </Link>
        </Box>

        {/* Icons & Login Button */}
        <Box className={styles.icons} display="flex" alignItems="center" gap={2}>
          <IconButton>
            <FaSearch className={styles.icon} />
          </IconButton>
          <IconButton>
            <FaUser className={styles.icon} />
          </IconButton>
          <IconButton>
            <FaShoppingCart className={styles.icon} />
          </IconButton>
          <Button variant="contained" className={styles.loginButton}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
