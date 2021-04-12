const serverURL = "http://localhost:5000";

export const fetchData = async (route, method, body) => {
  const config = {
    method: method,
    headers: { "Content-Type": "application/json" }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let response = await fetch(serverURL + route, config);

  if (response.ok) {
    return response.json();
  }
  
  throw new Error(response.status + " " + response.statusText);
}
