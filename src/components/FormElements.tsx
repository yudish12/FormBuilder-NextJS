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

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
      }>,//in drag and drop
    formComponent:React.FC<{elementInstance:FormElementInstance}>, //in preview page
    properties:React.FC<{
        elementInstance: FormElementInstance;
      }> //in properties section
}

export type FormElementType = {
    [key in ElementsType] :FormElement
}

export const FormElements:FormElementType = {
    TextField:TextFieldFormElement
}