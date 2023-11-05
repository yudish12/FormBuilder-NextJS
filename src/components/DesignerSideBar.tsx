import React from "react";
import SideBarElementBtn from "./SideBarElementBtn";
import useDesigner from "./hooks/useDesigner";
import PropertiesForm from "./PropertiesForm";
import { FormElements } from "./FormElements";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
        {selectedElement && <PropertiesForm/>}
        {!selectedElement && (
          <>
          Elements
        <SideBarElementBtn formElement={FormElements.TextField} />
        </>
        )}
    </aside>
  );
}

export default DesignerSidebar;
