
import { useState,useEffect } from "react";
import NewsCollected from "./newscollected"

export default function NewsContent(){
  const [EthioNewsData , setEthioNewsData] = useState([])
  const [SportNewsData , setSportNewsData] = useState([])
  const [WorldNewsData , setWorldNewsData] = useState([])
  const [EntertainmentNewsData , setEntertainmentNewsData] = useState([])
  const [BNewsData, setBNewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/businessnews');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchRequests();
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3000/news');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEthioNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchNews();
    const fetchWorld= async () => {
      try {
        const response = await fetch('http://localhost:3000/world');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setWorldNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchWorld();
    const fetchEntertainment = async () => {
      try {
        const response = await fetch('http://localhost:3000/entertainmentnews');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEntertainmentNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchEntertainment();
    const fetchSport= async () => {
      try {
        const response = await fetch('http://localhost:3000/sportnews');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSportNewsData(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchSport();
  }, []);
  console.log(EntertainmentNewsData)

    return (
        <>
        <div className="container__body">


        <div className="welcome">
        <div className="heading">
            <h1>Welcome to Ethiopian News Hub</h1>
        </div>
        
        <NewsCollected name="all" NewsData= {EthioNewsData}/>
        
        </div>

        <div className="news">
          <div className="heading">
            <h1>News</h1>
          </div>
          <NewsCollected name="news" NewsData={WorldNewsData}/>
          </div>
        
        <div className="sport">
          <div className="heading">
            <h1>Sport</h1>
          </div>
          <NewsCollected name="sport" NewsData={SportNewsData}/>
          </div>

        <div className="business">
          <div className="heading">
            <h1>Business</h1>
          </div>
          <NewsCollected name="business" NewsData={BNewsData}/>
          </div>

        <div className="entertainment">
            <div className="heading">
            <h1>Entertainment</h1>
            </div>
            <NewsCollected name="entertainment" NewsData={EntertainmentNewsData}/>
        </div>

    </div>

        </>
    )
}