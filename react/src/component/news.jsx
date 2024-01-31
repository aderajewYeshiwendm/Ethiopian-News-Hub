

export default function News(props) {
    return (
        <>
        
                {/* <video width={props.width} height={props.height} controls>
                    <source src= {props.video} type="video/mp4" />
                </video> */}
                <iframe width={props.width} height={props.height} src={props.video}  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                
        </>
    )
}