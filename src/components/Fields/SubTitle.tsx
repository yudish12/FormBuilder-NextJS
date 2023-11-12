import React, { useEffect, useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction 
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Slider } from "@radix-ui/react-slider";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useDesigner from "../hooks/useDesigner";
import { cn } from "@/lib/utils";

const type: ElementsType = "SubTitleField";

const extraAttributes = {
  title: "Sub-Title field",
};

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      title: "Sub-Title Field",
    },
  }),
  
  validate: ()=>true,
  designerBtnElement: {
    icon: "/SubTitle.svg",
    label: "SubTitle Field",
  },
  designerComponent: DesignerComponent,
  formComponent:FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type  formDataType = {
  title:string
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
        {"Sub-Title Field"}
      </Label>
      <h2 className="text-xl font-semibold font-Inter" >{element.extraAttributes.title}</h2>
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
  isInvalid,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-xl font-semibold font-Inter" >{element.extraAttributes.title}</h2>
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
    title:element.extraAttributes.title
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
        <Input name="title" value={formData.title} onChange={handleChange} placeholder={element.extraAttributes.title} />
        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The label of the field. <br /> It will be displayed above the field
        </p>
      </div>
     
      <Button type="submit" >Update</Button>
    </form>
  );
}
