import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";

import React, { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./SideBarElementBtn";
import { ElementsType, FormElements } from "./FormElements";

function DragOverlayWrapper(){
    const [draggedItem,setDraggedItem] = useState<Active|null>()

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

    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
      }
    

    return<DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper;