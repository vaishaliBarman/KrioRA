 
 
import FavoriteButton from "./FavoriteButton";
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { FaShareAlt,  FaTrash } from "react-icons/fa";
import axios from "axios";
import "../style/AllEvent.css";

const AllEvent = () => {
  const { eventType } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  // Fetch token once, use useMemo to prevent re-fetching
  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5002/events/${eventType}`);
        setEvents(response.data.events || []);
        console.log("getting data from events db",response.data.events)
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [eventType]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5002/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        setRole(res.data.role);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [token]); // Run only when token changes

  const handleShareWhatsApp = (event) => {
    const shareUrl = `https://wa.me/?text=Check out this event: ${event.title} - ${window.location.origin}/event/${event._id}`;
    window.open(shareUrl, "_blank");
  };

  const handleDeleteEvent = async (eventId) => {
    if (!token) return console.error("No token found, user not authenticated");

    try {
      await axios.delete(`http://localhost:5002/remove/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <> 
    <div className=" eventType">
        <h2 className="text-2xl font-bold mb-4"
            style={{
              fontFamily: "Yatra One",
              color: "#2f1d16",
              fontSize: "1.8rem",
              textAlign: "center",
              textShadow: "1px 1px 1px #000",
              marginTop: "20px",

              
            }}>
               {eventType} Event Decoration
        </h2>
  
      {loading ? (
            <p>Loading...</p>
          ) : events.length > 0 ? (
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...events].reverse().map((event) => (
                  <div key={event._id} className="p-1  bg-transparent">
                    
                    
                    {event.media?.type === "image" && (
                      <img src={event.media.url || "/default-placeholder.jpg"} className="rounded" />
                    )}
                    {event.media?.type === "video" && (
                      <video width="100%" height="300" controls className="rounded">
                        <source src={event.media.url} type="video/mp4" />
                      </video>
                    )}

                <div className="flex space-x-4 mt-2">
                  <span onClick={() => handleShareWhatsApp(event)} className="text-green-500 text-xl cursor-pointer">
                    <FaShareAlt />
                  </span>
                  {role === "user" && <FavoriteButton eventId={event._id} token={token} />}
                  {role === "admin" && (
                   <button onClick={() => handleDeleteEvent(event._id)} style={{ all: "unset", cursor: "pointer" }}>
                   <FaTrash />
                 </button>
                  )}
                </div>
         </div>
  ))}
            </div>

          ) : (
          <p >No events available...</p>
      )}
    </div>

    </>
  );
};

export default AllEvent;
