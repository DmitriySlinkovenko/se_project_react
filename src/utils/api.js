const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => checkResponse(res));
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then((res) => checkResponse(res));
}

function removeItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then((res) => checkResponse(res));
}

export { getItems, addItem, removeItem, checkResponse };
