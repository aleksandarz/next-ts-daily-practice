
export const fetchUser = async () => {
  const  response = await fetch(`https://randomuser.me/api/`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.results[0];
}