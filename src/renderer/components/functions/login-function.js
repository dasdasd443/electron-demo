import { setTrue, setFalse } from 'renderer/redux/counter/counter';
import { authenticate } from 'renderer/redux/counter/authenticate';
// eslint-disable-next-line import/prefer-default-export
const LoginFunction = (dispatch, history) => {
  let error = 0;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  error = username === '' ? 1 : 0;
  error = password === '' ? 2 : 0;
  if (error === 0) {
    const userList = JSON.parse(localStorage.getItem('users'));
    if (userList !== null) {
      if (userList.some((user) => user.username === username)) {
        userList.forEach((user) => {
          if (user.username === username) {
            if (user.password === password) {
              localStorage.setItem('cur-user', JSON.stringify(user));
            } else if (user.password !== password) {
              error = 4;
            }
          }
        });
      } else {
        error = 3;
      }
    }
  }
  const login = new Promise((resolve, reject) => {
    dispatch(setTrue());
    if (error === 0) {
      setTimeout(() => {
        return resolve(true);
      }, 2000);
    } else {
      setTimeout(() => {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject(error);
      }, 2000);
    }
  });
  login
    .then((res) => {
      dispatch(setFalse());
      dispatch(authenticate());
      history.push('/');
      return res;
    })
    .catch((rej) => {
      dispatch(setFalse());
      return rej;
    });
};

export default LoginFunction;
