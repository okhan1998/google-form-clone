import './App.css';
import Mainbody from './components/Mainbody';
import Form from './components/Form'
import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Question_form from './components/Question_form';
import Userform from './components/Userform'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`

const App = () => (
  <React.Fragment>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path = '/form/:id' element={
        <>
        <Form />
        <Question_form />
        </>
        } />

        <Route path = '/response' element={
          <Userform />
        } />

        <Route path = '/' element={<Mainbody />} />
      </Routes>

    </BrowserRouter>
  </React.Fragment>
)

export default App
