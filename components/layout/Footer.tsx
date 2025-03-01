import { Box, Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { Facebook, Twitter, Email, LocationOn, Phone, Send } from "@mui/icons-material";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <Box className={styles.footer}>
      <Grid container spacing={4} className={styles.footerContainer}>
        {/* Left Section (Logo & Contact) */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" className={styles.logo}>Krist</Typography>
          <Typography variant="body2" className={styles.contact}>
            <Phone className={styles.icon} /> (704) 555-0127
          </Typography>
          <Typography variant="body2" className={styles.contact}>
            <Email className={styles.icon} /> krist@example.com
          </Typography>
          <Typography variant="body2" className={styles.contact}>
            <LocationOn className={styles.icon} /> 3891 Ranchview Dr. Richardson, California 62639
          </Typography>
        </Grid>

        {/* Information Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className={styles.sectionTitle}>Information</Typography>
          <Typography variant="body2" className={styles.link}>My Account</Typography>
          <Typography variant="body2" className={styles.link}>Login</Typography>
          <Typography variant="body2" className={styles.link}>My Cart</Typography>
          <Typography variant="body2" className={styles.link}>My Wishlist</Typography>
          <Typography variant="body2" className={styles.link}>Checkout</Typography>
        </Grid>

        {/* Service Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className={styles.sectionTitle}>Service</Typography>
          <Typography variant="body2" className={styles.link}>About Us</Typography>
          <Typography variant="body2" className={styles.link}>Careers</Typography>
          <Typography variant="body2" className={styles.link}>Delivery Information</Typography>
          <Typography variant="body2" className={styles.link}>Privacy Policy</Typography>
          <Typography variant="body2" className={styles.link}>Terms & Conditions</Typography>
        </Grid>

        {/* Subscribe Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className={styles.sectionTitle}>Subscribe</Typography>
          <Typography variant="body2" className={styles.subscribeText}>
            Enter your email below to be the first to know about new collections and product launches.
          </Typography>
          <div className={styles.subscribeBox}>
            <TextField variant="outlined" placeholder="Your Email" className={styles.input} />
            <Button className={styles.sendButton}><Send /></Button>
          </div>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box className={styles.bottomSection}>
        <Typography variant="body2">©2023 Krist All Rights Reserved</Typography>
        <div className={styles.socialIcons}>
          <IconButton className={styles.icon}><Facebook /></IconButton>
          <IconButton className={styles.icon}><Twitter /></IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
