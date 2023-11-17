/* eslint-disable */
import axios from 'axios';
// router eklenmek istenirse bu kısıma import edin.
export default class {

    constructor(settings = {
        errorStatus: [],
        loginUrl: '',
        loginRouterName: 'login',
        bearerToken: false,
        baseUrl: "",
        vueRouter: () => false
    }) {
        this.token = "FAIL";
        this.BASE_URL = settings.baseUrl ? settings.baseUrl : '';
        this.errorStatus = settings.errorStatus ? settings.errorStatus : [] // must be array
        this.loginUrl = settings.loginUrl ? settings.loginUrl : ''
        this.loginRouterName = settings.loginRouterName ? settings.loginRouterName : 'login'
        this.bearerToken = settings.bearerToken ? settings.bearerToken : false;
        this.progressEvent = {
            status: true,
            uploading: false,
            progress: 0,
            total: 0,
            loaded: 0,
        }
    };
    dataMethod(d) {
        if (d === undefined) return
        if (typeof d.append === undefined) return JSON.stringify(d)
        else return d
    }
    async get(url, data, withToken = true) { return await this.request(this.config(url, this.dataMethod(data), withToken, 'get')) }
    async post(url, data, withToken = true) { return await this.request(this.config(url, this.dataMethod(data), withToken,)) }
    async put(url, data, withToken = true) { return await this.request(this.config(url, this.dataMethod(data), withToken, 'put')) }
    async delete(url, data, withToken = true) { return await this.request(this.config(url, this.dataMethod(data), withToken, 'delete')) }
    async login(data) { return await this.request(this.config(this.loginUrl, this.dataMethod(data), false), true) }
    image(data) {
        if (data === undefined || data === null) return '';
        else if (data.includes('blob:')) return data
        else if (data.includes(this.BASE_URL)) return data
        else if (data.includes("base64")) return data
        return this.BASE_URL + data
    };
    request(config) {
        const vm = this
        return axios(config)
            .then(function (response) {
                return { result: 'OK', ...response.data }
            })
            .catch(function (error) {
                const err = JSON.parse(JSON.stringify(error))
                if (vm.errorStatus.includes(err.status)) {
                    //  router.push({ name: vm.loginRouterName })
                }
                return { ...error.response.data.error, result: 'FAIL' }
            });
    }
    config(url, data, withToken = true, method = 'post') {
        const BASE_URL = this.BASE_URL;
        console.log(BASE_URL);
        let header = {
            'Content-Type': 'application/json'
        }
        if (withToken && this.token !== 'FAIL') {
            header = {
                'Content-Type': 'application/json',
                Authorization: `${this.bearerToken ? 'Bearer ' : ''}${this.token}`
            }
        } else if (withToken && this.token === 'FAIL') {
            //  router.push({ name: this.loginRouterName })
        }
        return {
            method,
            url: `${BASE_URL}${url}`,
            headers: header,
            data,
            onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                this.progressEvent = {
                    status: true,
                    uploading: (progressEvent.loaded / progressEvent.total) * 100 === 100 ? false : true,
                    progress,
                    total: progressEvent.total,
                    loaded: progressEvent.loaded
                }

            }
        };
    }
}
/* eslint-enable */
