import React, { useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Slider } from "@radix-ui/react-slider";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useDesigner from "../hooks/useDesigner";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper Text",
      required: false,
      placeholder: "Value goes here",
    },
  }),
  designerBtnElement: {
    icon: "/Textfield.svg",
    label: "TextField",
  },
  designerComponent: DesignerComponent,
  formComponent:FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type  formDataType = {
  label:string,
  placeholder:string,
  helperText:string,
  required:boolean
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="flex text-slate-800 flex-col gap-2 w-full">
      <Label>
        {element.extraAttributes?.label}
        {element.extraAttributes.required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        placeholder={element.extraAttributes.placeholder}
      />
      {element.extraAttributes.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {element.extraAttributes.helperText}
        </p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="flex text-slate-800 flex-col gap-2 w-full">
      <Label>
        {element.extraAttributes?.label}
        {element.extraAttributes.required && "*"}
      </Label>
      <Input
        placeholder={element.extraAttributes.placeholder}
      />
      {element.extraAttributes.helperText && (
        <p className="text-muted-foreground text-[0.8rem]">
          {element.extraAttributes.helperText}
        </p>
      )}
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const {updateElement} = useDesigner()

  const [formData,setFormData] = useState<formDataType>({
    label:element.extraAttributes.label,
    placeholder:element.extraAttributes.placeHolder,
    helperText:element.extraAttributes.helperText,
    required:element.extraAttributes.required
  })

  const handleChange = (e:any)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev)=> ({...prev,[name]:value}))
  }

  const applyChanges = (e:any)=>{
    e.preventDefault()
    updateElement(element.id,{...element,extraAttributes:formData})
  }

  return (
    <form onSubmit={applyChanges} className="flex flex-col gap-3" >
      <div>
        <Label>Label</Label>
        <Input name="label" value={formData.label} onChange={handleChange} placeholder={element.extraAttributes.label} />
        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The label of the field. <br /> It will be displayed above the field
        </p>
      </div>
      <div>
        <Label>Placeholder</Label>
        <Input name="placeholder" value={formData.placeholder} onChange={handleChange} placeholder={element.extraAttributes.label} />
        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The Placeholder of the field. <br /> It will be displayed above the field
        </p>
      </div>
      <div>
        <Label  >Helper Text</Label>
        <Input name="helperText" value={formData.helperText} onChange={handleChange} placeholder={element.extraAttributes.label} />
        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The Helper Text of the field. <br /> It will be displayed above the field
        </p>
      </div>
      <div>
      <div className="flex items-center gap-4" >
        <Label>Mark Required</Label>
        <Switch checked={formData.required} name="required" onCheckedChange={(e)=>{
          console.log(e)
          setFormData((prev)=>({...prev,["required"]:e}))}} />
          
      </div>
      <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          Field Will be Marked Required<br /> * will be displayed beside the field
        </p>
      </div>
      <Button type="submit" >Update</Button>
    </form>
  );
}
