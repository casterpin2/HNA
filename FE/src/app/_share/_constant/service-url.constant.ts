export enum MODULE {
    LOGIN = 'LOGIN',
    USER = "USER",
    UPLOAD = "UPLOAD",
    CLASS = "CLASS",
    ARTIClE_CATEGORY = "ArticleCategory",
    ARITCLE = "ARTICLE",
    BANNER = "BANNER",
    COURSE_HOMEPAGE = "COURSE_HOMEPAGE",
    INFORMATION = "INFORMATION",
    SETTING = "SETTING"
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
            GetAll: 'users',
            Create: 'users',
            Update: 'users',
            Delete: 'users',
            GetById: 'users'
        },
        "UPLOAD": {
            Update: 'upload'
        },
        "CLASS": {
            GetAll: 'class',
            Create: 'class',
            Update: 'class',
            Delete: 'class',
            GetById: 'class'
        }, "ArticleCategory": {
            GetAll: "ArticleCategory",
            Create: "ArticleCategory",
            Update: "ArticleCategory",
            GetById: 'ArticleCategory'
        },
        "ARTICLE": {
            GetAll: "Article",
            Create: "Article",
            Update: "Article",
            GetById: 'Article'
        },
        "ARTICLE_ORDER": {
            Create: "Article/displayOrder",

        },
        "BANNER": {
            GetAll: "Banner",
            Create: "Banner",
            Update: "Banner",
            GetById: 'Banner'
        },
        "BANNER_ORDER": {
            Create: "Article/displayOrder",
        },
        "COURSE_HOMEPAGE": {
            GetAll: "courses/on-homepage"
        },
        "INFORMATION": {
            GetAll: "Information",
            Create: "Information",
            Update: "Information",
            GetById: 'Information',
            Delete: "Information"
        },
        "SETTING": {
            Update: "Setting",
            GetById: 'Setting',
        }
    }
}
