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
      const response = await fetch("http://localhost:5002/createEvent", {
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

  // return (
  //   <>
  //   <Navbar />
  //   <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
  //     <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

  //     {message && <p className="mb-4 text-red-500">{message}</p>}

  //     <form onSubmit={handleSubmit} className="space-y-4">
  //       {/* Title Input */}
  //       <input
  //         type="text"
  //         placeholder="Event Title"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //         className="w-full p-2 border rounded"
  //         required
  //       />

  //       {/* Event Type Dropdown */}
  //       <select
  //         value={eventType}
  //         onChange={(e) => setEventType(e.target.value)}
  //         className="w-full p-2 border rounded"
  //         required
  //       >
  //         <option value="">Select Event Type</option>
  //         <option value="Birthday">Birthday</option>
  //         <option value="Wedding">Wedding Events</option>
  //         <option value="Proposal Spot">Proposal Spot</option>
  //         <option value="Engagement">Engagement</option>
  //         <option value="Baby Shower">Baby Shower</option>
  //         <option value="Farewell">Farewell</option>
  //         <option value="Others">Others</option>
  //       </select>

  //       {/* File Upload */}
  //       <input
  //         type="file"
  //         accept="image/*,video/*"
  //         onChange={handleFileChange}
  //         className="w-full p-2 border rounded"
  //         required
  //       />

  //       {/* Submit Button */}
  //       <button
  //         type="submit"
  //         className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //         disabled={loading}
  //       >
  //         {loading ? "Uploading..." : "Create Event"}
  //       </button>
  //     </form>
  //   </div>
  
    
  //   </>
  // )
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
