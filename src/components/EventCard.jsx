
import "../style/EventCard.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EventCard() {
  const navigate = useNavigate();
  const events = [
    { title: "Birthday", img: "https://funtikka.com/wp-content/uploads/2024/02/happy-birthday-images3.jpg" },
    { title: "Wedding", img: "https://i.pinimg.com/originals/e3/55/44/e35544ff5a7ed78ec1095aa9662e8cb2.jpg" },
    { title: "Baby Shower", img: "https://birthdaywala.in/wp-content/uploads/2024/08/Baby-Shower9.webp" },
    { title: "Farewell", img: "https://images.meesho.com/images/products/381060210/fttgr_512.webp" },
    { title: "Engagement", img: "https://i.pinimg.com/736x/1f/0b/75/1f0b7551652ff302e26f8edc1f582fbb.jpg" },
    { title: "Proposal Spot", img: "https://www.eastevents.in/wp-content/uploads/2023/11/IMG_8157.jpg" },
    { title: "Others", img: "https://t4.ftcdn.net/jpg/02/66/07/11/360_F_266071136_cxRiYMfabxHS0s5yFHkiDFRWuQdt3vaW.jpg" }
  ];

  const handleClick = (eventType) => {
    navigate(`/events/${eventType}`);
  };

  return (
    <Container className="text-center my-5">
    
      {/* About Section */}
      <div className="mb-4" >
        <h1 
          className="fs-1 fw-bold text-red-800 text-center mb-3"  id="top"
          style={{
            letterSpacing: "1px",
            fontFamily: "'Rubik Moonrocks', sans-serif",
            opacity: "0",
            transform: "translateY(20px)",
            animation: "fadeIn 1.5s ease-in-out forwards 0.5s"
          }}
        >
          Making Moments Magical
        </h1>
        <p className="lead text-muted"
        style={{
          fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
          color: "#440101a2",
          opacity: "0",
          transform: "translateY(20px)",
          animation: " fadeIn 1.5s ease-in-out forwards 0.5s"

        }}
        >
        We create beautiful event decorations just the way you like, with your favorite colors and within your budget—because your special moments matter to us. 
        Every celebration has a unique story, and we’re here to bring yours to life! 
        Whether it's a dreamy, flower-filled affair, a playful touch of balloons, or the soft glow of fairy lights setting the mood, 
        we craft every detail with love. Let’s create magic together and turn your special moments into unforgettable memories! ❤️
      </p>
      </div>
      <Row className="g-4 justify-content-center" >
          {events.map((event, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <Card 
                className="  text-center"
                style={{ backgroundColor: "transparent", border: "none",  width:  "178px", 
                  height: "280PX",}} 
                onClick={() => handleClick(event.title)}
              
              >
                <div className="image-container"id="event-card"
                  style={{
                     
                    objectFit:  "cover", 
                    borderRadius: "50%",
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    border:  "1px solid  #864e23",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Card.Img 
                    variant="top" 
                    src={event.img} 
                    alt={event.title} 
                    className="img-fluid event-img"
                    id="event-card img "
                    style={{width:  "178px", 
                      height: "280PX",}}
                  />
                </div>
                <Card.Body>
                  <Card.Title 
                    className="fw-bold text-uppercase" id="event-title"
                    style={{ fontFamily: "Dancing Script, cursive", color: "#720513" }}
                  >
                    {event.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

    </Container>
  );
}

export default EventCard;
