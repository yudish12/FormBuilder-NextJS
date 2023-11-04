import React from 'react'
import { ElementsType,FormElement, FormElementInstance } from '../FormElements'
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';

const type:ElementsType = "TextField"

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

export const TextFieldFormElement:FormElement = {
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes:{
            label:"Text Field",
            helperText:"Helper Text",
            required:false,
            placeholder:"Value goes here",
        }
    }),
    designerBtnElement:{
        icon:"/Textfield.svg",
        label:"TextField"
    },
    designerComponent:DesignerComponent,
    formComponent:()=><div>Form Component</div>,
    properties:()=><div>Properties Component</div>
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  return (
    <div className='flex text-slate-800 flex-col gap-2 w-full'>
      <Label>
        {element.extraAttributes?.label}
        {element.extraAttributes.required && "*"}
      </Label>
      <Input readOnly disabled placeholder={element.extraAttributes.placeHolder} />
      {element.extraAttributes.helperText && 
        <p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.helperText}</p>
      }
    </div>
  );
}
