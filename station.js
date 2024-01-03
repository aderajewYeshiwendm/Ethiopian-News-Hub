class NewsSegment {
    constructor(segmentId, segmentName, segmentContent) {
      this.segmentId = segmentId;
      this.segmentName = segmentName;
      this.segmentContent = segmentContent;
    }
  
    getSegmentId() {
      return this.segmentId;
    }
  
    getSegmentName() {
      return this.segmentName;
    }
  
    getSegmentContent() {
      return this.segmentContent;
    }
  }
  
  class NewsStation {
    constructor(stationId, stationName, socialMediaLinks = new Map(), newsSegments = []) {
      this.stationId = stationId;
      this.stationName = stationName;
      this.socialMediaLinks = socialMediaLinks;
      this.newsSegments = newsSegments;
    }
  
    getStationId() {
      return this.stationId;
    }
  
    getStationName() {
      return this.stationName;
    }
  
    getSocialMediaLinks() {
      return this.socialMediaLinks;
    }
  
    addNewsSegment(segment) {
      this.newsSegments.push(segment);
    }
  
    removeNewsSegment(segment) {
      const index = this.newsSegments.indexOf(segment);
      if (index !== -1) {
        this.newsSegments.splice(index, 1);
      }
    }
  }
  
  // Example Usage
  const newsSegment1 = new NewsSegment(1, 'Politics', 'Political news segment content...');
  const newsSegment2 = new NewsSegment(2, 'Sports', 'Sports news segment content...');
  
  const newsStation = new NewsStation(1, 'NewsHub', new Map([['Twitter', '@NewsHub'], ['Facebook', 'NewsHub']]), [newsSegment1, newsSegment2]);
  
  console.log(newsStation.getStationId()); // 1
  console.log(newsStation.getStationName()); // NewsHub
  console.log(newsStation.getSocialMediaLinks()); // Map { 'Twitter' => '@NewsHub', 'Facebook' => 'NewsHub' }
  
  const newSegment3 = new NewsSegment(3, 'Technology', 'Tech news segment content...');
  newsStation.addNewsSegment(newSegment3);
  console.log(newsStation.newsSegments); // [newsSegment1, newsSegment2, newsSegment3]
  
  newsStation.removeNewsSegment(newsSegment2);
  console.log(newsStation.newsSegments); // [newsSegment1, newsSegment3]
  