const endpoint = 'https://obayomi-banka.herokuapp.com/api/v1';
const signup = document.querySelector('#loginForm');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cssLoader = document.querySelector('.loader');
const errorMsgs = document.querySelector('#errors');
const errorDiv = document.querySelector('.errorDiv');

signup.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(`${endpoint}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 409) {
        errorDiv.style.display = 'block';
        errorMsgs.innerHTML = 'Account already exists!';
        return setTimeout(() => {
          errorDiv.style.display = 'none';
          errorMsgs.innerHTML = '';
        }, 5000);
      }
      if (res.error) {
        const resErr = res.error;
        errorDiv.style.display = 'block';
        resErr.forEach((err) => {
          errorMsgs.innerText = err;
        });
        setTimeout(() => {
          errorDiv.style.display = 'none';
          errorMsgs.innerHTML = '';
        }, 5000);
      }
      if (res.status === 201) {
        cssLoader.style.display = 'block';
        setTimeout(() => {
          window.location = 'user/userAccount.html ';
        }, 3000);
        localStorage.setItem('token', res.data[0].token);
        localStorage.setItem('userDetails', JSON.stringify(res.data[0]));
        localStorage.setItem('loggedIn', true);
      }
    })
    .catch((error) => {
      errorMsgs.innerText = error || 'Connection error, please check your internet connection';
      setTimeout(() => {
        errorDiv.style.display = 'none';
        errorMsgs.innerHTML = '';
      }, 5000);
    });
});
