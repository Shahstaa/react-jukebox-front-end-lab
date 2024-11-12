const API_URL = 'http://localhost:5000/tracks';  // Update this to your actual API URL

export const index = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tracks');
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const create = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Failed to create track');
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const update = async (formData, trackId) => {
  try {
    const response = await fetch(`${API_URL}/${trackId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Failed to update track');
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const remove = async (trackId) => {
  try {
    const response = await fetch(`${API_URL}/${trackId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete track');
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
