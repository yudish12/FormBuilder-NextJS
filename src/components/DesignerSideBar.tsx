import React from "react";
import SideBarElementBtn from "./SideBarElementBtn";
import useDesigner from "./hooks/useDesigner";
import PropertiesForm from "./PropertiesForm";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {selectedElement && <PropertiesForm />}
      {!selectedElement && (
        <div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
           <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
              Input Field elements
            </p>
          <SideBarElementBtn formElement={FormElements.TextField} />
          <SideBarElementBtn formElement={FormElements.NumberField} />
          <SideBarElementBtn formElement={FormElements.TextAreaField} />
          <SideBarElementBtn formElement={FormElements.Checkbox} />
          <SideBarElementBtn formElement={FormElements.SelectField} />
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
            <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
              Layout elements
            </p>
            <SideBarElementBtn formElement={FormElements.TitleField} />
            <SideBarElementBtn formElement={FormElements.ParagraphField} />
            <SideBarElementBtn formElement={FormElements.SubTitleField} />
            <SideBarElementBtn formElement={FormElements.SpacerField} />
            <SideBarElementBtn formElement={FormElements.SeperatorField} />
          </div>
        </div>
      )}
    </aside>
  );
}

export default DesignerSidebar;
