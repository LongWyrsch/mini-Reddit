import { lightTheme, darkTheme } from "./themes"

export const Loading = ({theme}) => {

    return (
        <div className='loading-box'>
            <div style={theme==='light'?lightTheme:darkTheme}>
                <strong>Loading... </strong> 
            </div>
        </div>
    )
}