export enum MODULE {
    LOGIN = 'LOGIN',
    USER = "USER",
    UPLOAD = "UPLOAD",
    CLASS ="CLASS"
}

// interface IApiUrl {
//     Key : {}
//     GetAll ?: string,
//     Create ?: string,
//     Update ? : string,
//     GetById ?: string
//     DeleteMulti ? : string,
// }
export class ServiceUrl {

    public static APIURL: any = {
        'LOGIN': {
            Update: 'users/login'
        },
        "USER": {
            GetAll: 'users/show',
            Create: 'users/create',
            Update: 'users',
            Delete: 'users',
            GetById: 'users/detail'
        },
        "UPLOAD": {
            Update: 'upload'
        },
        "CLASS": {
            GetAll: 'class/show',
            Create: 'class/create',
            Update: 'class/update',
            Delete: 'class',
            GetById: 'class/detail'
        }
    }
}
