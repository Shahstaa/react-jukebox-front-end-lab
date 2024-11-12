const NowPlaying = ({ selectedTrack, handleFormView, handleRemoveTrack }) => {
  if (!selectedTrack) {
    return <div>No track is currently playing.</div>;
  }

  return (
    <div>
      <h2>Now Playing: {selectedTrack.title} by {selectedTrack.artist}</h2>
      <button onClick={() => handleFormView(selectedTrack)}>
        Edit Track
      </button>
      <button onClick={() => handleRemoveTrack(selectedTrack.id)}>
        Remove Track
      </button>
    </div>
  );
};

export default NowPlaying;

