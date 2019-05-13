const endpoint = 'https://obayomi-banka.herokuapp.com/api/v1';
const signin = document.querySelector('#loginForm');

const email = document.getElementById('email');
const password = document.getElementById('password');
const cssLoader = document.querySelector('.loader');
const errorMsgs = document.querySelector('#errors');
const errorDiv = document.querySelector('.errorDiv');

signin.addEventListener('submit', (e) => {
  e.preventDefault();

  fetch(`${endpoint}/auth/signin`, {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: {
      'Content-type': 'application/json',
    }
  })
    .then(res => res.json())
    .then((res) => {
      if (res.status === 404) {
        console.log('res', res);
        errorDiv.style.display = 'block';
        errorMsgs.innerHTML = res.error;
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
      if (res.status === 200) {
        cssLoader.style.display = 'block';
        setTimeout(() => {
          if (res.data.isadmin === false) {
            window.location = 'user/userAccount.html';
          } else {
            window.location = 'admin/adminDashboard.html';
          }
        }, 3000);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userDetails', JSON.stringify(res.data));
        localStorage.setItem('loggedIn', true);
      }
    })
    .catch((error) => {
      errorDiv.style.display = 'block';
      errorMsgs.innerText = error || 'Connection error, please check your internet connection';
      setTimeout(() => {
        errorDiv.style.display = 'none';
        errorMsgs.innerHTML = '';
      }, 5000);
    });
});
