const TYPE_COLUMNS = {
    TEXT: "TextBox",
    SELECT: "Select",
    TEXT_AREA: "TextArea",
    EDITOR: "EDITOR",
    TREE_SELECT: "TreeSelect",
    FILE: "Upload",
    DATE: "Date",
    NONE: "None",
    NUMBER: "Number",
    DATE_TIME: "DateTime",
    VIEW: "VIEW",
    CHECKBOX:"CheckBox",
    PASSWORD:"Password"
}
const DATE_FOMAT = "dd-MM-yyyy";
const DATE_TIME_FORMAT = "dd-MM-yyyy HH:mm:ss";
const DEFAULT_IMG = {
    url: '../../../../assets/images/web/unnamed.png',
    urlAvatar: '../../../../assets/images/web/unnamed.png'
};
const STATUS_UNIT = [
    {
        id: "Public",
        name: "Public"
    }, {
        id: "Private",
        name: "Private"
    },
    {
        id: "Testing",
        name: "Testing"
    },
    {
        id: "Waiting",
        name: "Waiting"
    },
    {
        id: "Open",
        name: "Open"
    },
    {
        id: "Refer",
        name: "Tham khảo"
    }
]
const UNITS_TYPE = {
    lesson: "Lesson",
    exam: "Exam",
    excercise: "Exercise"
}
const PRINT_TYE = [
    {
        id: false,
        name: "Không cho phép"
    },
    {
        id: true,
        name: "Cho phép"
    },
]
const MODE = [
    {
        id: "Random",
        name: "Ngẫu nhiên"
    },
    {
        id: "InOrder",
        name: "Theo thứ tự"
    },
    {
        id: "UndoneFirst",
        name: "Câu chưa làm trước"
    },
    {
        id: "WrongFirst",
        name: "Câu sai trước"
    },
]
const TYPE = [
    {
        id: "Default",
        name: "Mặc định"
    },
    {
        id: "Flashcard",
        name: "FlashCard"
    }
]
const YESNO = [
    {
        id: true,
        name: "Có"
    },
    {
        id: false,
        name: "Không"
    }
]
const BALEM_SCORE = [
    {
        id: "Default",
        name: "Mặc định"
    },
    {
        id: "TOEIC",
        name: "TOEIC"
    },
    {
        id: "TOEFL",
        name: "TOEFL"
    },
    {
        id: "TOEFL Diag test",
        name: "TOEFL Diag test"
    },
    {
        id: "SAT",
        name: "SAT"
    },
]
const FILE_TYPE_UPLOAD = {
    sound: "",
    content: ["application/pdf", "image/jpeg", "image/png"],
    img: ['img', 'png'],
    template:["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",'application/vnd.ms-excel']
}
const FLATFORM = [
    {
        id: "Both",
        name: "On the web and mobile"
    },
    {
        id: "Web",
        name: "Web"
    },
    {
        id: "Moble",
        name: "On the mobile"
    }
]
const ROLE = [ 'cc2a9448-d4f0-11ec-9d64-0242ac120002', 'b4cc7d52-d4f0-11ec-9d64-0242ac120002', 'c3d714ba-d4f0-11ec-9d64-0242ac120002', '274be434-d6b9-11ec-9d64-0242ac120002'
]

const HEADER_CLIENT= [
    {
        "id": 1,
        "linkText": "Trang chủ",
        "link": "",
        "child": false
    },
    {
        "id": 2,
        "linkText": "Tổng quan",
        "child": true,
        "submenu": [
            {
                "id": 2.1,
                "link": "/introduce",
                "linkText": "Giới thiệu"
            },
            {
                "id": 2.2,
                "link": "/infrastructure",
                "linkText": "Cơ sở vật chất"
            },
            {
                "id": 2.3,
                "link": "/core_values",
                "linkText": "Giá trị cốt lõi"
            }
        ]
    },
    
    {
        "id": 3,
        "link": "/client-news",
        "linkText": "Tin tức & sự kiện",
        "child": false
        
    },
    {
        "id": 4,
        "link": "/take_cake",
        "linkText": "Dịch vụ chăm sóc"
    },
    {
        "id":5,
        "link": "/admissions",
        "linkText": "Tuyển sinh"
    }
]

export { TYPE_COLUMNS, DATE_FOMAT, DEFAULT_IMG, DATE_TIME_FORMAT, STATUS_UNIT, UNITS_TYPE, PRINT_TYE, MODE, TYPE, FILE_TYPE_UPLOAD, YESNO, BALEM_SCORE, FLATFORM,ROLE,HEADER_CLIENT }