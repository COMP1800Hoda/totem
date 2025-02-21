import React, { useState } from 'react';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { AudioContainer, AudioGrid, AudioList, AudioItem, AudioThumbnail } from './AudioPage.styled';

// Audio item component to be reused in both grid and list views
const AudioItemComponent = ({ src, alt, title }: { src: string; alt: string; title: string }) => (
  <AudioItem>
    <AudioThumbnail src={src} alt={alt} />
    <div>{title}</div>
  </AudioItem>
);

const AudioPage: React.FC = () => {
  const [isGridView, setIsGridView] = useState(true); // Default to Grid View

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  const audioItems = [
    { src: 'https://placehold.co/150x150?text=Audio+1', alt: 'Audio 1', title: 'Audio 1' },
    { src: 'https://placehold.co/150x150?text=Audio+2', alt: 'Audio 2', title: 'Audio 2' },
    { src: 'https://placehold.co/150x150?text=Audio+3', alt: 'Audio 3', title: 'Audio 3' },
    { src: 'https://placehold.co/150x150?text=Audio+4', alt: 'Audio 4', title: 'Audio 4' },
  ];

  return (
    <AudioContainer>
      <Header />
      <div style={{ padding: '20px', marginTop: '80px', textAlign: 'center' }}>
        <h1>This is the MyAudio page.</h1>
        <button onClick={toggleView} style={{ margin: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Toggle {isGridView ? 'List' : 'Grid'} View
        </button>
      </div>
      {/* Conditionally render either Grid or List View */}
      {isGridView ? (
        <AudioGrid>
          {audioItems.map((item, index) => (
            <AudioItemComponent key={index} {...item} />
          ))}
        </AudioGrid>
      ) : (
        <AudioList>
          {audioItems.map((item, index) => (
            <AudioItemComponent key={index} {...item} />
          ))}
        </AudioList>
      )}
      <Footer />
    </AudioContainer>
  );
};

export default AudioPage;
