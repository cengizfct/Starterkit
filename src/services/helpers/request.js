import { capitalizeFirstLetter } from '../../utils/textTransform'

export function JSON_TO_FORM_DATA(form) {
    const fd = new FormData();
    for (const key in form) {
        if (Object.hasOwnProperty.call(form, key)) {
            const element = form[key];
            fd.append(capitalizeFirstLetter(key), element);
        }
    }
    return fd
}



// KULLANIMI;
    //eğer params varsa;
    //    /{url}/:id
    // options = {
    //     params: {
    //         ...
    //     },
    //     query: {
    //         ...
    //     }
    // }

export function GENERATE_URL(url = "", options = { params: {}, query: {} }) {
    // set query for url;
    let q = new URLSearchParams(options.query);
    if (options.query !== {}) q = '?' + q;
    // set params, if there are params.
    let uri = url;
    for (const key in options.params) {
        if (Object.hasOwnProperty.call(options.params, key)) {
            const element = options.params[key];
            uri = uri.replace(`:${key}`, element)
        }
    }
    return `${uri}${q}`;
}
