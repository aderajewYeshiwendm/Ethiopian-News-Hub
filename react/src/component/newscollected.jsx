import News from "./news"


export default function NewsCollected({name,NewsData}){
    
   console.log(NewsData)
   
    return(
        <>
        <div className="video_content">
            <div className="videos_container">
             {NewsData.map((news) => (
            <div className="large_video" key={news.id}>
            <News name={name} key={news._id} id={news._id} article={news.article} video={news.news} />
            </div>
             ))}
            </div>
            </div>
            

          

        
        </>
    )
}