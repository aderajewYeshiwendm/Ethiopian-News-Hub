class Host {
    constructor(hostId, hostName, password, forgetPassword = '', content = '') {
      this.hostId = hostId;
      this.hostName = hostName;
      this.password = password;
      this.forgetPassword = forgetPassword;
      this.content = content;
    }
    getHostId() {
      return this.hostId;
    }
  
    getHostName() {
      return this.hostName;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    postContent(content) {
      this.content = content;
      return `Content posted successfully by ${this.hostName}`;
    }
  }
  
  // Example Usage
  const host = new Host(1, 'JohnDoe', 'password123');
  
  console.log(host.getHostId()); // 1
  console.log(host.getHostName()); // JohnDoe
  console.log(host.password); // password123
  
  host.setPassword('newPassword456');
  console.log(host.password); // newPassword456
  const postResult = host.postContent('This is a sample content.');
  console.log(postResult); // Content posted successfully by JohnDoe
  console.log(host.content); // This is a sample content.
  