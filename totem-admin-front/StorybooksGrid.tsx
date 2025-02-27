import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StorybookGrid = () => {
  const [storybooks, setStorybooks] = useState([]);

  useEffect(() => {
    const fetchStorybooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/storybooks"); // Fetch from Node.js API
        const data = await response.json();
        setStorybooks(data);
      } catch (error) {
        console.error("Error fetching storybooks:", error);
      }
    };

    fetchStorybooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Storybook Covers outside</h2>
      <div className="row row-cols-2 row-cols-md-3 g-4">
        {storybooks.map((story, index) => (
          <div key={story.objectId} className="col">
            <div className="card">
              <img
                src={story.cover_image_url}
                className="card-img-top"
                alt="Story Cover"
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{story.storybook_title}</h5>
                <p className="card-text">{story.storybook_description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorybookGrid;
