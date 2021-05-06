import Navbars from '../components/navbar'
import {render } from '@testing-library/react'
import React from 'react'
import { UserContext } from '../App'
import { BrowserRouter } from 'react-router-dom'


it("checkTitleNavbar", () => {
    const { queryByTitle } = render(
        <BrowserRouter>
            <UserContext.Provider value={{ userRole: "Admin" }}>
                <Navbars />
            </UserContext.Provider>
        </BrowserRouter>
    )
    const btn = queryByTitle("brand");
    expect(btn.innerHTML).toBe("DCX CMS");
});


describe("checkNameFromContext",()=>{
    it("onClickLogout", () => {
        const { queryByTitle } = render(
            <BrowserRouter>
                <UserContext.Provider value={{ userRole: "Admin",userName:"naresh"}}>
                    <Navbars />
                </UserContext.Provider>
            </BrowserRouter>
        )
        const userName = queryByTitle("userName")
        expect(userName.innerHTML).toBe("naresh")
    })
})
