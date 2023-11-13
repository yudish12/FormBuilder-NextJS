import React, { useEffect, useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Slider } from "@radix-ui/react-slider";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import useDesigner from "../hooks/useDesigner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

const type: ElementsType = "SelectField";

const extraAttributes = {
  label: "Select field",
  helperText: "Helper text",
  required: false,
  option: [],
  placeHolder: "Value here...",
};

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Select Field",
      helperText: "Helper Text",
      required: false,
      option: [""],
      placeholder: "Value goes here",
    },
  }),

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }

    return true;
  },
  designerBtnElement: {
    icon: "/Selectfield.svg",
    label: "SelectField",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type formDataType = {
  label: string;
  placeholder: string;
  helperText: string;
  option: string[];
  required: boolean;
};

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
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={element.extraAttributes.placeHolder} />
        </SelectTrigger>
      </Select>
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
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText, option } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn("w-full", error && "border-red-500")}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {option.map((op:string) => (
            <SelectItem key={op} value={op}>
              {op}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
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

  const { updateElement } = useDesigner();
  console.log(element.extraAttributes.option)
  const [options,setOptions] = useState<string[]>([...element.extraAttributes.option]);

  const [formData, setFormData] = useState<formDataType>({
    label: element.extraAttributes.label,
    placeholder: element.extraAttributes.placeHolder,
    helperText: element.extraAttributes.helperText,
    option: element.extraAttributes.option,
    required: element.extraAttributes.required,
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionInputChange = (e:any,index:number)=>{
    setOptions((prev)=>{
      let arr = [...prev];
      arr[index] = e.target.value;
      console.log(arr)
      return arr;
    })
  }

  const applyChanges = (e: any) => {
    e.preventDefault();
    console.log(formData)
    updateElement(element.id, { ...element, extraAttributes: {...formData,option:options} });
    toast.success("Form Values Updated Save it Now!!")
  };

  return (
    <form onSubmit={applyChanges} className="flex flex-col gap-3">
      <div>
        <Label>Label</Label>
        <Input
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder={element.extraAttributes.label}
        />
        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The label of the field. <br /> It will be displayed above the field
        </p>
      </div>
      <div>
        <Label>Placeholder</Label>
        <Input
          name="placeholder"
          value={formData.placeholder}
          onChange={handleChange}
          placeholder={element.extraAttributes.label}
        />
        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The Placeholder of the field. <br /> It will be displayed above the
          field
        </p>
      </div>
      <div>
        <Label>Helper Text</Label>
        <Input
          name="helperText"
          value={formData.helperText}
          onChange={handleChange}
          placeholder={element.extraAttributes.label}
        />
        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The Helper Text of the field. <br /> It will be displayed above the
          field
        </p>
      </div>
      <Separator />
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex justify-between w-full">
          <Label>Options</Label>
          <Button
            variant={"outline"}
            className="gap-2"
            onClick={(e) => {
              e.preventDefault(); // avoid submit
              setOptions((prev)=>[...prev,"new option"]);
            }}
          >
            <AiOutlinePlus />
            Add
          </Button>
        </div>

          {options.map((el,i)=><Input key={i} value={el} onChange={(e)=>handleOptionInputChange(e,i)} />)}
      </div>
      <div>
        <div className="flex items-center gap-4">
          <Label>Mark Required</Label>
          <Switch
            checked={formData.required}
            name="required"
            onCheckedChange={(e) => {
              console.log(e);
              setFormData((prev) => ({ ...prev, ["required"]: e }));
            }}
          />
        </div>

        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          Field Will be Marked Required
          <br /> * will be displayed beside the field
        </p>
      </div>
      <Button type="submit">Update</Button>
    </form>
  );
}
