import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Changed from "react-router" to "react-router-dom"
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import {
  HomeContainer,
  Section,
  Padding,
  SectionHeader,
  BookThumbnail,
  AudioThumbnail
} from "./HomePage.styled";
import {Storybook} from "../../types/Storybook.ts";

// Updated Audio interface to match API response
interface Audio {
  objectId: string;
  cover_image_url?: any; // Made optional
  Name: string; // Note capital N to match API
  name?: string; // Optional lowercase for backward compatibility
}

// Book Component
const BookComponent: React.FC<Storybook> = ({
  storybook_id,
  cover_image_url,
  storybook_title,
}) => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/books/${storybook_id}`, { state: { from: 'home' } })}>
      <BookThumbnail src={cover_image_url} alt={storybook_title} />
      <div>{storybook_title}</div>
    </div>
  );
};

// Updated Audio Component
const AudioComponent: React.FC<Audio> = ({
  objectId,
  cover_image_url,
  Name,
  name,
}) => {
  const navigate = useNavigate();
  const displayName = Name || name || 'Untitled'; // Fallback to name or 'Untitled'
  // const imageSrc = cover_image_url || `/assets/$audio${objectId}.png`;
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Define audioImages within the useEffect hook
    const audioImages = import.meta.glob('/assets/*.png', { eager: true });
    console.log('audioImages', audioImages); // Log the imported images
    const imageName = `assets/audio${objectId}.png`; // Adjust path and filename pattern as needed
    setImageSrc(audioImages[imageName] || cover_image_url || '');
    console.log('audioImages[imageName]', audioImages[imageName]); // Log the image source
    console.log('cover_image_url', cover_image_url); // Log the cover image URL
  }, [objectId, cover_image_url]);

  console.log('imgSrc in HomePage', imageSrc);
  return (
    <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/audios/${objectId}`)}>
      <AudioThumbnail src={imageSrc} alt={displayName} />
      <div>{displayName}</div>
    </div>
  );
};

const Home: React.FC = () => {
  const [books, setBooks] = useState<Storybook[]>([]);
  const [audios, setAudios] = useState<Audio[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          'https://parseapi.back4app.com/classes/storybook',
          {
            method: 'GET',
            headers: {
              'X-Parse-Application-Id':
                'XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH',
              'X-Parse-REST-API-Key':
                'mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP',
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        if (data.results) {
          setBooks(data.results.slice(0, 3));
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await fetch(
          'https://parseapi.back4app.com/classes/Audios',
          {
            method: 'GET',
            headers: {
              'X-Parse-Application-Id':
                'XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH',
              'X-Parse-REST-API-Key':
                'mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP',
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        if (data.results) {
          // Map the API response to our Audio interface
          const formattedAudios = data.results.map((audio: any) => ({
            objectId: audio.objectId,
            cover_image_url: audio.cover_image_url,
            Name: audio.Name, // Using the capital N property from API
            name: audio.name, // Optional lowercase
          }));
          setAudios(formattedAudios.slice(0, 3));
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching audios:', error);
      }
    };

    fetchAudios();
  }, []);

  return (
    <HomeContainer>
      <Header />
      <Padding></Padding>

      <Section>
        <SectionHeader>
          <Link to="/my-books">See All</Link>
          <h2>Recent Books</h2>
        </SectionHeader>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25em' }}>
          {books.map((book) => (
            <BookComponent key={book.storybook_id} {...book} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader>
          <Link to="/my-audio">See All</Link>
          <h2>Recent Audio</h2>
        </SectionHeader>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25em' }}>
          {audios.map((audio) => (
            <AudioComponent
              key={audio.objectId}
              objectId={audio.objectId}
              cover_image_url={audio.cover_image_url}
              Name={audio.Name}
              name={audio.name}
            />
          ))}
        </div>
      </Section>

      <Footer />
    </HomeContainer>
  );
};

export default Home;
