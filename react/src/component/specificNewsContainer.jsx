import News from "./news"

export default function SpecificNewsContainer(props){
    return (
        <>
    <div className="news_continer">

        <div className="the_news_card">
            <div className="the_news">
                <News width="500px" height="300px"  video={props.video}/>
            </div>
            <div className="article">
                <p>{props.article}</p>
            </div>
        </div>
        
</div>
        </>
    )
}