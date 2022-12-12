import axios from 'axios';

const axi = axios.create({
    baseURL: `http://127.0.0.1:3003`
});

const categoryAPI = {
    getAll: () => axi.get(`/category`),
    create: (formData) => axi.post(`/category`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    update: (id, formData) => axi.put(`/category/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    delete: (id) => axi.delete(`/category/${id}`),

}

const productAPI = {
    getAll: () => axi.get(`/product`),
    create: (formData) => axi.post(`/product`,
        formData,
        {
            headers: {
                'Content-Type': `application/json`
            }
        }),
    update: (id, formData) => axi.put(`/product/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `application/json`
            }
        }),
}

const productDetailAPI = {
    update: (id, formData) => axi.put(`/productDetail/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    create: (formData) => axi.post(`/productDetail`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    delete: (id) => axi.delete(`/productdetail/${id}`),
}

const trademarkAPI = {
    getAll: () => axi.get(`/trademark`),
    create: (formData) => axi.post(`/trademark`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    update: (id, formData) => axi.put(`/trademark/${id}`,
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        }),
    delete: (id) => axi.delete(`/trademark/${id}`),
}

const userAPI = {
    login: (formData) => axi.post(`/user/login`,
        formData,
        {
            headers: {
                'Content-Type': `application/json`
            }
        })
}


export { categoryAPI, productAPI, trademarkAPI, userAPI, productDetailAPI };