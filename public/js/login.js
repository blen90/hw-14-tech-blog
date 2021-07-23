const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  console.log(userName)
    if (userName && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
  
      if (response.ok) {
        document.location.replace('/dashboard'); //  FIX THIS!!!
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  