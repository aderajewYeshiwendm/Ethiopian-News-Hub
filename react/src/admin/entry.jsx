import { useState } from "react"

export default function Entry(){
    const [postNews , setPostNews] = useState({
        news:"",
        article:"",
        title:"",
        source:""
        

    })
    const handleChange = (e) =>{
        setPostNews(prev=>{
            return {
              ...prev,
              [e.target.name] : e.target.value
            }
          })
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/${postNews.category}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(postNews)
            });
      
            if (!response.ok) {
              throw new Error("Failed to submit post");
            }
           console.log(postNews)
            alert("post submitted successfully!"); // Optional: Show a success message
            setPostNews({
                news: "",
                article: "",
                title: "",
                source: "",
                category: ""
              });
          } catch (error) {
            console.error("Error submitting pst:", error.message);
            alert("Failed to submit post. Please try again later."); // Optional: Show an error message
          }
        
        
        // const notificationResponse = await fetch("http://localhost:3000/notify-users", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //       title: postNews.title,
        //       category: postNews.category
        //     })
        //   });
    
        //   if (!notificationResponse.ok) {
        //     throw new Error("Failed to send notifications");
        //   }
        // }
    }
    return (
        <>
        <div className="admin_page">
<div className="news_artice_entry" onSubmit={handleSubmit}>
    <h2 className="news_entry_title">Ethiopian News Hub</h2>
    <form className="article_entry_form">
        <div className="article">
            <label className="article_text" for="title-text">Title:</label>
            <textarea className="article_textarea" id="title-text" name="title" value={postNews.title} onChange={handleChange} required></textarea>
            <label className="article_text" for="source-text">Source:</label>
            <textarea className="article_textarea" id="source-text" name="source" value={postNews.source} onChange={handleChange} required></textarea>
            <label className="article_text" for="article-text">Article :</label>
            <textarea className="article_textarea" id="article-text" name="article" value={postNews.article} onChange={handleChange} required></textarea>
        </div>
        <div className="article_options">
            <label>Category:</label>
            <div className="article_radio_btn">
                <input type="radio" id="category-business" name="category" value="businessnews" onChange={handleChange} required/>
                <label for="category-business">Business</label>
                <input type="radio" id="category-world" name="category" value="world" onChange={handleChange} required/>
                <label for="category-world">World</label>
                <input type="radio" id="category-entertainment" name="category" value="entertainmentnews" onChange={handleChange} required/>
                <label for="category-entertainment">Entertainment</label>
                <input type="radio" id="category-ethiopian-news" name="category" value="news" onChange={handleChange} required/>
                <label for="category-ethiopian-news">Ethiopian News</label>
                <input type="radio" id="category-sports" name="category" value="sportnews" onChange={handleChange} required/>
                <label for="category-sports">Sports</label> 
            </div>
        </div>
        <div className="article_link_entry">
            <label for="article-link">Article Link:</label>
            <input className="link_entry" type="url" id="article-link" name="news" value={postNews.news} onChange={handleChange} required/>
        </div>
        <div className="submit_article">
            <button className="submit_btn" type="submit">Submit Article</button>
        </div>
    </form>
</div>
</div>
        </>
    )
}