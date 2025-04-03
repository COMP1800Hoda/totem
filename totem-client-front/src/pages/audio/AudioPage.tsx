import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {
  AudioContainer,
  AudioGrid,
  AudioList,
  AudioItem,
  AudioThumbnail,
} from './AudioPage.styled';
import { COLORS } from '../../constants/colors.ts';

// Updated Audio interface to match API response
interface Audio {
  objectId: string;
  cover_image_url: string;
  title: string;
  Name: string; // Note the capital N to match API response
}

const AudioItemComponent = ({
  src,
  alt,
  title,
  name,
  objectId,
}: {
  src: string;
  alt: string;
  title: string;
  name: string;
  objectId: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/audios/${objectId}`);
  };

  return (
    <AudioItem onClick={handleClick}>
      <AudioThumbnail src={src} alt={alt} />
      <div style={{ fontWeight: 'bold' }}>{title}</div>
      <div style={{ color: COLORS.Dark }}>{name}</div>
    </AudioItem>
  );
};

const AudioPage: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [audios, setAudios] = useState<Audio[]>([]);

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  const fetchAudios = async () => {
    try {
      const response = await fetch(
        'https://parseapi.back4app.com/classes/Audios',
        {
          method: 'GET',
          headers: {
            'X-Parse-Application-Id':
              'XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH',
            'X-Parse-REST-API-Key': 'mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP',
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (data.results) {
        setAudios(data.results);
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching audios:', error);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  return (
    <AudioContainer>
      <Header />
      <div style={{ padding: '20px', marginTop: '80px', textAlign: 'center' }}>
        <h1>Audio Catalogue</h1>
        <button
          onClick={toggleView}
          style={{
            margin: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
            color: COLORS.Dark,
            backgroundColor: COLORS.Lightest,
            borderRadius: '6px',
            border: `2px solid ${COLORS.Dark}`,
          }}
        >
          Toggle {isGridView ? 'List' : 'Grid'} View
        </button>
      </div>
      {isGridView ? (
        <AudioGrid>
          {audios.map((audio) => (
            <AudioItemComponent
              key={audio.objectId}
              src={
                audio.cover_image_url || `/assets/audio${audio.objectId}.png`
              }
              alt={audio.title}
              title={audio.title}
              name={audio.Name} // Using audio.Name to match API response
              objectId={audio.objectId}
            />
          ))}
        </AudioGrid>
      ) : (
        <AudioList>
          {audios.map((audio) => (
            <AudioItemComponent
              key={audio.objectId}
              src={
                audio.cover_image_url ||
                `/src/assets/audio${audio.objectId}.png`
              }
              alt={audio.title}
              title={audio.title}
              name={audio.Name} // Using audio.Name to match API response
              objectId={audio.objectId}
            />
          ))}
        </AudioList>
      )}
      <Footer />
    </AudioContainer>
  );
};

export default AudioPage;
