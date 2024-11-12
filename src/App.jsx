import { useState, useEffect } from 'react';

// Services
import * as trackService from './services/trackService';

// Components
import TrackList from './components/TrackList';
import NowPlaying from './components/NowPlaying';
import TrackForm from './components/TrackForm';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch tracks from the backend on mount
  useEffect(() => {
    async function getTracks() {
      try {
        const allTracks = await trackService.index();
        if (allTracks.error) {
          throw new Error(allTracks.error);
        }
        setTracks(allTracks);
      } catch (error) {
        console.log(error);
      }
    }
    getTracks();
  }, []);

  // Play a selected track (set it as the currently playing track)
  const updateSelectedTrack = (track) => {
    setSelectedTrack(track);
  };

  // Add a new track
  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      setTracks([newTrack, ...tracks]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Update an existing track
  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }

      const updatedTracksList = tracks.map((track) => {
        if (track.id !== updatedTrack.id) {
          return track;
        } else {
          return updatedTrack;
        }
      });

      setTracks(updatedTracksList);
      setSelectedTrack(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle form visibility for adding/updating a track
  const handleFormView = (track) => {
    setSelectedTrack(track);
    setIsFormOpen(!isFormOpen);
  };

  // Remove a track
  const handleRemoveTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.remove(trackId);
      if (deletedTrack.error) {
        throw new Error(deletedTrack.error);
      }

      setTracks(tracks.filter((track) => track.id !== trackId));
      setSelectedTrack(null); // Reset selected track when removed
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TrackList
        trackList={tracks}
        updateSelectedTrack={updateSelectedTrack}
        handleFormView={handleFormView}
        handleRemoveTrack={handleRemoveTrack}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm
          handleAddTrack={handleAddTrack}
          selectedTrack={selectedTrack}
          handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <NowPlaying
          selectedTrack={selectedTrack}
          handleFormView={handleFormView}
          handleRemoveTrack={handleRemoveTrack}
        />
      )}
    </>
  );
}
