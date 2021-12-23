import axios from 'axios';
import {useFormik} from 'formik';


function CreatePost(props) {
  const PostURL = "http://localhost:8080/posts"

  const formik = useFormik(
    {
      initialValues:{
        title:'',
        body:''

      },
      onSubmit:values=>{
        axios.post("http://localhost:8080/posts",{
          "createdBy":props.id,
          "title":values.title,
          "description":values.body
        }).catch(err=>console.log(err))
      }
    }
  )
  
    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h1>Add a new Post</h1>
          <div>
          <label>Title:</label>
          <input required type='text' id='title' name='title' onChange={formik.handleChange} value={formik.values.title}/>
          </div>
          <div>
          <label>Content:</label>
          <input required type='text' id='body' name='body' onChange={formik.handleChange} value={formik.values.body}/>
          </div>
          
          <button>Submit</button>
          </form>


      </div>
    );
  }

  export default CreatePost;