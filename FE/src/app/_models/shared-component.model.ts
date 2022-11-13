export interface TRadioDataSourceModel {
    disabled?: boolean;
    label?: string;
    value?: string;
}


export interface TSidebarDatePickerOptionsModel{

}

export interface SubGroupDatePickerSourceModel {
    label?: string;
    value?: any;
}
export interface GroupDatePickerSourceModel{
    label: string;
    subGroup: SubGroupDatePickerSourceModel[]
}
export interface TSidebarDatePickerSourceModel {
    allTimeGroup?: GroupDatePickerSourceModel[];
}
export interface IMenuItem {
    id?: number | string;
    title?: string;
    icon?: string;
    routerLink?: string;
    isShow: boolean;
    children?: Array<IMenuItem>;
    childItem?: Array<IMenuItem>;
    permissions? : Array<string>;
    code?: string    
}
import { Injectable } from "@angular/core";
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";


export interface ControlDynamic {
    name: string;
    type: string;
    label: string;
    dataSource?: DataSource[];
    value?: any;
    order?: number;
    expandKey?: any[];
    nodes?: TreeSelectObject[];
    placeHolder?: string;
    msg?: string;
    isRequired?: boolean;
    maxlength?: number;
    min?: any,
    max?: any,
    format?: string;
}
export interface DataSource {
    id: any;
    name: string;
    checked?:boolean
}
export interface TreeSelectObject {
    title: string,
    key: any;
    children?: [];
    isLeaf: boolean;
}
export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
}
export class RequestCatergory {
    id?: string;
    name: string;
    slug: string;
    description: string;
    priority: number;
    status: string;
    icon: string;
    domain: string;
    seoTitle: string;
    seoDescription: string;
    seo301: string;
    seoRobot: string;
    privitoryCourse?: any[];
    language? : string
}
export class RequestProduct {
    id?: string;
    name: string;
    shortDescription: string;
    description: string;
    status: string;
    price: number;
    discountPrice: number;
    icon: string;
    priority: number;
    publicationDate: any;
    seoTitle: string;
    seoDescription: string;
    seo301: string;
    seoRobot: string;
}

export interface TreeNode {
    id: string;
    title?: string;
    children: TreeNode[];
    isExpanded?: boolean;
    isShowBtn?: boolean;
    type?: string;
    rootId?: string;
    level?: number;
    priority?: number;
    status?: string;
    isUpdated?: boolean;
    lesson?: any;
    exam?: any;
    excercise?: any;
    startTime?: Date;
    endTime?: Date;
    description?: string;
    courseEmail? :any;
}
export interface DropInfo {
    targetId: string;
    action?: string;
}

export var demoData: TreeNode[] = [
    {
        id: 'item 1',
        children: [],
        level: 1,
    },
    {
        id: 'item 2',
        level: 1,
        children: [
            {
                id: 'item 2.1',
                level: 2,
                children: []
            },
            {
                id: 'item 2.2',
                level: 2,
                children: []
            },
            {
                id: 'item 2.3',
                level: 2,
                children: [
                    {
                        level: 3,
                        id: 'item 3.4',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 'item 3',
        level: 1,
        children: []
    }
]
@Injectable()
export class CourseData {
    id: string;
    public setId(id: string) {
        return this.id = id;
    }
    public getId() {
        return this.id;
    }
}
export class QuestionItem {
    title?: string;
    type?: string;
    answers?: any[];
    group?: any;
    id?: string;
    tags?: any[];
    isClick?: boolean = false;
    avatar?: string;
    level?: string;
    point?: number;
    priority?: number;
    name?:string;
    numberScore? :number;
    isValid?:boolean;
    smallQuestion? :string;
    bigQuestion?:string;
    reverse? :any;
    additional?: Object;
    gameType?:string;
    explaination?:string;
    soundUrl?: string;
    videoUrl?: string;
    pictureUrl?: string;
    hint?:string;
    shuffleAnswer?:boolean;
    children?:any;
    examQuestionId?:string;
    subType?:string;
}

export class ValuesSystem{
    name:string;
    herf?:boolean;
    nameChild?:string;
    type?:string
}

export class LiveStreamModel{
    id?:string;
    quetionNo:number;
    quetionTitle:string;
    playTime : string;
    second?:number;
    minutes?:number;
    displayQuestion?:string;
    timeSecond?:number;
}
export class NodeMenuItem{
    id?:string;
    title:string;
    url:string;
    children:any[];
}
export interface IBitem {
    title : string,
    routerLink?: string
}
export interface IBreakCrumb {
    header?: string;
    bItem? : Array<IBitem>
}