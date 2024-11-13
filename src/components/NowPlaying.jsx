const NowPlaying = (props) => {
    if (!props.selected) {
      return (
        <div>
          <h1>No Track is playing</h1>
        </div>
      );
    }
  
    return (
      <div>
        <h1>Now Playing:</h1>
        <p><strong>Title:</strong> {props.selected.title}</p>
        <p><strong>Artist:</strong> {props.selected.artist}</p>
        <div>
          <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
          <button onClick={() => props.handleRemoveTrack(props.selected._id)}>Delete</button>
        </div>
      </div>
    );
  };
  
  export default NowPlaying;
  