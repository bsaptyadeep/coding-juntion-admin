import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [ data, setData ] = useState({
    subjectCode: "",
    subjectName: "",
    year: "",
    exam: "",
    semester: "",
    branch: "",
  })

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [file, setFile] = useState("")

  const handleChange = ({ currentTarget: input}) => {
    setData({ ...data, [input.name] : input.value})
   // console.log(data)
  }

  const handleChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const submit = async () => {
    try{
      const formData = new FormData();
      formData.append('file', file)
      formData.append('data', JSON.stringify(data))
      const res = await axios.post("https://coding-junction-backend-node-js.vercel.app/api/question-paper", formData)
     // console.log(res)
      setMsg(res);
    }catch(err){
      setError(err)
     // console.log(err)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setError("");
      setMsg("")
    }, 4000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
  

  return (
    <div className="App">
      <h1>Upload Question Paper</h1>
      {
        msg?
        (
          <div className="message">{msg.data}
          </div>
        ):""

      }
      {
        error?
        (
          <div className="error">{error.message}</div>
        ):""
      }
      <Form>
      <Form.Group className="mb-3" controlId="formBasicSubjectCode">
        <Form.Control required name="subjectCode" value={data.subjectCode||""} onChange={handleChange} type="text" placeholder="Enter Subject Code" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSubjectName">
        <Form.Control required name="subjectName" value={data.subjectName||""} onChange={handleChange} type="text" placeholder="Enter Subject Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicYear">
        <Form.Control required name="year" value={data.year||""} onChange={handleChange} type="text" placeholder="Enter Subject Year" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicYear">
      <Form.Select required name="exam" value={data.exam||""} onChange={handleChange} aria-label="Select Exam">
      <option>Select Exam</option>
      <option value="MidSem">MidSem</option>
      <option value="Sem">Sem</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Select required name="semester" value={data.semester} onChange={handleChange} aria-label="Select Exam">
      <option>Select Semester</option>
      <option value="1">1 st</option>
      <option value="2">2 nd</option>
      <option value="3">3 rd</option>
      <option value="4">4 th</option>
      <option value="5">5 th</option>
      <option value="6">6 th</option>
      <option value="7">7 th</option>
      <option value="8">8 th</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Select required name="branch" value={data.branch} onChange={handleChange} aria-label="Select Branch">
      <option>Select Branch</option>
      <option value="CSE">CSE</option>
      <option value="IT">IT</option>
      <option value="ECE">ECE</option>
      <option value="EE">EE</option>
      <option value="CE">CE</option>
      <option value="AEIE">AEIE</option>
      </Form.Select>
      </Form.Group>
      <Form.Control required onChange={handleChangeFile} type="file" placeholder="Select Queston Paper" />
      <Button variant="primary" onClick={submit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;
