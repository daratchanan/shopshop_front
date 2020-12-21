import jwtDecode from 'jwt-decode';

const getToken = () => {
   return localStorage.getItem("ACCESS_TOKEN");
};

const setToken = (token) => {
   localStorage.setItem("ACCESS_TOKEN", token);
};


const clearToken = () => {
   localStorage.clear();
};

const getRole = () => {
   const token = getToken()
   if (token) {
      return "USER";
   };
   return "GUEST";
};

const getUser = () => {
   const token = getToken()
   if (token) {
      return jwtDecode(token);
   };
   return null;
}

export default {
   getToken,
   setToken,
   clearToken,
   getRole,
   getUser
};
