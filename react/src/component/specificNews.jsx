// import React from "react"
import SpecificNewsContainer from "./specificNewsContainer"
export default function SpecificNews({ name, filteredNewsData }){

    return(
        <>
        <main className="main__content">
            <div className="topic">
                
                <h1>Latest News In The {name}</h1> 
            </div>
            <div className="news__video_and_article_container">
            {filteredNewsData.map((news) => (
            <SpecificNewsContainer name={name} key={news._id} id={news._id} article={news.article} video={news.news} />
          ))}
            </div>
            <div className="see_more">
            <button className="sm_btn">
                See More
            </button>
            </div>
            </main>

        </>
    )
}