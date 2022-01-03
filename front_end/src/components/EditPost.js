import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useParams } from "react-router-dom"; 
import {useState,useEffect} from 'react';


function EditPost(props) {
  
  const {pid} = useParams()
  
  
  const[PostDetails,setPost] = useState(null) 
  const URL = "http://localhost:8080/posts/" + pid


  
  useEffect(()=>
  axios.get(URL).then(res=>{setPost(res.data)}).catch(err=>console.log(err))
  ,[]
  )
  
  const updatePost= (values=>axios.put(URL,{
    "title":values.title,
    "description":values.description
  }).catch(err=>console.log(err)))
  
  if(PostDetails === null ){
    return (
      <p>The post does not exist</p>
    )
  }

  if(props.uid!=PostDetails.createdBy){
    return (
      <p>You are not the author of the post</p>
    )
  }
  
  return (
    <div>
      <h1>Edit Post</h1>
      <Formik enableReinitialize initialValues={{
        "title":PostDetails.title,
        "description":PostDetails.description
      }
      } onSubmit={updatePost} >
        {({values,handleChange,handleSubmit})=>(
          <form onSubmit={handleSubmit}>
          
          <div>
          <label>Title:</label>
          <input required type='text' id='title' name='title' onChange={handleChange} value={values.title}/>
          </div>
          
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

  export default EditPost;
