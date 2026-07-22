import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import CategoryProducts from "./admin/pages/CategoryProducts";

// Admin Pages
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Categories from "./admin/pages/Categories";
import Orders from "./admin/pages/Orders";
import EditProduct from "./admin/pages/EditProduct";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Returns from "./pages/Returns";
import Terms_conditions from "./pages/Terms_conditions";
import Contactus from "./pages/Contactus";
import SearchResults from "./pages/SearchResults";

// Blogs
import Blogs from "./blogs/Blogs";
import TopSareeStylesTrends from './blogs/top-saree-styles-trends';
import WomensBestNailPaint from "./blogs/womens-best-nail-paint";
import WomensBestHairStyles from "./blogs/womens-best-hair-styles";
import WomensBestHeels from "./blogs/womens-best-heels";
import WomensBestLipstick from "./blogs/womens-best-lipstick";
import BestBudgetFriendlyWallet from "./blogs/best-budget-friendly-wallet";
import BestEyeliners from "./blogs/best-eyeliners";
import EssentialFeaturesWallet from "./blogs/essential-features-wallet";
import PerfectWalletForYourLifestyle from "./blogs/perfect-wallet-for-your-lifestyle";
import WalletVsClutch from "./blogs/wallet-vs-clutch";
import StylishWomensWallets from "./blogs/stylish-womens-wallets";
import MakeupForDifferentFaceShapes from "./blogs/makeup-for-different-face-shapes-tips-to-enhance-your-natural-features";
import DayToNightMakeupTransformation from "./blogs/day-to-night-makeup-transformation";
import FoundationForYourSkinTone from "./blogs/foundation-for-your-skin-tone";
import EverydayNaturalMakeupLook from "./blogs/everyday-natural-makeup-look-step-by-step-guide-for-beginners";
import MakeupProducts from "./blogs/makeup-products";
import WomensShoeStylesTrends from "./blogs/womens-shoe-styles-trends";
import BestTrackPant from "./blogs/best-track-pant";
import BestTShirt from "./blogs/best-t-shirt";
import BestPant from "./blogs/best-pant";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>

        {/* Main Website */}

        <Route path="/" element={<Home />} />

        <Route
            path="/search/:keyword"
            element={<SearchResults />}
        />

        <Route
            path="/product/:slug"
            element={<ProductDetails />}
        />

        <Route
            path="/category/:categoryName"
            element={<CategoryProducts />}
        />

        <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
        />

        <Route
            path="/refund_returns"
            element={<Returns />}
        />

        <Route
            path="/terms-and-condition"
            element={<Terms_conditions />}
        />

        <Route
            path="/contact-us"
            element={<Contactus />}
        />

        <Route path="/about-us" element={<About />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Admin */}

        <Route path="/admin" element={<Dashboard />} />

        <Route path="/admin/products" element={<Products />} />

        <Route path="/admin/products/add" element={<AddProduct />} />

        <Route
          path="/admin/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/admin/categories"
          element={<Categories />}
        />

        <Route
          path="/admin/orders"
          element={<Orders />}
        />

        <Route
            path="/blog"
            element={<Blogs />}
        />

        <Route
          path="/top-saree-styles-trends"
          element={<TopSareeStylesTrends />}
        />

        <Route
          path="/womens-best-nail-paint"
          element={<WomensBestNailPaint />}
        />

        <Route
          path="/womens-best-hair-styles"
          element={<WomensBestHairStyles />}
        />

        <Route
            path="/womens-best-heels"
            element={<WomensBestHeels />}
        />

        <Route
            path="/womens-best-lipstick"
            element={<WomensBestLipstick />}
        />

        <Route
            path="/best-budget-friendly-wallet"
            element={<BestBudgetFriendlyWallet />}
        />

        <Route
            path="/best-eyeliners"
            element={<BestEyeliners />}
        />

        <Route
            path="/essential-features-wallet"
            element={<EssentialFeaturesWallet />}
        />

        <Route
            path="/perfect-wallet-for-your-lifestyle"
            element={<PerfectWalletForYourLifestyle />}
        />

        <Route
            path="/wallet-vs-clutch"
            element={<WalletVsClutch />}
        />

        <Route
            path="/stylish-womens-wallets"
            element={<StylishWomensWallets />}
        />

        <Route
            path="/makeup-for-different-face-shapes-tips-to-enhance-your-natural-features"
            element={<MakeupForDifferentFaceShapes />}
        />

        <Route
            path="/day-to-night-makeup-transformation"
            element={<DayToNightMakeupTransformation />}
        />

        <Route
            path="/foundation-for-your-skin-tone"
            element={<FoundationForYourSkinTone />}
        />

        <Route
            path="/everyday-natural-makeup-look-step-by-step-guide-for-beginners"
            element={<EverydayNaturalMakeupLook />}
        />

        <Route
            path="/makeup-products"
            element={<MakeupProducts />}
        />

        <Route
          path="/womens-shoe-styles-trends"
          element={<WomensShoeStylesTrends />}
        />

        <Route 
          path="/best-track-pant" 
          element={<BestTrackPant />} 
        />

        <Route
          path="/best-t-shirt"
          element={<BestTShirt />}
        />

        <Route
            path="/best-pant"
            element={<BestPant />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;