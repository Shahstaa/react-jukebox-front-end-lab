import { useState, useEffect } from 'react';

const TrackForm = (props) => {
  const initialState = props.selectedTrack
    ? props.selectedTrack
    : {
        title: '',
        artist: '',
      };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (props.selectedTrack) {
      // If a track is selected, update it
      props.handleUpdateTrack(formData, props.selectedTrack.id);
    } else {
      // If no track is selected, add a new track
      props.handleAddTrack(formData);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {props.selectedTrack ? 'Update Track' : 'Add New Track'}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
