export const baseUrl = 'http://localhost:4000';

export const authenticate = async (id) => {
  console.log(id);
  if (id == null) {
    return false;
  }
  const res = await fetch(`${baseUrl}/users/${id}`);
  const resData = await res.json();
  if (resData && resData.hasOwnProperty('data')) {
    return resData.data.length > 0;
  }
  return false;
}