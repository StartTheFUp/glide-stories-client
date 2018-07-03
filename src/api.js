export const getSipsMiniature = () => {
  return fetch(`http://localhost:5000/preview`)
    .then(sips => sips.json())
    // .then(actions.loadSips)
}

export const updateSipOrder = (order, id) => {
  return fetch(`http://localhost:5000/sips/${id}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order })
  })
    .then(res => res.json())
}
