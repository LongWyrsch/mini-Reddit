import { TopBanner } from "../components/TopBanner";
import App from '../app/App';
import { BrowserRouter as Router } from "react-router-dom";
import store from '../app/store'
import { Provider } from "react-redux";

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

//Setup mock server response

const mockedResponsePosts = require('./mock/mockResponsePosts.json')

const server = setupServer(
  //Will match any of the below REST fetch
  //https://www.reddit.com/rising/
  //https://www.reddit.com/new/
  //https://www.reddit.com/top/
  //https://www.reddit.com/r/popular.json?geo_filter=GLOBAL'
  //https://www.reddit.com/search/
  rest.get(/\/www\.reddit\.com\/(rising|new|top|r\/popular|search)/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponsePosts))
  })
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('Top banner functionality',() => {

  test('renders search button', () => {
    render(
      <Provider store={store}>
        <Router>
          <TopBanner />
        </Router>
      </Provider>
      );

    const linkElement = screen.getByText('Search');
    expect(linkElement).toBeInTheDocument();
  });
  
  
  test('user can type into search-box', () => {
    render(
    <Provider store={store}>
      <Router>
        <TopBanner />
      </Router>
    </Provider>
    )
  
    const inputbox = screen.getByPlaceholderText('search')
    userEvent.type(inputbox, 'testing the input-box')
  
    expect(inputbox.value).toBe('testing the input-box')
  
  })

  test('posts update according to search term', async() => {

    render(
    <Provider store={store}>
        <App />
    </Provider>
    )
    
    //Type 'test' in the search box
    const inputbox = screen.getByPlaceholderText('search')
    userEvent.type(inputbox, 'test')

    //Click on the 'search' button
    const linkElement = screen.getByText('Search');
    userEvent.click(linkElement)

    //Check that the title of the first post contains the seach term 'test'
    const firstTitle = await screen.findByTestId('post0',undefined, {timeout: 5000})
    expect(firstTitle).toBeInTheDocument()
    expect(firstTitle).toHaveTextContent(/This JSON has been mocked/i)
  
  })
  
  
  test('check that theme successfully updates upon click', async () => {
    //render the Filters
    render(
      <Provider store={store}>
          <App />
      </Provider>
    )
  
    //Check that the theme button is displayed, regardless whether it show 'light' or 'dark'
    let themeButton = screen.queryByText('dark')
    if (themeButton===null) {
      themeButton = screen.queryByText('light')
    }
    expect(themeButton).toBeInTheDocument()
    
    //Save the background and font color of the theme button
    const desiredBackground = themeButton.style.backgroundColor
    const desiredColor = themeButton.style.color
    
    //Toggle theme button
    userEvent.click(themeButton)
    
    //Wait for page to reload
    const post = await screen.findByTestId('post0',undefined,{timeout: 5000})
  
    //Check that the theme of the first post is the same as the theme button before clicking it.
    const appliedBackground = post.style.backgroundColor
    const appliedColor = post.style.color
    expect(appliedBackground).toBe(desiredBackground)
    expect(appliedColor).toBe(desiredColor)
  
  })
  
})  
