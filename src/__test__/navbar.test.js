import Navbars from '../components/navbar'
import { queryAllByTitle, render } from '@testing-library/react'
import React from 'react'
import { UserContext } from '../App'
import { BrowserRouter } from 'react-router-dom'


it("checkTitleNavbar", () => {
    const { getByTitle } = render(
        <BrowserRouter>
            <UserContext.Provider value={{ userRole: "Admin" }}>
                <Navbars />
            </UserContext.Provider>
        </BrowserRouter>
    )
    const btn = getByTitle("brand");
    console.log(btn.innerHTML);
    expect(btn.innerHTML).toBe("DCX CMS");
});
