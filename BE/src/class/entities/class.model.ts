export class ClassModel {
    id!: string;
    name!:string;
    startDate!:number;
    endDate!:string;
    description!:string;
    updateBy!:string;
    studentId!:string;
    teacherId!:string;
  }
  export class ClassInsertModel{
    id!: string;
    name!:string;
    startDate!:number;
    endDate!:string;
    description!:string;
    studentId!:string[];
    teacherId!:string;
    
}