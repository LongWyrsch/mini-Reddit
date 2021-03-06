import { lightTheme, darkTheme } from "./themes"

export const Loading = ({theme}) => {

    // console.log('Component Loading is rendering')

    return (
        <div className='loading-box' style={theme==='light'?{backgroundColor: '#F6F7F8'}:{backgroundColor:'#1A1A1A'}}>
            <div style={theme==='light'?lightTheme:darkTheme} >
                <img src={require("../images/loading-buffering.gif")} className="loading-gif" alt=""/>
                <strong>Loading... </strong> 
            </div>
        </div>
    )
}
