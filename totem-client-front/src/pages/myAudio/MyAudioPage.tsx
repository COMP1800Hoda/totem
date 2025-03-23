import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'; // Import useNavigate
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { MyAudioContainer, AudioGrid, AudioList, AudioItem, AudioThumbnail } from './MyAudioPage.styled';

// Define Audio type
interface Audio {
  objectId: string;
  cover_image_url: string;
  title: string;
}

// Audio item component to be reused in both grid and list views
const AudioItemComponent = ({ src, alt, title, objectId }: { src: string; alt: string; title: string; objectId: string }) => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleClick = () => {
    navigate(`/audios/${objectId}`); // Navigate to the audio detail page
  };

  return (
    <AudioItem onClick={handleClick}>
      <AudioThumbnail src={src} alt={alt} />
      <div>{title}</div>
    </AudioItem>
  );
};

const MyAudioPage: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true); // Default to Grid View
  const [audios, setAudios] = useState<Audio[]>([]); // State to store fetched audios

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  const fetchAudios = async () => {
    try {
      const response = await fetch("https://parseapi.back4app.com/classes/Audios", {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH", // Replace with your actual Application ID
          "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP", // Replace with your actual API key
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.results) {
        setAudios(data.results); // Take the first 3 audios for display
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching audios:", error);
    }
  };

  // Fetch audios when the component mounts
  useEffect(() => {
    fetchAudios();
  }, []);

  return (
    <MyAudioContainer>
      <Header />
      <div style={{ padding: '20px', marginTop: '80px', textAlign: 'center' }}>
        <h1>Recently played audio.</h1>
        <button onClick={toggleView} style={{ margin: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Toggle {isGridView ? 'List' : 'Grid'} View
        </button>
      </div>
      {/* Conditionally render either Grid or List View */}
      {isGridView ? (
        <AudioGrid>
          {audios.map((audio) => (
            <AudioItemComponent
              key={audio.objectId}
              src={`/src/assets/audio${audio.objectId}.png`}
              alt={audio.title}
              title={audio.title}
              objectId={audio.objectId} // Pass objectId to AudioItemComponent
            />
          ))}
        </AudioGrid>
      ) : (
        <AudioList>
          {audios.map((audio) => (
            <AudioItemComponent
              key={audio.objectId}
              src={`/src/assets/audio${audio.objectId}.png`}
              alt={audio.title}
              title={audio.title}
              objectId={audio.objectId} // Pass objectId to AudioItemComponent
            />
          ))}
        </AudioList>
      )}
      <Footer />
    </MyAudioContainer>
  );
};

export default MyAudioPage;