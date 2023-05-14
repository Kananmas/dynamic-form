import { IField } from "../Interfaces/field.interface";

export class Field implements IField {
    name:string;
    type: string;
    value: any;
    required: boolean;

    constructor(name:string='',type:string='',value:any,required:boolean=false) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.required = required;
    }
}