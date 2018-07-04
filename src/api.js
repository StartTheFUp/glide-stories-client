const api = {
  host: 'http://localhost',
  port: 5000
}

const postJson = (url, content) => {
  return fetch(url , {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  })
}

export const getAllSips = () => {
  return fetch(`${api.host}:${api.port}/sips`)
    .then(sips => sips.json())
}

export const getSipsMiniature = () => {
  return fetch(`${api.host}:${api.port}/preview`)
    .then(sips => sips.json())
}

export const getSipBySipId = id => {
  return fetch(`${api.host}:${api.port}/sips/${id}`)
    .then(res => res.json())
}

export const sendUpdatedSlide = slide => {
  return postJson(`${api.host}:${api.port}/slides/${slide.id}`, slide)
    .then(res => res.json())
}

export const sendUpdatedSipOrder = (order, id) => {
  return postJson(`${api.host}:${api.port}/sips/${id}`, { order })
    .then(res => res.json())
}

export const sendNewSlide = (params) => { //{ type, sipId, url }
  return postJson(`${api.host}:${api.port}/slides`, params)
    .then(res => res.json())
}

export const sendNewImage = (slide, body) => {
  return fetch(`${api.host}:${api.port}/slide/${slide.type}/${slide.id}`, {
    method: 'post',
    body
  })
    .then(res => res.json())
}
