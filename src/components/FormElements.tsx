import  { TextFieldFormElement } from "./Fields/TextField";

export type ElementsType = "TextField";

export type FormElementInstance = {
    id:string,
    type:ElementsType,
    extraAttributes?:Record<string,any>;
}

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type:ElementsType,

    construct:(id:string)=>FormElementInstance

    designerBtnElement:{
        icon:string;
        label:string;
    },
    validate:(field:FormElementInstance, actualValue:string)=>boolean
    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
      }>,//in drag and drop
      formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: SubmitFunction;
        isInvalid?: boolean;
        defaultValue?: string;
      }>, //in preview page
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