export const Comment = ({comment, commentIndex}) => {

    return (
        <div className="Comment-component" >
            <div className="comment" data-testid={`comment-${commentIndex}`}>
                <strong>{comment.author}</strong>
                <div data-testid='comment'>{comment.comment}</div>
            </div>
            <div className="replies">
                {comment.replies? comment.replies.map((reply, index)=>{
                    return (
                        <div key={index} className='reply' data-testid={`reply-${commentIndex}-${index}`}>
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