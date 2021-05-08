import React from 'react';
import { render, waitFor, screen,act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Category from '../components/category';
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from '../App'
describe("check Category Data", () => {
    it('load category data', async () => {
        act(()=>{render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: true, isLoading: false }}>
                    <Category/>
                </UserContext.Provider>
            </BrowserRouter>
        )})

        await waitFor(() => screen.getByText('Category 2'))

        expect(screen.getByText('Category 2')).toBeTruthy()

    })

})