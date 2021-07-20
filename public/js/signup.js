const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#username-signup').value.trim();
    console.log(userName)
    const password = document.querySelector('#password-signup').value.trim();
  
    if (userName && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);