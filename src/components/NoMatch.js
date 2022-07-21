import { selectTheme } from "../features/theme/themeSlice"
import { useSelector } from "react-redux"


export const NoMatch = () => {

    console.log('Component NoMatch rendered')

    const theme = useSelector(selectTheme)

    return (
        <div className="NoMatch-component" style={theme==='light'?{color: 'black'}:{color: 'white'}}>
            Page not found!
        </div>
    )
}