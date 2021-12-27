import axios from 'axios';
import {useFormik} from 'formik';
import {useParams} from "react-router-dom";


function CreateComment(props) {
  const {pid} = useParams()
  const PostURL = "http://localhost:8080/comments/" + pid.toString()
  

  const formik = useFormik(
    {
      initialValues:{
        body:''
      },
      onSubmit:values=>{
        axios.post(PostURL,{
          "createdBy":props.uid,
          "description":values.body,
          "pid":parseInt(pid)
        }).catch(err=>console.log(err))
      }
    }
  )
  
    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h1>Add a new Comment</h1>
          <div>
          <label>Content:</label>
          <input required type='text' id='body' name='body' onChange={formik.handleChange} value={formik.values.body}/>
          </div>
          <button>Submit</button>
          </form>


      </div>
    );
  }

  export default CreateComment;