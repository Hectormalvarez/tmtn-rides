export const getUser = () => {
  const auth = JSON.parse(window.localStorage.getItem("rides.auth"));
  if (auth) {
    // eslint-disable-next-line no-unused-vars
    const [_header, payload, _signature] = auth.access.split(".");
    const decoded = window.atob(payload);
    return JSON.parse(decoded);
  }
  return undefined;
};

export const isDriver = () => {
    const user = getUser();
    return user && user.group === "driver";
}

export const isRider = () => {
    const user = getUser();
    return user && user.group === "rider";
}