export const fetchData = async (url) => {
  let data = [];
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (err) {
    console.log(err);
  }
  return data;
};
