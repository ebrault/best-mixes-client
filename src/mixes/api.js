import apiUrl from '../apiConfig.js'

export const handleErrors = res => {
  if (res.ok) {
    return res
  } else  {
    throw new Error('Recieved status in 400 or 500 range.')
  }
}

export const showMix = (user, mixId) => {
  return fetch(apiUrl + '/mixes/' + `${mixId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createMix = (mix, user) => {
  return fetch(apiUrl + '/mixes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    },
    body: JSON.stringify({
      mix
    })
  })
}

export const updateMix = (mix, mixId, user) => {
  return fetch(apiUrl + '/mixes' + `${mixId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    },
    body: JSON.stringify({
      mix
    })
  })
}

export const deleteMix = (mixId, user) => {
  return fetch(apiUrl + '/mixes' + `${mixId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token token=${user.token}`
    }
  })
}
