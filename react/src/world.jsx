import { useState, useEffect } from "react";
import SpecificNews from "./component/specificNews";

const WorldNews = () => {
  const [filteredNewsData, setFilteredNewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/world');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFilteredNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchRequests();
  }, []);
  console.log(filteredNewsData)

  return (
    <>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <SpecificNews name="World News" filteredNewsData={filteredNewsData} />
      )}
    </>
  );
};

export default WorldNews;
