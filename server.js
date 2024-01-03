class Server {
    constructor() {
      this.news = '';
      this.user = '';
      this.host = '';
      this.station = '';
    }
  
    getNews() {
      return this.news;
    }
  
    getUser() {
      return this.user;
    }
  
    getHost() {
      return this.host;
    }
  
    getStation() {
      return this.station;
    }
  }
  
  // Example Usage
  const serverInstance = new Server();
  
  serverInstance.news = 'Breaking News!';
  serverInstance.user = 'JohnDoe';
  serverInstance.host = 'NewsHubServer';
  serverInstance.station = 'TechStation';
  
  console.log(serverInstance.getNews()); // Breaking News!
  console.log(serverInstance.getUser()); // JohnDoe
  console.log(serverInstance.getHost()); // NewsHubServer
  console.log(serverInstance.getStation()); // TechStation
  