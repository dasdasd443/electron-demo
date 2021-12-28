import { v4 as uuidv4 } from 'uuid';
import { setTrue, setFalse } from 'renderer/redux/counter/counter';

const RegisterFunction = (
  dispatch,
  history,
  username,
  password,
  firstName,
  lastName
) => {
  let userList = JSON.parse(localStorage.getItem('users'));
  userList = userList === null ? [] : userList;
  const user = {
    id: uuidv4(),
    username,
    password,
    firstName,
    lastName,
  };
  if (
    user.username !== '' &&
    user.password !== '' &&
    user.firstName !== '' &&
    user.lastName !== ''
  ) {
    dispatch(setTrue());
    userList.push(user);
    localStorage.setItem('users', JSON.stringify(userList));
    localStorage.setItem('cur-user', JSON.stringify(user));
    const error = 0;
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
        history.push('/');
        return res;
      })
      .catch((rej) => {
        dispatch(setFalse());
        return rej;
      });
  }
};

export default RegisterFunction;
