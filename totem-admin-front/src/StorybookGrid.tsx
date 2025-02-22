import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const StorybookGrid = () => {
  const [storybooks, setStorybooks] = useState([]);

  useEffect(() => {
    const fetchStorybooks = async () => {
      try {
        const response = await fetch("https://parseapi.back4app.com/classes/storybook", {
          headers: {
            "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
            "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
          },
        });
        const data = await response.json();
        setStorybooks(data.results);
      } catch (error) {
        console.error("Error fetching storybooks:", error);
      }
    };

    fetchStorybooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Storybook Covers</h2>
      <div className="row row-cols-2 row-cols-md-3 g-4">
        {storybooks.map((story, index) => (
          <div key={index} className="col">
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
