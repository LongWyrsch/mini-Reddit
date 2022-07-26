import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import store from "../app/store"
import { Filters } from '../components/Filters'

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe('Filter functionality', () => {

    test('Click on button removes the grey filter', async() => {
        render(
        <Provider store={store}>
            <Router>
                <Filters />
            </Router>
        </Provider>    
        )

        //Check all filter images are loaded.
        const hotFilter = screen.getByAltText('hotFilter')
        const newFilter = screen.getByAltText('newFilter')
        const topFilter = screen.getByAltText('topFilter')
        const risingFilter = screen.getByAltText('risingFilter')

        expect(hotFilter).toBeInTheDocument()
        expect(newFilter).toBeInTheDocument()
        expect(topFilter).toBeInTheDocument()
        expect(risingFilter).toBeInTheDocument()
        
        //Check that clicking each filter turns it blue while other remain grey.
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
        
        //Click on "Top" filter to bring timeframe options.
        const topFilter = screen.getByAltText('topFilter')
        userEvent.click(topFilter)
        
        //test that selector is displayed with default option 'Today'
        const timeframeSelector = screen.getByRole('combobox')
        expect(timeframeSelector).toBeInTheDocument()
        expect(timeframeSelector).toHaveValue('Today')

        //test that there are 6 choices
        expect(screen.getAllByRole('option').length).toBe(6)

        //test that user can select each option
        userEvent.selectOptions(timeframeSelector, 'Now')
        expect(timeframeSelector).toHaveValue('Now')
        userEvent.selectOptions(timeframeSelector, 'This Week')
        expect(timeframeSelector).toHaveValue('This Week')
        userEvent.selectOptions(timeframeSelector, 'This Month')
        expect(timeframeSelector).toHaveValue('This Month')
        userEvent.selectOptions(timeframeSelector, 'This Year')
        expect(timeframeSelector).toHaveValue('This Year')
        userEvent.selectOptions(timeframeSelector, 'All Time')
        expect(timeframeSelector).toHaveValue('All Time')

    })

})