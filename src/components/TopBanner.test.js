import { TopBanner } from "./TopBanner";
import App from '../app/App';

import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import store from '../app/store'

test('should change the theme', () => {
  //render the Filters
  render(
    <Provider store={store}>
      {/* <Router> */}
        <App />
      {/* </Router> */}
    </Provider>
  )

  //grab the theme button
  let themeButton = screen.queryByText('dark')
  if (themeButton===null) {
    themeButton = screen.queryByText('light')
  }

  const desiredTheme = themeButton.style.backgroundColor
  console.log(desiredTheme)
  userEvent.click(themeButton)

  const appBody = screen.queryByRole('body')
  console.log(appBody.style.backgroundColor)
  const appliedTheme = appBody.style.backgroundColor

  expect(appliedTheme).toBe(desiredTheme)

})