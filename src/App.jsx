import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllEvent from "./components/AllEvent";
import Favourite from "./pages/Favourite";
import CreatePage from "./components/CreatePost";
import EventCard from "./components/EventCard";
import Navbar from "./components/Navbar";
 
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="1064735116259-rv4l5gsgril4fdm2pbrmnbjq2phb0aa4.apps.googleusercontent.com">
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<EventCard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createpost" element={<CreatePage />} />
        <Route path="/events/:eventType" element={<AllEvent />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
 
export default App;