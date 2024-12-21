import secureLocalStorage from "react-secure-storage";

export const accessToken = {
  getAccessToken: function () {
    return secureLocalStorage.getItem("accessToken");
  },
  setAccessToken: function (token) {
    secureLocalStorage.setItem("accessToken", token);
  },
  removeAccessToken: function () {
    secureLocalStorage.removeItem("accessToken");
  },
};

export const userDetails = {
  getUserDetails: function () {
    const user = secureLocalStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  setUserDetails: function (user) {
    secureLocalStorage.setItem("user", JSON.stringify(user));
  },
  removeUserDetails: function () {
    secureLocalStorage.removeItem("user");
  },
};
