const adminFetch = (url, options = {}) => {
  const token = localStorage.getItem('admin-token');
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'admin-token': token,
    },
  });
};

export default adminFetch;
