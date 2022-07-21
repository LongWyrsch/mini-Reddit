export const Comment = ({comment}) => {

    return (
        <div className="Comment-component">
            <div className="comment">
                <strong>{comment.author}</strong>
                <div>{comment.comment}</div>
            </div>
            <div className="replies">
                {comment.replies? comment.replies.map((reply, index)=>{
                    return (
                        <div key={index} className='reply'>
                            <hr/>
                            <strong>{reply.author}</strong><br/>
                            {reply.reply}
                        </div>
                    )
                }) : ""}
            </div>
        </div>
    )
}