const api = {
  host: 'http://localhost',
  port: 5000
}

const postJson = (url, content) => {
  return fetch(url, {
    method: 'post',
    headers: {
      'X-Access-Token': localStorage.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(content)
  })
}

export const getAllSips = () => {
  return fetch(`${api.host}:${api.port}/sips`,
    {headers: { 'X-Access-Token': localStorage.token }
    })
    .then(sips => sips.json())
}

export const getSipBySipId = id => {
  return fetch(`${api.host}:${api.port}/sips/${id}`)
    .then(res => res.json())
}

export const createSip = title => {
  console.log({ title })
  return postJson(`${api.host}:${api.port}/sips`, { title })
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

export const sendNewSlide = (params) => { // { type, sipId, url }
  return postJson(`${api.host}:${api.port}/slides`, params)
    .then(res => res.json())
}

export const deleteSlideDB = (params) => {
  return fetch(`${api.host}:${api.port}/slides/${params.type}/${params.id}`, {
    method: 'delete',
    headers: {
      'X-Access-Token': localStorage.token
    }
  })
    .then(res => res.json())
}

export const deleteSipDB = (params) => {
  return fetch(`${api.host}:${api.port}/sips/${params.id}`, {
    method: 'delete',
    headers: {
      'X-Access-Token': localStorage.token
    }
  })
    .then(res => res.json())
}

export const sendNewImage = (slide, body) => {
  return fetch(`${api.host}:${api.port}/slide/${slide.type}/${slide.id}`, {
    method: 'post',
    headers: { 'X-Access-Token': localStorage.token },
    body
  })
    .then(res => res.json())
}

export const sendSignUp = (params) =>
  postJson(`${api.host}:${api.port}/users`, params)
    .then(res => res.json())


export const sendLogin = (params) =>
  postJson(`${api.host}:${api.port}/auth/local`, params)
    .then(res => res.json())
