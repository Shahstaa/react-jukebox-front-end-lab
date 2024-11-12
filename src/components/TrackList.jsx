import React from 'react';

const TrackList = (props) => {
  const tracks = props.trackList.map((track) => (
    <div key={track.id}>
      <li>
        <span>{track.title} by {track.artist}</span>
        
        {/* Play button: updates the currently playing track */}
        <button onClick={() => props.updateSelectedTrack(track)}>
          Play
        </button>

        {/* Edit button: opens the form for editing the track */}
        <button onClick={() => props.handleFormView(track)}>
          Edit
        </button>

        {/* Delete button: removes the track from the list and the backend */}
        <button onClick={() => props.handleRemoveTrack(track.id)}>
          Delete
        </button>
      </li>
    </div>
  ));

  return (
    <div>
      <h2>Track List</h2>
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? 'Close Form' : 'Add New Track'}
      </button>
      <ul>
        {!props.trackList.length ? (
          <h3>No Tracks Yet!</h3>
        ) : (
          <ul>{tracks}</ul>
        )}
      </ul>
    </div>
  );
};

export default TrackList;
