import { useState } from 'react';

const SearchByTitle = () => {
  const [title, setTitle] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/news/${title}`);
      if (!response.ok) {
        throw new Error('News not found');
      }
      const data = await response.json();
      setSearchResult(data);
      setError(null);
    } catch (error) {
      setSearchResult(null);
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Enter title..."
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {searchResult && (
        <div>
          <h2>{searchResult.title}</h2>
          <p>{searchResult.article}</p>
          {/* Display other news article details as needed */}
        </div>
      )}
    </div>
  );
};

export default SearchByTitle;
