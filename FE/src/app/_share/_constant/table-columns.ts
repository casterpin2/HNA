import { TYPE_COLUMNS } from "@models/constant.model"
import { DataSource } from "@models/shared-component.model"
import { DATA_TAG_CATEGORY } from "./model.constant"


export const SYSTEM_COLUMNS = [
    {
        name: "webname",
        type: TYPE_COLUMNS.TEXT,
        label: "Tên Web",
        order: 1,
        isRequired: false,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },

    {
        name: "fanpage",
        type: TYPE_COLUMNS.TEXT,
        label: "Fan page",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "google",
        type: TYPE_COLUMNS.TEXT,
        label: "Google Maps",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 20000000
    },
    
   
    
    {
        name: "address",
        type: TYPE_COLUMNS.TEXT,
        label: "Địa chỉ",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 20000000
    },
    {
        name: "phone",
        type: TYPE_COLUMNS.TEXT,
        label: "Số điện thoại",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "aboutUs",
        type: TYPE_COLUMNS.TEXT_AREA,
        label: "Thông tin về chúng tôi",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 20000000
    },
]

export const NEWS_CATEGORY = [
    {
        name: "name",
        type: TYPE_COLUMNS.TEXT,
        label: "Tên danh mục",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "tag",
        type: TYPE_COLUMNS.SELECT,
        label: "Tag",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255,
        dataSource:DATA_TAG_CATEGORY
    },
    {
        name: "description",
        type: TYPE_COLUMNS.TEXT_AREA,
        label: "Mô tả",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
]

export const NEWS = [
    {
        name: "title",
        type: TYPE_COLUMNS.TEXT,
        label: "Tiêu đề",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "tag",
        type: TYPE_COLUMNS.TEXT,
        label: "Tag",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "shortDescription",
        type: TYPE_COLUMNS.TEXT_AREA,
        label: "Mô tả ngắn",
        order: 1,
        isRequired: false,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "content",
        type: TYPE_COLUMNS.EDITOR,
        label: "Nội dung",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
]
export const BANNER = [
    {
        name: "name",
        type: TYPE_COLUMNS.TEXT,
        label: "Tiêu đề",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    }
]
export const INFORMATION = [
    {
        name: "name",
        type: TYPE_COLUMNS.TEXT,
        label: "Tiêu đề",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "description",
        type: TYPE_COLUMNS.EDITOR,
        label: "Mô tả",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "status",
        type: TYPE_COLUMNS.SELECT,
        label: "Trạng thái",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255,
        dataSource: [
            { id: "Active", name: "Hiển thị" },
            { id: "Hide", name: "Ẩn" }],
        value: "Active"
    }
]

export const CUSTOMER = [
    {
        name: "customerName",
        type: TYPE_COLUMNS.TEXT,
        label: "Tên khách hàng",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    },
    {
        name: "content",
        type: TYPE_COLUMNS.TEXT_AREA,
        label: "Description SEO",
        order: 1,
        isRequired: true,
        msg: "PERMISSION.MSG",
        maxlength: 255
    }
]