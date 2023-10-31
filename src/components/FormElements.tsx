import  { TextFieldFormElement } from "./Fields/TextField";

export type ElementsType = "TextField";

export type FormElementInstance = {
    id:string,
    type:ElementsType,
    extraAttributes?:Record<string,any>;
}

export type FormElement = {
    type:ElementsType,

    construct:(id:string)=>FormElementInstance

    designerBtnElement:{
        icon:string;
        label:string;
    },

    designerComponent:React.FC,//in drag and drop
    formComponent:React.FC, //in preview page
    properties:React.FC //in properties section
}

type FormElementType = {
    [key in ElementsType] :FormElement
}

export const FormElements:FormElementType = {
    TextField:TextFieldFormElement
}