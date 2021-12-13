import Comments from './Comments'
function Post(Props) {
    return (
      <div>
          <h1>This is the Title of the post</h1>
          <p>This is the post</p> 
          <p>This are the likes of the post</p>
          <Comments author='John'/>   
      </div>
    );
  }
  
export default Post;