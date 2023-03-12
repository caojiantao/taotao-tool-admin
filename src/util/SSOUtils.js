const toLogin = () => {
  location.href = `http://api.caojiantao.site:38080/login.html?redirectUrl=${location.href}`;
};

export { toLogin };
