import { TopBanner } from "../components/TopBanner";
import App from '../app/App';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { render, screen, cleanup, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import store from '../app/store'
import { lightTheme } from "../components/themes";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {rest} from 'msw'
import {setupServer} from 'msw/node'

const mockedResponsePosts = require('./mock/mockResponsePosts.json')

const server = setupServer(
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

    const inputbox = screen.getByPlaceholderText('search')
    userEvent.type(inputbox, 'test')

    const linkElement = screen.getByText('Search');
    userEvent.click(linkElement)

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
  
    //grab the theme button
    let themeButton = screen.queryByText('dark')
    if (themeButton===null) {
      themeButton = screen.queryByText('light')
    }
    
    expect(themeButton).toBeInTheDocument()
    
    const desiredBackground = themeButton.style.backgroundColor
    const desiredColor = themeButton.style.color
    
    userEvent.click(themeButton)
    
    const post = await screen.findByTestId('post0',undefined,{timeout: 5000})
  
    const appliedBackground = post.style.backgroundColor
    const appliedColor = post.style.color
  
    expect(appliedBackground).toBe(desiredBackground)
    expect(appliedColor).toBe(desiredColor)
  
  })
  
})  
