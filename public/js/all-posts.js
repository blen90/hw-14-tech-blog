const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();
  
    if(title && post_content){
      const response = await fetch('/api/posts', {
        method: 'POST',
        content: JSON.stringify({title, post_content}),
        headers: {'Content-Type': 'application/json'}
      });
  
      if(response.ok){
        document.location.replace('/home');
      }else{
        alert('No created post');
      }
    }
  };
  
  // const deleteBtnHandler = async (event) => {
  //   if(event.target.hasAttribute('data-id')){
  //     const id = event.target.getAttribute('data-id');
  
  //     const response = await fetch(`/api/posts/${id}`, {
  //       method: 'DELETE'
  //     });
  
  //     if(response.ok){
  //       document.location.replace('/all-posts');
  //     }else{
  //       alert('No deleted post');
  //     }
  //   }
  // };
  
  document.querySelector('#new-post-form').addEventListener('submit', newPostHandler);
  
  // document.querySelector('#post-list').addEventListener('click', deleteBtnHandler);
