import React from 'react'
import './Template.css'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Template() {
    let navigate = useNavigate();
    const createForm = () => {
        const id = uuid()
        
        let question_list = [{questionText:'Question', questionType:'radio', options:[{optionText: 'Option 1'}], open: true, required:false}]
        axios.post(`http://localhost:8000/add_questions/${id}`,{
            'document_name':'untitled_form',
            'doc_desc': 'Add Description',
            'questions': question_list,
        })
        navigate('/form/' + id);
    }

  return (
    <div className='template_body'>
        <button className='add_compettion' onClick={createForm}>
            대회등록
        </button>
    </div>
  )
}

export default Template