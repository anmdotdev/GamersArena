import axios from 'axios';

const rootUrl = 'https://react-burger-38c78.firebaseio.com'; // eslint-disable-line

var request = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

const getPath = (path, params, isAbsolute) => `${isAbsolute ? '' : rootUrl}${path}`;

export const getRequest = async (path, params, isAbsolute = false) => {
    return request.get(getPath(path, params, isAbsolute));
};

export const postRequest = async (path, payload, isAbsolute = false) => {
    return request.post(getPath(path, null, isAbsolute), payload);
};

export const putRequest = async (path, payload, isAbsolute = false) => {
    return request.put(getPath(path, null, isAbsolute), payload);
};

export const patchRequest = async (path, payload, isAbsolute = false) => {
    return request.patch(getPath(path, null, isAbsolute), payload);
};

export const deleteRequest = async (path, payload, isAbsolute = false) => {
    return request.delete(getPath(path, null, isAbsolute), payload);
};
