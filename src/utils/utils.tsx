import { profileCaption, ordersCaption } from "./constants";

export const setCookie = (name: string, value: any, props?: any) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string) => {
  if (getCookie(name)) {
    document.cookie = name + "= ;expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
};

export const setTokens = (data: any) => {
  console.log("set token", data.accessToken);
  const authToken = data.accessToken.split("Bearer ")[1];
  const refreshToken = data.refreshToken;
  if (authToken) {
    setCookie("token", authToken);
  }
  if (refreshToken) {
    setCookie("refreshToken", refreshToken);
  }
};

export const chooseMenuCaption = (path: string) => {
  switch (path) {
    case "/profile": {
      return profileCaption;
    }
    case "/profile/orders": {
      return ordersCaption;
    }
  }
};

export const formatDate = (date: string) => {
  const [day, time] = Array.from(date.split('.'))[0].split('T');
  return time + ' ' + day;
}
