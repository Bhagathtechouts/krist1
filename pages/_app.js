import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"
import "swiper/css"; // ✅ Swiper CSS
import "../styles/style.css"; // ✅ Global CSS imported ONLY here

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
  
      <Component {...pageProps} />
      <Footer/>
    </ThemeProvider>
  );
}

export default MyApp;
