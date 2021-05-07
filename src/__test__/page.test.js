import React from 'react';
import { render, waitFor, screen,act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Page from '../components/page';
// import {rest} from 'msw'
// import {setupServer} from 'msw/node';
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from '../App'

// const server = setupServer(
//     rest.get('http://localhost:8081/api/pages/', (req, res, ctx) => {
//       return res(ctx.json({ title:"Page three",category:'Category',author:'author 1' }))
//     })
//   )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())
describe("check Page Data", () => {
    it('load page data', async () => {
        act(()=>{render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: true, isLoading: false }}>
                    <Page />
                </UserContext.Provider>
            </BrowserRouter>
        )})

        await waitFor(() => screen.getByText('Page three'))

        expect(screen.getByText('Page three')).toBeTruthy()

    })

})
