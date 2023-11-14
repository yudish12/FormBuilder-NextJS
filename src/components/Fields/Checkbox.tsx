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
import { Checkbox } from "../ui/checkbox";
import { toast } from "react-toastify";

const type: ElementsType = "Checkbox";

const extraAttributes = {
  label: "Checkbox Field",
  helperText: "Helper text",
  required: false,
};

export const CheckboxFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Checkbox Field",
      helperText: "Helper Text",
      required: false,
    },
  }),
  
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
  designerBtnElement: {
    icon: "/Checkbox.svg",
    label: "Checkbox",
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
      <div className="flex items-center gap-2" >
        <Label>{element.extraAttributes?.label}
        {element.extraAttributes.required && "*"}</Label>
      <Checkbox
        disabled
      />
      </div>
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
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string|boolean;
}) {
  const element = elementInstance as CustomInstance;

  const [   value, setValue] = useState<string|boolean>(defaultValue || false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2" >
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Checkbox
        className={cn(error && "border-red-500")}
        placeholder={placeHolder}
        onCheckedChange={(e) => setValue(e)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = CheckboxFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        checked={value?true:false}
      />
      </div>
      {helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>}
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
    toast.success("Form Values Updated Save it Now!!")
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
