const fs = require('fs');
const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const Excel = require('exceljs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access_Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})





app.post(`/add_questions/:doc_id`, (req, res)=>{
    let docs_data = req.body;
    let name = req.params.doc_id;
    console.log(docs_data)
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`files/${name}.json`, data);
})

app.get('/data/:doc_id',(req,res) => {
    let docId= req.params.doc_id;
    console.log(docId)
    fs.readFile(`files/${docId}.json`, (err, data) => {
        if (err) throw err;
        let ques_data = JSON.parse(data);
        console.log(req.params.doc_id)
        res.send(ques_data);
    })
})

app.get('/get_all_filenames', (req, res) => {
    const directoryPath = path.join(__dirname, '/files')

    fs.readdir(directoryPath, function(err, files){
        if(err){
            return console.log('Unable to scan directory' + err)
        }
        console.log('send')
        res.send(files);
    })
})

app.post('/student_response/:doc_id', (req, res) => {
    let docs_data = req.body;
    console.log(docs_data)
    // let name = req.params.doc_id;
    // let d = new Date();
    // let workbook = new Excel.Workbook()
    // let data = req.body.answer_data;
    // let worksheet = workbook.addWorksheet(`${name}`)

    // worksheet.columns = [{header:'Time Stamp', 'key':'datetime'}, ...docs_data.column]
    // console.log(data)
    // worksheet.columns.forEach(column => {
    //     column.width = column.header.length < 12 ? 12 : column.header.length
    // })

    // worksheet.getRow(1).font = {bold: true}

    // data.forEach((e, index) => {
    //     const rowIndex = index + 2
    //     worksheet.addRow({
    //         d, ...e
    //     })
    // })
    // workbook.xlsx.writeFile(`${name}.xlsx`)
})


app.listen(8000, ()=>{
    console.log('express server is running at port number 8000');
})
