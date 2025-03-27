import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5002/user/users", {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        setRole(response.data.role);
        console.log("User role:", response.data.role);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (savedToken) {
      fetchUser();
    }
  }, []);

  return (
    <Navbar 
      expand="lg" 
      className="shadow-sm px-3" 
      expanded={expanded} 
      style={{ backgroundColor: "#93AB9D" }}
    >
      <Container>
        <Navbar.Brand 
          href="/" 
          className="fw-bold fs-3" 
          style={{ fontFamily: "'Dancing Script', cursive", color: "#2f1d16", fontWeight: "bold", fontSize: "2rem", transition: "0.3s", letterSpacing: "2px", textShadow: "2px 2px 2px rgb(12, 24, 17)" }}
        >
          KRIORA
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
          className="border-0"
        >
          {expanded ? <FaTimes size={25} color="#333" /> : <FaBars size={25} color="#333" />}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            <Nav.Link href="/" className="px-3 text-red-800" style={{ textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold", transition: "0.3s", padding: "8px 15px", borderRadius: "8px", listStyle: "none", fontFamily: "'Parisienne', cursive" }}>Home</Nav.Link>
            <Nav.Link href="/login" className="px-3 text-red-800" style={{ textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold", transition: "0.3s", padding: "8px 15px", borderRadius: "8px", listStyle: "none", fontFamily: "'Parisienne', cursive" }}>Login</Nav.Link>
            {role === "admin" ? (
              <Nav.Link href="/createpost" className="px-3 text-red-800" style={{ textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold", transition: "0.3s", padding: "8px 15px", borderRadius: "8px", listStyle: "none", fontFamily: "'Parisienne', cursive" }}>Create</Nav.Link>
            ) : role === "user" ? (
              <Nav.Link href="/favourite" className="px-3 text-red-800" style={{ textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold", transition: "0.3s", padding: "8px 15px", borderRadius: "8px", listStyle: "none", fontFamily: "'Parisienne', cursive" }}>Favourites</Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;