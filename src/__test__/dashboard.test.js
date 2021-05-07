import React from 'react';
import { render, waitFor, screen,act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Dashboard from '../components/dashboard';
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from '../App'

describe("check Dashboard Data", () => {
    it('load Dashboard data', async () => {
        act(()=>{render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: true, isLoading: false }}>
                    <Dashboard />
                </UserContext.Provider>
            </BrowserRouter>
        )})
        await waitFor(() => screen.getByText('Page Nine'))
        expect(screen.getByText('Page Nine')).toBeTruthy()
    })
})
