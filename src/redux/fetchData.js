const serverURL = "http://localhost:5000";

export const fetchData = async (route, method, body) => {
  const config = {
    method: method,
    headers: { "Content-Type": "application/json" }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data;
  try {
    const response = await fetch(serverURL + route, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}
