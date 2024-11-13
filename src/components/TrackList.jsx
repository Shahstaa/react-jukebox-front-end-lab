const TrackList = (props) => {
    const tracks = props.trackList.map((track) => (
      <li key={track._id}>
        {track.title} by {track.artist}
        <button onClick={() => props.nowPlaying(track)}>Play</button>
        <button onClick={() => props.handleEditTrack(track)}>Edit</button>
        <button onClick={() => props.handleRemoveTrack(track._id)}>Delete</button>
      </li>
    ));
  
    return (
      <div>
        <button onClick={props.handleFormView}>
          {props.isFormOpen ? 'Close Form' : 'Add New Track'}
        </button>
        <h1>Track List</h1>
        {!props.trackList.length ? <h2>No tracks yet!</h2> : <ul>{tracks}</ul>}
      </div>
    );
  };
  
  export default TrackList;
  