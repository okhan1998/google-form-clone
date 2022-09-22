import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import { useNavigate } from 'react-router-dom';

import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CloseIcon from '@mui/icons-material/Close';


import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';


import {BsFileText, BsTrash} from 'react-icons/bs'
import {FcRightUp} from 'react-icons/fc'

import './Question_form.css';
import { Typography } from '@mui/material';

function Question_form() {
    let navigate = useNavigate();
    const {id} = useParams();
    const [{}, dispatch] = useStateValue();
    const [questions, setQuestions] = useState(
        [{
            questionText: 'Which is the capital city of karnataka?',
            questionType: 'radio',
            options: [
                {optionText: 'Bengaluru'},
                {optionText: 'Belgavi'},
                {optionText: 'Hubli'},
                {optionText: 'Mandya'}
            ],
            answer: false,
            answerKey: '',
            points: 0,
            open: true,
            required: false,
        }]
    )

    const [documentName, setDocName] = useState('untitled Docoument');
    const [documentDescription, setDocDesc] = useState('Add Description');


    useEffect(() => {
        async function data_adding(){
            let request = await axios.get(`http://localhost:8000/data/${id}`);
            let question_data=request.data.questions;
            console.log(question_data);
            let doc_name = request.data.document_name;
            let doc_descip = request.data.doc_desc;
            console.log(doc_name+' '+doc_descip)
            setDocName(doc_name)
            setDocDesc(doc_descip)
            setQuestions(question_data)
            dispatch({
                type: actionTypes.SET_DOC_NAME,
                doc_name: doc_name
            })

            dispatch({
                type: actionTypes.SET_DOC_DESC,
                doc_desc: doc_descip
            })

            dispatch({
                type: actionTypes.SET_QUESTIONS,
                questions: question_data
            })
        }

        data_adding()
    }, [])

    function changeQuestion(text, i){
        let newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }

    function changeOptionValue(text, i, j){
        let optionsQuestion = [...questions];
        optionsQuestion[i].options[j].optionText = text;

        setQuestions(optionsQuestion);
    }


    function addQuestionType(i, type){
        let qs = [...questions];
        console.log(type)
        qs[i].questionType=type;

        setQuestions(qs);
    }

    function removeOption(i,j){
        let RemoveOptionQuestion = [...questions];
        if(RemoveOptionQuestion[i].options.length > 1){
            RemoveOptionQuestion[i].options.splice(j, 1);
            setQuestions(RemoveOptionQuestion)
            console.log(i+'__'+j)
        }
    }
    function addOption(i) {
        let optionOfQuestion = [...questions];
        if(optionOfQuestion[i].options.length < 5){
            optionOfQuestion[i].options.push({optionText: 'option' + (optionOfQuestion[i].options.length + 1)})
        } else {
            console.log('Max 5 options');
        }
        setQuestions(optionOfQuestion);
    }

    function copyQuestion(i){
        expandCloseAll();
        let qs = [...questions]
        let newQuestion = {...qs[i]}

        setQuestions([...questions, newQuestion])
    }

    function deleteQuestion(i){
        let qs = [...questions];
        if(qs.length > 1){
            qs.splice(i, 1);
        }
        setQuestions(qs)
    }

    function requiredQuestion(i){
        let reqQuestion = [...questions];

        reqQuestion[i].required = !reqQuestion[i].required

        console.log(reqQuestion[i].required+" "+i);
        setQuestions(reqQuestion)
    }

    function addMoreQuestionField(){

        expandCloseAll();
        setQuestions([...questions,
            {questionText: 'Question', questionType: 'radio', options : [{optionText: 'Option 1'}], open: true, required: false}
        ])
    }

    function expandCloseAll(){
        let qs = [...questions];
        for (let j=0; j < qs.length; j++){
            qs[j].open= false;
        }
        setQuestions(qs);
    }

    function handleExpand(i){
        let qs = [...questions];
        for(let j=0; j < qs.length; j++){
            if(i == j){
                qs[i].open = true;
            } else{
                qs[j].open = false;
            }
        }
        setQuestions(qs);
    }

    function setOptionAnswer(ans,qno){
        let Questions = [...questions];

        Questions[qno].answerKey = ans;

        setQuestions(Questions)
        console.log(qno+' '+ans)
    }

    function setOptionPoints(points,qno){
        let Questions = [...questions];

        Questions[qno].points = points;

        setQuestions(Questions)
        console.log(qno+' '+points)
    }

    function doneAnswer(i){
        let answerOfQuestion = [...questions];

        answerOfQuestion[i].answer = !answerOfQuestion[i].answer;

        setQuestions(answerOfQuestion)
    }

    function addAnswer(i){
        let answerOfQuestion=[...questions];

        answerOfQuestion[i].answer = !answerOfQuestion[i].answer;

        setQuestions(answerOfQuestion)
    }



    function commitToDB(){ // 지금 주소에 있는 id를 받아와서 api요청할때, 변수로 넘겨주고싶은데 그게 안됨ㅠ
        dispatch({
            type: actionTypes.SET_QUESTIONS,
            questions: questions
        })
        axios.post(`http://localhost:8000/add_questions/${id}`, {
            'document_name': documentName,
            'doc_desc': documentDescription,
            'questions': questions,
        })
    }
    function navigate_response(){
        navigate('/response');
    }

    function questionsUI(){

        return questions.map((ques,i) => {
            return(
            <Accordion expanded={questions[i].open} onChange={()=>{handleExpand(i)}} className={questions[i].open ? 'add border' : ''}>
                <AccordionSummary
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                    elevation={1} style={{width:'100%'}}
                >
                    { !questions[i].open? (
                         <div className='saved_questions'>
                             <Typography style={{fontSize:'15px',fontWeight:'400',letterSpacing:'.1px',lineHeight:'24px',paddingBottom:'8px'}}>
                                 {i+1}. {questions[i].questionText}
                             </Typography>


                             {ques.options.map((op, j) =>{
                                 return(
                                 <div key={j}>
                                     <div style={{display:'flex'}}>
                                         <FormControlLabel style={{marginLeft:'5px', marginBottom:'5px'}} disabled control={<input type={ques.questionType}
                                         color='primary' style={{marginRight: '3px'}} required={ques.type} />} label={
                                         <Typography stlye={{fontSize: '13px', fontweight: '400', letterSpacing: '.2px', lineHeight:'20px', color: '#202124'}}>
                                             {ques.options[j].optionText}
                                         </Typography>
                                         } />
                                     </div>
                                 </div>
                             )})}
                         </div>
                     ): ''}
                </AccordionSummary>

                <div className='question_boxes'>
                {!questions[i].answer?(
                    <AccordionDetails className='add_question'>
                        <div className='add_question_top'>
                            <input type='text' className='question' placeholder='Question' value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value, i)}}></input>
                            <CropOriginalIcon style={{color:'#5f6367'}} />
                            <Select className='select' style={{color:'#5f6368',fontsize:'13px'}}>
                                <MenuItem id='text' value='Text' onClick={()=>{addQuestionType(i,'text')}}><SubjectIcon style={{marginRight:'10px'}} /> Pargraph</MenuItem>
                                <MenuItem id='checkbox' vlaue='Checkbox' onClick={()=>{addQuestionType(i,'checkbox')}}><CheckBoxIcon stlye={{marginRight:'10px',color:'#79757a'}} checked /> Checkbox</MenuItem>
                                <MenuItem id='radio' value='Radio' onClick={()=>{addQuestionType(i,'radio')}}><Radio style={{marginRight:'10px', color:'#79757a'}} checked  /> Multiple Choice</MenuItem>
                            </Select>
                        </div>
                        {ques.options.map((op, j)=>(
                            <div className='add_question_body' key={j}>
                                {
                                    (ques.questionType!=='text') ?
                                    <input type={ques.questionType} style={{marginRight: '10px'}} /> :
                                    <ShortTextIcon style={{marginRight:'10px'}} />
                                }
                                <div>
                                    <input type='text' className='text_input' placeholder='option' value={ques.options[j].optionText} onChange={(e) =>{changeOptionValue(e.target.value, i, j)}}></input>
                                </div>

                                <CropOriginalIcon style={{color:'#5f6368'}}/>

                                <IconButton aria-label='deltet'>
                                    <CloseIcon onClick={() => {removeOption(i,j)}}/>
                                </IconButton>

                            </div>
                        ))}

                            {ques.options.length < 5 ? (
                                <div className='add_question_body'>
                                    <FormControlLabel disabled control={
                                        (ques.questionType!=='text') ?
                                        <input type={ques.questionType} color='primary' inputProps={{'aria-label' : 'secondary checkbox'}}
                                        style={{marginLeft:'10px',marginRight:'10px'}} disabled/> :
                                        <ShortTextIcon style={{marginRight:'10px'}} /> 
                                    } label={
                                        <div>
                                            <input type='text' className='text_input' style={{fontSize:'13px', width:'60px'}} placeholder='Add other'></input>
                                            <Button size='small' onClick={()=>{addOption(i)}} style={{textTransform: 'none', color:'#4285f4', fontsize:'13px', fontWeight:'600'}}>Add Option</Button>
                                        </div>
                                    } />
                                </div>
                            ):''}








                        <div className='add_footer'>
                            <div className='add_question_bottom_left'>
                                <Button size='small' style={{textTransform: 'none', color:'#4285f4', fontSize:'13px', fontweight:'600'}} onClick={() => {addAnswer(i)}}>
                                    <FcRightUp style={{border:'2px solid #4285f4', padding: '2px', marginRight:'8px'}} /> Answer key
                                </Button>
                            </div>

                            <div className='add_question_bottom'>

                                <IconButton aria-label='copy' onClick={()=>{copyQuestion(i)}}>
                                    <FilterNoneIcon/>
                                </IconButton>

                                <IconButton aria-label='delete' onClick={()=>{deleteQuestion(i)}}>
                                    <BsTrash /> 
                                </IconButton>
                                <span style={{color:'#5f6358',fontSize:'13px'}}>Required</span><Switch name='checkedA' color='primary' onClick={()=>{requiredQuestion(i)}} check={ques.required} />
                                <IconButton>
                                    <MoreVertIcon /> 
                                </IconButton>
                            </div>
                        </div>
                    </AccordionDetails>):(
                    
                    <AccordionDetails className='add_question'>
                        <div className='top_header'>
                            Choose Correct Answer
                        </div>
                        <div className='add_question_top'>
                            <input type='text' className='question' placegolder='Question' value={ques.questionText} disabled></input>
                            <input type='number' className='points' min='0' step='1' placeholder='0' onChange={(e) => {setOptionPoints(e.target.value, i)}} />
                        </div>
                        {ques.options.map((op,j) =>{
                            return(
                            <div className='add_question_body' key={j} style={{marginLeft:'8px', marginBottom:'10px', marginTop:'5px'}}>
                                <div key={j}>
                                    <div style={{display: 'flex'}} className=''>
                                        <div className='form-check'>
                                            
                                            <label style={{fontSize:'13px'}} onClick={()=>{setOptionAnswer(ques.options[j].optionText, i)}}>
                                                {(ques.questionType!=='text') ?
                                                    <input
                                                    type={ques.questionType}
                                                    name={ques.questionText}

                                                    value='option3'
                                                    className='form-check-input'
                                                    required={ques.required}
                                                    style={{marginRight:'10px', marginBottom:'10px', marginTop:'5px'}}
                                                    /> : <ShortTextIcon style ={{marginRight:'10px'}} />}

                                                {ques.options[j].optionText}
                                            </label>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}

                        <div className='add_question_body'>
                            <Button size='small' style={{textTransform: 'none', color:'#4285f4', fontSize:'13px', fontWeight:'600'}}>
                                <BsFileText style={{fontSize:'20px', marginRigth:'8px'}}/>Add Answer Feedback
                            </Button>
                        </div>
                        <div className='add_question_bottom'>
                            <Button variant='outlined' color='primary' style={{textTransform: 'none', color:'#4285f4', fontsize:'12px', marginTop:'12px', fontWeight:'600'}}
                            onClick={()=>{doneAnswer(i)}}>Done</Button>
                        </div>
                    </AccordionDetails>




                    )}

                {!ques.answer ? (<div className='question_edit'>
                        <AddCircleOutlineIcon className='edit' onClick = {addMoreQuestionField}/>
                        <OndemandVideoIcon className='edit'/>
                        <CropOriginalIcon className='edit'/>
                        <TextFieldsIcon className='edit' />
                    </div>) : ''}
                </div>
            </Accordion>
        )})
    }




    // function questionsUI(){
    //     return questions.map((ques,i) => {
    //         return(
    //         <Accordion expanded={ques.open} className={ques[i].open ? 'add border' : ''}>
    //             <AccordionSummary
    //                 aria-controls='panel1a-content'
    //                 id='panel1a-header'
    //                 elevation={1} style={{width:'100%'}}
    //             >
    //                 { questions[i].open? (
    //                     <div className='saved_questions'>
    //                         <Typography style={{fontSize:'15px',fontWeight:'400',letterSpacing:'.1px',lineHeight:'24px',paddingBottom:'8px'}}>
    //                             {i+1}. {questions[i].questionText}
    //                         </Typography>
    //                         {ques.open.map((op, j) =>{
    //                             return(
    //                             <div key={j}>
    //                                 <div style={{display:'flex'}}>
    //                                     <FormControlLabel style={{marginLeft:'5px', marginBottom:'5px'}} disabled control={<input type={ques.questionType}
    //                                     color='primary' style={{marginRight: '3px'}} required={ques.type} />} label={
    //                                     <Typography stlye={{fontSize: '13px', fontweight: '400', letterSpacing: '.2px', lineHeight:'20px', color: '#202124'}}>
    //                                         {ques.options[j].optionText}
    //                                     </Typography>
    //                                     } />
    //                                 </div>
    //                             </div>
    //                         )})}
    //                     </div>
    //                 ): ''}
    //             </AccordionSummary>
    //         </Accordion>
    //     )})
    // }



  return (
    <div className='question_form'>
        <Button variant='contained' color='primary' onClick={navigate_response} style={{fontSize:'14px'}}>response</Button>
        <br/>
        <div className='section'>
            <div className='question_title_section'>
                <div className='question_form_top'>
                    <input type='text' className='question_form_top_name' style={{color:'black'}} placeholder='Untitle document' onChange={(e) => {setDocName(e.target.value)}}></input>
                    <input type='text' className='question_form_top_desc' placeholder='Form description' onChange={(e) => {setDocDesc(e.target.value)}}></input>
                </div>
            </div>


            {questionsUI()}
        </div>
        <Button variant='contained' color='primary' onClick={commitToDB} style={{fontSize:'14px'}}>Save</Button>
    </div>
  )
}

export default Question_form