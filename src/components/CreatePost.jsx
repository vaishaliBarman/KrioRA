import { useState } from "react";
import "../style/CreatePost.css"
 
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !eventType || !file) {
      setMessage("Please fill all fields and upload a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("eventType", eventType);
    formData.append("media", file);

    try {
      const response = await fetch("http://localhost:5002/event/createEvent", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Event created successfully!");
        setTitle("");
        setEventType("");
        setFile(null);
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

   
  return (
    <>
      
      <div className="create-post-container">
        <div className="create-post-card">
          <h2>Create New Event</h2>
  
          {message && <p className="message">{message}</p>}
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
  
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} required>
              <option value="">Select Event Type</option>
              <option value="Birthday">Birthday</option>
              <option value="Wedding">Wedding Events</option>
              <option value="Proposal Spot">Proposal Spot</option>
              <option value="Engagement">Engagement</option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Farewell">Farewell</option>
              <option value="Others">Others</option>
            </select>
  
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} required />
  
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
  
};

export default CreatePost;
