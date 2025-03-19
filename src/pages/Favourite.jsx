 
import"../style/Favorite.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const FavouritePage = () => {
  const [favourites, setFavourites] = useState([]);
  const [userName, setUserName] = useState("");
  const token = useMemo(() => localStorage.getItem("token"), []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Fetch favourite events
        const favResponse = await axios.get("http://localhost:5002/favorites/getFav", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched favourites data:", favResponse.data);
        setFavourites(favResponse.data.favorites || []);

        // Fetch logged-in user details
        const userResponse = await axios.get("http://localhost:5002/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(userResponse.data.name);
      } catch (error) {
        console.error("Go and Login again:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (favId) => {
    try {
      console.log("Deleting event:", favId);
      const response = await axios.delete(`http://localhost:5002/favorites/deleteFav/${favId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.success) {
        console.log("Deleted successfully, updating state...");
        setFavourites((prev) => prev.filter((fav) => fav._id !== favId));
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Hey {userName} ❤️</h1>

      {favourites.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {favourites.map((fav) => {
  const media = fav.event?.media || {}; // Ensure media exists

  return (
    <div key={fav._id} className="p-4 border shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-2">{fav.event?.title || "Untitled Event"}</h2>

      {/* Ensure media.url exists before rendering */}
      {media?.url ? (
        media.type === "image" ? (
          <img src={media.url} alt={fav.event?.title} className="w-full h-48 object-cover rounded" />
        ) : media.type === "video" ? (
          <video width="100%" height="200" controls>
            <source src={media.url} type="video/mp4" />
          </video>
        ) : null
      ) : (
        <p className="text-red-500">Media not available</p>
      )}

      <button onClick={() => handleDelete(fav._id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
        Remove
      </button>
    </div>
  );
})}

        </div>
      ) : (
        <p>No favorite events yet.</p>
      )}
    </div>
  );
};

export default FavouritePage;
