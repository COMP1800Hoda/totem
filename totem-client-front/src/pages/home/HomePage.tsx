import React from "react";
import { Link } from "react-router";
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { 
  HomeContainer, 
  Section, 
  SectionHeader, 
  Banner, 
  RestoreButton 
} from "./HomePage.styled";

// Reusable component for displaying both books and audio thumbnails
const ItemComponent = ({ src, alt, title }: { src: string; alt: string; title: string }) => (
  <div style={{ margin: '10px', textAlign: 'center' }}>
    <img src={src} alt={alt} style={{ width: '150px', height: 'auto' }} />
    <div>{title}</div>
  </div>
);

const Home: React.FC = () => {
  const isAuthenticated = false; // Placeholder: Replace with actual authentication logic
  
  const bookItems = [
    { src: "book1.jpg", alt: "Book 1", title: "Book 1" },
    { src: "book2.jpg", alt: "Book 2", title: "Book 2" },
    { src: "book3.jpg", alt: "Book 3", title: "Book 3" }
  ];

  const audioItems = [
    { src: "audio1.jpg", alt: "Audio 1", title: "Audio 1" },
    { src: "audio2.jpg", alt: "Audio 2", title: "Audio 2" },
    { src: "audio3.jpg", alt: "Audio 3", title: "Audio 3" }
  ];

  return (
    <HomeContainer>
      <Header />
      {!isAuthenticated && (
        <Banner>
          Your saved books won’t be restored unless you log in.
          <RestoreButton onClick={() => alert("Redirect to login")}>
            Restore Books
          </RestoreButton>
        </Banner>
      )}

      <Section>
        <SectionHeader>
          <h2>Books</h2>
          <Link to="/books">See All</Link>
        </SectionHeader>
        {/* Flexbox layout to display items in a row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {bookItems.map((item, index) => (
            <ItemComponent key={index} {...item} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader>
          <h2>Audio</h2>
          <Link to="/audio">See All</Link>
        </SectionHeader>
        {/* Flexbox layout to display items in a row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {audioItems.map((item, index) => (
            <ItemComponent key={index} {...item} />
          ))}
        </div>
      </Section>

      <Footer />
    </HomeContainer>
  );
};

export default Home;
