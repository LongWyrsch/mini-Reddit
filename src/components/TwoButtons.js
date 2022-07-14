import { useNavigate } from "react-router-dom"

export default function TwoButtons () {
    const navigate = useNavigate()
    
    function handleMainPageClick () {
        navigate('/')
      }
    function handleFirstPageClick () {
      navigate('/firstpage')
    }
  
    function handleSecondPageClick () {
      navigate('/secondpage')
    }
    
    return(
        <div>
            <button onClick={handleMainPageClick}>main page</button>
            <button onClick={handleFirstPageClick}>firstpage</button>
            <button onClick={handleSecondPageClick}>secondpage</button>
        </div>
    )
}