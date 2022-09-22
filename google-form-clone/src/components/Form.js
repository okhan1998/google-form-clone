import React from 'react'
import { useNavigate } from 'react-router-dom';
import Question_form from './Question_form';

function Form() {
    let navigate = useNavigate();
    const goingHome = () => {
        navigate('/');
    }


  return (
    <div>
        <button className='questions' onClick={() => {
            console.log('question');
        }}>questions</button>
        <button className='responses' onClick={() => {
            console.log('responses');
        }}>responses</button>
        <button onClick={goingHome}>home</button>
    </div>
  )
}

export default Form