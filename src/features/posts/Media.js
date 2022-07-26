import React, {useState} from "react"

export const Media = ({media, mediaType}) => {
    
    //Some posts show a gallery of images. This keeps track of the displayed image index so we can navigate to next or previous image.
    const [galleryIndex, setGalleryIndex] = useState(0)
    
    if (mediaType === 'gallery') {
        //display previous gallery image
        function handleOnClickLeft(){
            setGalleryIndex(i=>{
                i===0 ? i = media.length-1 : i--
                return i
            })
        }

        //display next gallery image
        function handleOnClickRight(){
            setGalleryIndex(i=>{
                i===media.length-1 ? i = 0 : i++
                return i
            })
        }

        return (
            <div className="gallery">
                <img src={media[galleryIndex]} className="media" alt="" />
                {galleryIndex>0 &&
                <div className="left circle">
                    <img src={require("../../images/leftArrow.png")} className='left arrow' alt="" onClick={handleOnClickLeft}/>
                </div>
                }
                {galleryIndex<media.length-1 &&
                <div className="right circle">
                    <img src={require("../../images/rightArrow.png")} className='right arrow' alt="" onClick={handleOnClickRight}/>    
                </div>
                }
            </div>
        ) 

    } else if (mediaType === 'gif' || mediaType === 'jpg' || mediaType === 'png') {
        return (
            <img src={media[0]} className="media" alt=""/>
        )

    } else if (mediaType === 'video') {
        return (
            <video className="media" autoPlay={true} muted="" data-reactid=".0.1.0.0" controls>
            <source type="video/mp4" data-reactid=".0.1.0.0.0" src={media[0]} />
            </video>
        )

    } else {  //mediaType unknown
        return (
            <div></div>
        )
    }
}