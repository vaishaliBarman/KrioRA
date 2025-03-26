
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer ">
      <Container>
        <div className="footer-container">
          <Row className="w-100">
            {/* Left Side: Admin Info */}
            <Col xs={12} md={4} className="footer-section text-center text-md-start">
              <h3>Admin Contact</h3>
              <p><strong>John Doe</strong></p>
              <p>📞 +91 98765 43210</p>
              <p>📧 admin@example.com</p>
            </Col>

            {/* Center: Brand Name */}
            <Col xs={12} md={4} className="footer-section text-center">
              <h2 className="brand">Event Decor</h2>
              <p>Creating magical moments for your special events</p>
            </Col>

            {/* Right Side: Social Media */}
            <Col xs={12} md={4} className="footer-section text-center text-md-end">
              
              <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <FaInstagram className="icon instagram" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                  <FaYoutube className="icon youtube" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebook className="icon facebook" />
                </a>
              </div>
            </Col>
          </Row>
        </div>

        {/* Copyright Section */}
        <Row>
          <Col className="footer-bottom text-center">
            <p>© 2025 Event Decor | All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
