import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { 
  HomeContainer, 
  Section, 
  Padding,
  SectionHeader, 
  BookThumbnail,
} from "./HomePage.styled";
import {Storybook} from "../../types/Storybook.ts";

// Define Audio type
interface Audio {
  objectId: string;
  cover_image_url: string;
  title: string;
}

// Book Component
const BookComponent: React.FC<Storybook> = ({ storybook_id, cover_image_url, storybook_title }) => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center' }} onClick={() => navigate(`/books/${storybook_id}`)}>
      <BookThumbnail src={cover_image_url} alt={storybook_title} />
      <div>{storybook_title}</div>
    </div>
  );
};

// Audio Component
const AudioComponent: React.FC<Audio> = ({ objectId, title}) => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center' }} onClick={() => navigate(`/audios/${objectId}`)}>
      <BookThumbnail src={`/src/assets/audio${objectId}.png`} alt={title} />
      <div>{title}</div>
    </div>
  );
};

const Home: React.FC = () => {
  const [books, setBooks] = useState<Storybook[]>([]);
  const [audios, setAudios] = useState<Audio[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://parseapi.back4app.com/classes/storybook", {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": import.meta.env.VITE_APP_ID,
            "X-Parse-REST-API-Key": import.meta.env.VITE_RESTAPI_Key,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.results) {
          setBooks(data.results.slice(0, 3)); // Take the first 3 books for display
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await fetch("https://parseapi.back4app.com/classes/Audios", {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": import.meta.env.VITE_APP_ID,
            "X-Parse-REST-API-Key": import.meta.env.VITE_RESTAPI_Key,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.results) {
          setAudios(data.results.slice(0, 3)); // Take the first 3 audios for display
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching audios:", error);
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
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
          {audios.map((audio) => (
            <AudioComponent key={audio.objectId} {...audio} />
          ))}
        </div>
      </Section>

      <Footer />
    </HomeContainer>
  );
};

export default Home;