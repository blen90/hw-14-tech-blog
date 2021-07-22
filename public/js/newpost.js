const newpostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    console.log(title)
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content}),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
  
      if (response.ok) {
        document.location.replace('/newpost');
      } else {
        alert('Failed to fetch posts');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', newpostHandler);
  