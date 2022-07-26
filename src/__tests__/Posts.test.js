import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Provider } from "react-redux"
import App from "../app/App"
import store from "../app/store"

import {rest} from 'msw'
import {setupServer} from 'msw/node'

//Setup mock server response
const mockedResponsePosts = require('./mock/mockResponsePosts.json')
const mockedResponsePostDetails = require('./mock/mockResponsePostDetails.json')

const server = setupServer(
  //loading JSON with posts info
  //Will match any of the below REST fetch
  //https://www.reddit.com/rising/
  //https://www.reddit.com/new/
  //https://www.reddit.com/top/
  //https://www.reddit.com/r/popular.json?geo_filter=GLOBAL'
  //https://www.reddit.com/search/
  rest.get(/.+\/www\.reddit\.com\/(rising|new|top|r\/popular|search).+/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponsePosts))
  }),
  //loading comments based on post's permalink
  //Will match a url fetch when clicking on a post. Ex: https://www.reddit.com/r/betterCallSaul/comments/w876c4/better_call_saul_s06e10_nippy_postepisode/
  rest.get('https://www.reddit.com/r/BestofRedditorUpdates/comments/vp8fb8/my_29f_husband_31m_got_a_paternity_test_on_our/.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponsePostDetails)) 
  })
)

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('Loads post details and comments',  () => {
    test('Clicking on post shows its comments', async () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )

        //Check that posts appear on screen
        const postTitle = await screen.findByTestId('postTitle-0', undefined, {timeout: 5000})
        expect(postTitle).toBeInTheDocument()
        await waitFor(() => {
            expect(postTitle).toHaveTextContent('This JSON has been mocked.')
        }, {timeout:5000})

        //Click on the first post to bring up comments
        userEvent.click(postTitle)
        
        //Check that comments are displayed
        const comment = await screen.findByTestId('comment-0' , undefined, {timeout:5000})
        expect(comment).toBeInTheDocument()
        expect(comment).toHaveTextContent('This is a mocked comment.')
        
        //Check that replies are displayed
        const reply  = await screen.findByTestId('reply-0-0', undefined, {timeout:5000})
        expect(comment).toBeInTheDocument()
        expect(reply).toHaveTextContent('This is a mocked reply.')

    })
})