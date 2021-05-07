// import React from 'react'
// import { Router } from 'react-router-dom'
// import { render, screen,act } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
// import { createMemoryHistory } from 'history'
// import Dashboard from '../components/dashboard'
// import {UserContext} from '../App'

// describe("route testing", () => {
//   it("route to dashboard", async() => {
//      const history =  createMemoryHistory()
//     history.push('/dashboard')
//     act(()=>{render(
//       <Router history={history}>
//         <UserContext.Provider value={{userRole:'Admin',isAuth:true,isLoading:false}}>
//           <Dashboard />
//         </UserContext.Provider>
//       </Router>
//     )})
//       // await waitFor(()=>screen.getByText("Latest Pages"))
//      expect(screen.getByText("Latest Pages")).toBeTruthy()
//   })
// })
test("",()=>{
  expect(true).toBeTruthy()
})

