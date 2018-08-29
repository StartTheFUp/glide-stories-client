const api = 'http://localhost:5000'

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

export const getAllGlides = () => {
  return fetch(`${api}/glides`,
    {headers: { 'X-Access-Token': localStorage.token }
    })
    .then(glides => glides.json())
}

export const getGlideByGlideId = id => {
  return fetch(`${api}/glides/${id}`)
    .then(res => res.json())
}

export const createGlide = title => {
  return postJson(`${api}/glides`, { title })
    .then(res => res.json())
}

export const sendUpdatedSlide = slide => {
  return postJson(`${api}/slides/${slide.id}`, slide)
    .then(res => res.json())
}

export const sendUpdatedGlideOrder = (order, id) => {
  return postJson(`${api}/glides/${id}`, { order })
    .then(res => res.json())
}

export const sendNewSlide = (params) => { // { type, glideId, url }
  return postJson(`${api}/slides`, params)
    .then(res => res.json())
}

export const deleteSlideDB = (params) => {
  return fetch(`${api}/slides/${params.type}/${params.id}`, {
    method: 'delete',
    headers: {
      'X-Access-Token': localStorage.token
    }
  })
    .then(res => res.json())
}

export const deleteGlideDB = (params) => {
  return fetch(`${api}/glides/${params.id}`, {
    method: 'delete',
    headers: {
      'X-Access-Token': localStorage.token
    }
  })
    .then(res => res.json())
}

export const sendNewImage = (slide, body) => {
  return fetch(`${api}/slide/${slide.type}/${slide.id}`, {
    method: 'post',
    headers: { 'X-Access-Token': localStorage.token },
    body
  })
    .then(res => res.json())
}

export const sendSignUp = (params) =>
  postJson(`${api}/users`, params)
    .then(res => res.json())

export const sendLogin = (params) =>
  postJson(`${api}/auth/local`, params)
    .then(res => res.json())
