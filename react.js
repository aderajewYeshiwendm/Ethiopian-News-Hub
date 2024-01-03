class React {
    constructor() {
      this.newsLiked = false;
      this.newsComment = '';
      this.newsShareCount = 0;
      this.stationLiked = false;
      this.stationComment = '';
      this.stationShareCount = 0;
    }
  
    likeNews() {
      this.newsLiked = true;
      return true;
    }
  
    commentNews(comment) {
      this.newsComment = comment;
      return `Commented on news: ${comment}`;
    }
  
    shareNews() {
      this.newsShareCount++;
      return this.newsShareCount;
    }
  
    likeStation() {
      this.stationLiked = true;
      return true;
    }
  
    commentStation(comment) {
      this.stationComment = comment;
      return `Commented on station: ${comment}`;
    }
  
    shareStation() {
      this.stationShareCount++;
      return this.stationShareCount;
    }
  }
  
  // Example Usage
  const reactInstance = new React();
  
  console.log(reactInstance.likeNews()); // true
  console.log(reactInstance.commentNews('Great news!')); // Commented on news: Great news!
  console.log(reactInstance.shareNews()); // 1
  
  console.log(reactInstance.likeStation()); // true
  console.log(reactInstance.commentStation('Awesome station!')); // Commented on station: Awesome station!
  console.log(reactInstance.shareStation()); // 1
  