import React, {useState, useEffect} from 'react'
import Template from './Template'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { width } from '@mui/system';

function Mainbody() {
    const [files, setFiles] = useState([]);
    let navigate = useNavigate();

    function navigate_to(docname){
        let fname=docname.split('.')
        navigate('/form/'+fname[0])
    }

    useEffect(() => {
        async function filenames(){
            let request = await axios.get('http://localhost:8000/get_all_filenames')
            let filenames = request.data;
            console.log(filenames)
            setFiles(filenames);
        }
    
        filenames()
      }, []);
    

  return (
    <div>
        <Template />
        <div className='mainbody_docs' style={{width:'50%', margin:'auto'}}>
            {
                files.map((ele) => {
                    return(
                    <div className='doc_card' style={{height: '100px', marginBottom: '50px', border:'10px solid blue', backgroundColor:'yellow', cursor:'pointer'}} onClick={() => {
                        navigate_to(ele)
                    }}>
                        <div className='dov_card_content'>
                            <h5 style={{overFlow:'ellipsis'}}>{ele ? ele : 'Untitled Doc'}</h5>
                                <div className='doc_content' stlye={{fontSize:'12px', color:'grey'}}>
                                </div>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    </div>
    
  )
}

export default Mainbody