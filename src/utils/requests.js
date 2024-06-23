import axios from 'axios';

async function post(url, data) {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data', error);
        throw error;
    }
}

async function post_formdata(url, data) {
    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error posting data', error);
        throw error;
    }
}

async function get(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting data', error);
        throw error;
    }
}

export { post, post_formdata, get };
