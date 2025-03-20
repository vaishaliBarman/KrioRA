import { GoogleOAuthProvider } from "@react-oauth/google";
 import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllEvent from "./components/AllEvent";
import Favourite from "./pages/Favourite";
import CreatePage from "./components/CreatePost";
import EventCard from "./components/EventCard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './pages/Footer';
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="1064735116259-rv4l5gsgril4fdm2pbrmnbjq2phb0aa4.apps.googleusercontent.com">

      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventCard />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createpost" element={<  CreatePage />} />
          <Route path="/events/:eventType" element={<AllEvent />} />
          <Route path="/favourite" element={<Favourite />} />
        </Routes>
      </BrowserRouter>

      one
      two

      <Footer />
    </GoogleOAuthProvider>
  );
}

export default App;