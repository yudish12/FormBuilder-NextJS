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
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { toast } from "react-toastify";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  space: 20,
};

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      space: 20,
    },
  }),

  validate: () => true,
  designerBtnElement: {
    icon: "/Spacerfield.svg",
    label: "Spacer Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  properties: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

export type formDataType = {
  space: number;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <div className="flex text-slate-800 flex-col justify-center items-center gap-2 w-full">
      <Label className="flex gap-4 text-2xl font-semibold" >{"Spacer Field"}
      <Image alt="asda" width={30} height={30} src={"/Spacerfield.svg"} />
      </Label>
      <p className="truncate text-lg font-medium font-Inter">{element.extraAttributes.space+"px"}</p>
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
  console.log(element)
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        style={{ width: "100%",height:`${element.extraAttributes.space}px` }}
        
      ></div>
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

  const [formData, setFormData] = useState<formDataType>({
    space: element.extraAttributes.space,
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyChanges = (e: any) => {
    e.preventDefault();
    updateElement(element.id, { ...element, extraAttributes: formData });
    toast.success("Form Values Updated Save it Now!!")
  };

  return (
    <form onSubmit={applyChanges} className="flex flex-col gap-3">
      <div>
        <Label>Height (px):{formData.space}</Label>
        <br />
        <div className="slider">
          <input
            name="space"
            type="range"
            min="0"
            max="200"
            onChange={handleChange}
            value={formData.space}
          />
        </div>

        <p
          id=":r18:-form-item-description"
          className="text-[0.8rem] my-2 text-muted-foreground"
        >
          The label of the field. <br /> It will be displayed above the field
        </p>
      </div>

      <Button type="submit">Update</Button>
    </form>
  );
}
