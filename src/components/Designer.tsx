import React, { useState } from 'react'
import DesignerSideBar from './DesignerSideBar'
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { cn, idGenerator } from '@/lib/utils'
import {BiSolidTrash} from 'react-icons/bi'
import useDesigner from './hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElements'
import { Button } from './ui/button'

const Designer = () => {
  const droppable = useDroppable({
    id:"droppable-container",
    data:{
      isDesignerDrop:true,
    }
  })

  const {addElement,elements,selectedElement,setSelectedElement,removeElement} = useDesigner()
  

  useDndMonitor({
    onDragEnd:(event:DragEndEvent)=>{
      const {active,over} = event;
      console.log(active,over)
      if(!active || !over)return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
      
      const isDroppingOverBottomHalf = over.data.current?.isBottomHalfDesignerElement
      const isDroppingOverTopHalf = over.data.current?.isTopHalfDesignerElement
      
      const DroppingOverElement = isDroppingOverBottomHalf || isDroppingOverTopHalf;
      
      const droppingSidebarBtnElement = DroppingOverElement && isDesignerBtnElement;


      if(isDesignerBtnElement && !DroppingOverElement){
        console.log("normal")
        const type = active.data.current?.type
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        addElement(0,newElement)
        return;
      }

      
      
      if(droppingSidebarBtnElement){
        console.log(isDroppingOverBottomHalf)
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        const overId = over.data.current?.elementId;

        const overElementIndex = elements.findIndex((e)=>e.id===overId)

        if (overElementIndex === -1) {
          throw new Error("element not found");
        }
        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isDroppingOverBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        console.log(indexForNewElement,overElementIndex)
        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data.current?.isDesginerElement;
      const isDroppingOverDesignerArea = over.data.current?.isDesignerDrop;
      console.log(isDraggingDesignerElement, over.data.current)
      if(isDraggingDesignerElement && isDroppingOverDesignerArea){
        console.log("!23");
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        removeElement(active.data.current?.elementId)
        addElement(elements.length,newElement)
        return;
      }

      const isDroppingDesignerElementOverTopHalf = over.data.current?.isTopHalfDesignerElement;
      const isDroppingDesignerElementOverBottomHalk = over.data.current?.isBottomHalfDesignerElement;
      
      if(isDroppingDesignerElementOverBottomHalk||isDroppingDesignerElementOverTopHalf){
        console.log("asd")
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        const overId = over.data.current?.elementId
        const overElementIndex = elements.findIndex((e)=>e.id===overId)

        if(overElementIndex===-1)throw new Error("No element found")
        let indexForNewElement = overElementIndex
        if(isDroppingDesignerElementOverBottomHalk) indexForNewElement = overElementIndex + 1;
        removeElement(active.data.current?.elementId)
        addElement(indexForNewElement,newElement)
        return;
      }

    }
  })

  return (
    <div  className='flex w-full h-full' > 
        <div  onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }} className='p-4 w-full'>
            <div ref={droppable.setNodeRef} className={cn('bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',droppable.isOver && "ring-2 ring-primary/20")} >
            {!droppable.isOver && elements.length===0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop here</p>
          )}

          {droppable.isOver   && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length>0 && (
            <div className='flex flex-col w-full gap-2 p-4' >
              {elements.map((e)=>(
              <DesignerElementWrapper key={e.id} element={e} />))}
            </div>
          )}
            </div>
        </div>
        <DesignerSideBar/>
    </div>
  )
}


function DesignerElementWrapper({element}:{element:FormElementInstance}){
  // console.log(FormElements[element.type])
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const {removeElement,setSelectedElement} = useDesigner()

  const topHalf = useDroppable({
    id:element.id+"-top",
    data:{
      type:element.type,
      elementId:element.id,
      isTopHalfDesignerElement:true
      
    }
  })

  const bottomHalf = useDroppable({
    id:element.id+"-bottom",
    data:{
      type:element.type,
      elementId:element.id,
      isBottomHalfDesignerElement:true
    }
  })

  const DesignerElement = FormElements[element.type].designerComponent

  const draggable = useDraggable({
    id:element.id+"-drag-handler",
    data:{
      isDesginerElement:true,
      type:element.type,
      elementId:element.id
    }
  })

  if(draggable.isDragging){
    return null;
  }

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(e)=>{
        e.stopPropagation();
        setSelectedElement(element)
      }}
    className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset" onMouseEnter={() => {
      setMouseIsOver(true);
    }}
    onMouseLeave={() => {
      setMouseIsOver(false);
    }} >
      
      <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="absolute w-full bottom-0 h-1/2 rounded-b-md" />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500 z-40"
              variant={"outline"}
              onClick={(e:any) => {
                e.stopPropagation(); // avoid selection of element while deleting
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}
     {topHalf.isOver && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}
      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}
  </div>
  );
}


export default Designer