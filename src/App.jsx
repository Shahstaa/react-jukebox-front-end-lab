import { useState, useEffect } from 'react';
import TrackList from './components/TrackList';
import TrackForm from './components/TrackForm';
import NowPlaying from './components/NowPlaying';

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    // Fetch track list when the app loads
    const fetchTracks = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`);
      const tracks = await response.json();
      setTrackList(tracks);
    };
    fetchTracks();
  }, []);

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (trackData) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData)
    });
    const newTrack = await response.json();
    setTrackList([...trackList, newTrack]);
    setIsFormOpen(false);
  };

  const handleUpdateTrack = async (updatedTrackData, trackId) => {
    const response = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks/${trackId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTrackData)
    });
    const updatedTrack = await response.json();
    setTrackList(trackList.map(track => track._id === trackId ? updatedTrack : track));
  };

  const handleRemoveTrack = async (trackId) => {
    await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks/${trackId}`, {
      method: 'DELETE'
    });
    setTrackList(trackList.filter(track => track._id !== trackId));
    setSelectedTrack(null); // Clear the now playing track if deleted
  };

  const nowPlaying = (track) => {
    setSelectedTrack(track);
  };

  return (
    <div>
      <h1>Reactville Jukebox</h1>
      <TrackList
        trackList={trackList}
        nowPlaying={nowPlaying}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
        handleRemoveTrack={handleRemoveTrack}
        handleEditTrack={(track) => setSelectedTrack(track)}
      />
      {isFormOpen && (
        <TrackForm
          handleAddTrack={handleAddTrack}
          handleUpdateTrack={handleUpdateTrack}
          selected={selectedTrack}
        />
      )}
      <NowPlaying selected={selectedTrack} handleFormView={handleFormView} handleRemoveTrack={handleRemoveTrack} />
    </div>
  );
};

export default App;
