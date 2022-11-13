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
    url: 'https://firebasestorage.googleapis.com/v0/b/educ-5445f.appspot.com/o/unnamed.png?alt=media&token=c7c08d0a-6b69-4c02-a766-63d04e26b903',
    urlAvatar: 'https://firebasestorage.googleapis.com/v0/b/educ-5445f.appspot.com/o/unnamed.png?alt=media&token=c7c08d0a-6b69-4c02-a766-63d04e26b903'
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



export { TYPE_COLUMNS, DATE_FOMAT, DEFAULT_IMG, DATE_TIME_FORMAT, STATUS_UNIT, UNITS_TYPE, PRINT_TYE, MODE, TYPE, FILE_TYPE_UPLOAD, YESNO, BALEM_SCORE, FLATFORM,ROLE }