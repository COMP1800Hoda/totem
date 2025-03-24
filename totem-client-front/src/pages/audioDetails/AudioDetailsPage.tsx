import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { PageContainer, AudioPlayer} from "./AudioDetailsPage.styled";

interface Audio {
  objectId: string;
  name: string;
  audio_url: string;
  createdAt: string;
  updatedAt: string;
}

const AudioDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [audio, setAudio] = useState<Audio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(
          `https://parseapi.back4app.com/classes/Audios/${id}`,
          {
            method: "GET",
            headers: {
              "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
              "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch audio details");
        }

        const data = await response.json();
        setAudio({
          objectId: data.objectId,
          name: data.Name,
          audio_url: data.AudioURL,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      } catch (error) {
        setError("Error fetching audio details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!audio) return <p>Audio not found.</p>;

  return (
    <div>
      <Header />
      <PageContainer>
        <h1>{audio.name}</h1>
        <img src={`/src/assets/audio${audio.objectId}.png`} alt={audio.name} style={{ width: "25em" }} />
        <p>Created At: {new Date(audio.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(audio.updatedAt).toLocaleString()}</p>
        {audio.audio_url ? (
            <AudioPlayer controls>
              <source src={audio.audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </AudioPlayer>
        ) : (
          <p>No audio file available.</p>
        )}
      </PageContainer>
      <Footer />
    </div>
  );
};

export default AudioDetailsPage;
