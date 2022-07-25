import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import store from "../app/store"
import { Filters } from '../components/Filters'

describe('Filter functionality', () => {

    test('Click on button removes the grey filter', async() => {
        render(
        <Provider store={store}>
            <Router>
                <Filters />
            </Router>
        </Provider>    
        )

        const hotFilter = screen.getByAltText('hotFilter')
        const newFilter = screen.getByAltText('newFilter')
        const topFilter = screen.getByAltText('topFilter')
        const risingFilter = screen.getByAltText('risingFilter')

        expect(hotFilter).toBeInTheDocument()
        expect(newFilter).toBeInTheDocument()
        expect(topFilter).toBeInTheDocument()
        expect(risingFilter).toBeInTheDocument()
        
        const hotLink = screen.getByTestId('hotLink')
        const newLink = screen.getByTestId('newLink')
        const topLink = screen.getByTestId('topLink')
        const risingLink = screen.getByTestId('risingLink')
        
        userEvent.click(hotFilter)
        expect(hotLink.style.filter).toBe('grayscale(0%)')
        expect(newLink.style.filter).toBe('grayscale(100%)')
        expect(topLink.style.filter).toBe('grayscale(100%)')
        expect(risingLink.style.filter).toBe('grayscale(100%)')

        userEvent.click(newFilter)
        expect(hotLink.style.filter).toBe('grayscale(100%)')
        expect(newLink.style.filter).toBe('grayscale(0%)')
        expect(topLink.style.filter).toBe('grayscale(100%)')
        expect(risingLink.style.filter).toBe('grayscale(100%)')

        userEvent.click(topFilter)
        expect(hotLink.style.filter).toBe('grayscale(100%)')
        expect(newLink.style.filter).toBe('grayscale(100%)')
        expect(topLink.style.filter).toBe('grayscale(0%)')
        expect(risingLink.style.filter).toBe('grayscale(100%)')

        userEvent.click(risingFilter)
        expect(hotLink.style.filter).toBe('grayscale(100%)')
        expect(newLink.style.filter).toBe('grayscale(100%)')
        expect(topLink.style.filter).toBe('grayscale(100%)')
        expect(risingLink.style.filter).toBe('grayscale(0%)')
    })

    test('Top filter brings up the selector', () => {
        render (
        <Provider store={store}>
            <Router>
                <Filters />
            </Router>
        </Provider>    
        )

        const topFilter = screen.getByAltText('topFilter')
        userEvent.click(topFilter)
        
        //test that selector is displayed with default option 'Today'
        const timeframeSelector = screen.getByRole('combobox')
        expect(timeframeSelector).toBeInTheDocument()
        expect(timeframeSelector).toHaveValue('Today')

        //test that there are 6 choices
        expect(screen.getAllByRole('option').length).toBe(6)

        //test that user can select different option
        userEvent.selectOptions(timeframeSelector, 'This Month')
        expect(timeframeSelector).toHaveValue('This Month')

    })

})