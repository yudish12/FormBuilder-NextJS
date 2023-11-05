import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";

import React, { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./SideBarElementBtn";
import { ElementsType, FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";

function DragOverlayWrapper(){
    const [draggedItem,setDraggedItem] = useState<Active|null>()
    const {elements} = useDesigner()

    useDndMonitor({
        onDragStart:(event)=>{
            setDraggedItem(event.active)
        },
        onDragCancel:()=>{
            setDraggedItem(null);
        },
        onDragEnd:()=>{
            setDraggedItem(null)
        },
    })

    let node = <div>Drag Overlay</div>
    const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement
    const isDesginerElement = draggedItem?.data?.current?.isDesignerElement


    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
      }
    
      if(isDesginerElement){
        const elementId = draggedItem.data?.current?.elementId
        const element = elements.find((el)=>el.id===elementId)
        if(!element)node = <div>No Elements Found</div>
        else{
            const DesignerElementComponents = FormElements[element.type].designerComponent
            node =( 
            <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80">
                <DesignerElementComponents elementInstance={element} />
            </div>
            )
        }
      }

    return<DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper;