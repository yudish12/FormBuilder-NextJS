import React from 'react'
import { ElementsType,FormElement } from '../FormElements'

const type:ElementsType = "TextField"

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
    designerComponent:()=><div>Designer</div>,
    formComponent:()=><div>Form Component</div>,
    properties:()=><div>Properties Component</div>
}

const TextField = () => {
  return (
    <div>TextField</div>
  )
}

export default TextField