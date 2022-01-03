import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useParams } from "react-router-dom"; 
import {useState,useEffect} from 'react';


function EditComment(props) {
  
  const {cid} = useParams()
  
  
  const[CommentDetails,setPost] = useState(null) 
  const URL = "http://localhost:8080/comments/searchbycid/" + cid


  
  useEffect(()=>
  axios.get(URL).then(res=>{setPost(res.data)}).catch(err=>console.log(err))
  ,[]
  )
  
  const updatePost= (values=>axios.put(URL,{
    "description":values.description
  }).catch(err=>console.log(err)))
  
  if(CommentDetails === null ){
    return (
      <p>The comment does not exist</p>
    )
  }

  if(props.uid!=CommentDetails.createdBy){
    return (
      <p>You are not the author of the post</p>
    )
  }
  
  return (
    <div>
      <h1>Edit Post</h1>
      <Formik enableReinitialize initialValues={{
        "description":CommentDetails.description
      }
      } onSubmit={updatePost} >
        {({values,handleChange,handleSubmit})=>(
          <form onSubmit={handleSubmit}>


          <div>
          <label>Content:</label>
          <input required type='text' id='description' name='description' onChange={handleChange} value={values.description}/>
          </div>
          
          <button>Submit</button>
          </form>
        )}
      </Formik>
    </div>
  )
  
  

   
  }

  export default EditComment;
