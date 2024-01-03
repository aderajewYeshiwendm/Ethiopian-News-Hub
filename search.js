class Search {
    constructor() {
      this.news = '';
      this.user = '';
      this.userId = 0;
      this.station = '';
      this.stationId = 0;
    }
  
    getNews() {
      return this.news;
    }
  
    getUser() {
      return this.user;
    }
  
    getUserId() {
      return this.userId;
    }
  
    getStation() {
      return this.station;
    }
  
    getStationId() {
      return this.stationId;
    }
  }
  
  // Example Usage
  const searchInstance = new Search();
  
  searchInstance.news = 'Latest Updates';
  searchInstance.user = 'Alice';
  searchInstance.userId = 123;
  searchInstance.station = 'SportsStation';
  searchInstance.stationId = 456;
  
  console.log(searchInstance.getNews()); // Latest Updates
  console.log(searchInstance.getUser()); // Alice
  console.log(searchInstance.getUserId()); // 123
  console.log(searchInstance.getStation()); // SportsStation
  console.log(searchInstance.getStationId()); // 456
  