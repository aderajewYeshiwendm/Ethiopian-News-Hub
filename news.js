class News {
    constructor(newsId, title, news, source, date) {
      this.newsId = newsId;
      this.title = title;
      this.news = news;
      this.source = source;
      this.date = date;
    }
  
    getNewsId() {
      return this.newsId;
    }
  
    getTitle() {
      return this.title;
    }
  
    getContent() {
      return this.news;
    }
  
    getSource() {
      return this.source;
    }
  
    getDate() {
      return this.date;
    }
  }
  
  // Example Usage
  const newsInstance = new News(1, 'Breaking News', 'Lorem ipsum...', 'News Source', new Date());
  
  console.log(newsInstance.getNewsId()); // 1
  console.log(newsInstance.getTitle()); // Breaking News
  console.log(newsInstance.getContent()); // Lorem ipsum...
  console.log(newsInstance.getSource()); // News Source
  console.log(newsInstance.getDate()); // Current date and time
  