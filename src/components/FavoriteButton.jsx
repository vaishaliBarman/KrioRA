import { useState } from "react";
import axios from "axios";

const FavoriteButton = ({ eventId, token }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = async () => {
    if (!token) {
      alert("Please log in to save this event!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5002/favorites/addFav",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setIsFavorited(true);
        alert("Great, event saved to favorites!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error saving event.");
    }
  };

  return (
    <button onClick={handleFavorite} className={isFavorited ? "saved" : ""}
    style={{ borderRadius: "5px", padding: "3px", marginLeft: "10px", backgroundColor:"rgb(78, 57, 40); ", color:"white" }}>
    
      {isFavorited ? "Saved ✅" : "Save❤️"}
    </button>
  );
};

export default FavoriteButton;
