export const clearAdminSession = () => {
  localStorage.removeItem('admin-token');
  window.location.href = '/admin/login';
};

// fetch with the admin token attached. A rejected token (expired or invalid) ends the session.
const adminFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'admin-token': localStorage.getItem('admin-token'),
    },
  });
  if (response.status === 401 || response.status === 403) clearAdminSession();
  return response;
};

export default adminFetch;
