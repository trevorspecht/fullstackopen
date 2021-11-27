import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (personObj) => {
    const request = axios.post(baseUrl, personObj)
    return request.then(response => response.data)
}

const update = (personObj) => {
    const request = axios.put(`${baseUrl}/${personObj.id}`, personObj)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }