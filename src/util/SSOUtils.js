const toLogin = () => {
  location.href = `http://api.caojiantao.site:1024/login.html?redirectUrl=${location.href}`;
};

export { toLogin };
