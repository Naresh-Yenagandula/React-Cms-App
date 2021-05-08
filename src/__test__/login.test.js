import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Login from '../components/login';
import { BrowserRouter } from 'react-router-dom'
import { UserContext } from '../App'

describe("Check Login placeholder", () => {
    it('check title', async () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: false, isLoading: false }}>
                    <Login />
                </UserContext.Provider>
            </BrowserRouter>
        )
        await waitFor(() => screen.getByTitle('login'))
        expect(screen.getByTitle('login').innerHTML).toBe('DCX CMS')
    })

    it('check email placeholders', async () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: false, isLoading: false }}>
                    <Login />
                </UserContext.Provider>
            </BrowserRouter>
        )
        await waitFor(() => screen.getAllByPlaceholderText('eg. example@domain.com'))
        expect(screen.getAllByPlaceholderText('eg. example@domain.com')).toBeTruthy()
    })

    it('check password placeholders', async () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: false, isLoading: false }}>
                    <Login />
                </UserContext.Provider>
            </BrowserRouter>
        )
        await waitFor(() => screen.getAllByPlaceholderText('Enter Password'))
        expect(screen.getAllByPlaceholderText('Enter Password')).toBeTruthy()
    })
})

describe("Check input", () => {
    it("check email input", () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: false, isLoading: false }}>
                    <Login />
                </UserContext.Provider>
            </BrowserRouter>
        )
        const input = screen.getByTitle("email")
        fireEvent.change(input, { target: { value: "email@gmail.com" } })
        expect(input.value).toBe("email@gmail.com")
    })

    it("check validation", () => {
        render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin", isAuth: false, isLoading: false }}>
                    <Login />
                </UserContext.Provider>
            </BrowserRouter>
        )
        const inputEmail = screen.getByTitle("email")
        const inputPassword = screen.getByTitle("password")
        fireEvent.change(inputEmail, { target: { value: "asdd" } })
        expect(screen.getByTitle("emailError").innerHTML).toBe("Please enter a valid email")
    })
})
