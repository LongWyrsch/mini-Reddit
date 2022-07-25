import { render,screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import App from "../app/App"
import store from "../app/store"


import {rest} from 'msw'
import {setupServer} from 'msw/node'
import userEvent from "@testing-library/user-event"

const mockedResponsePosts = require('./mock/mockResponsePosts.json')
const mockedResponsePostDetails = require('./mock/mockResponsePostDetails.json')

const server = setupServer(
  rest.get(/.+\/www\.reddit\.com\/(rising|new|top|r\/popular|search).+/, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedResponsePosts))
  }),
//   rest.get(/.+\/www\.reddit\.com\/r\/((?![Pp]opular).).+/, (req, res, ctx) => {
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

        //Click on the first post and check that comments and reply are showing
        userEvent.click(postTitle)
        const comment = await screen.findByTestId('comment-0' , undefined, {timeout:5000})
        
        expect(comment).toBeInTheDocument()
        expect(comment).toHaveTextContent('This is a mocked comment.')
        
        const reply  = await screen.findByTestId('reply-0-0', undefined, {timeout:5000})
        expect(comment).toBeInTheDocument()
        expect(reply).toHaveTextContent('This is a mocked reply.')

    })
})