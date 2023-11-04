import React from 'react'
import DesignerSideBar from './DesignerSideBar'
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { cn, idGenerator } from '@/lib/utils'
import useDesigner from './hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElements'

const Designer = () => {
  const droppable = useDroppable({
    id:"droppable-container",
    data:{
      isDesignerDrop:true,
    }
  })

  const {addElement,elements} = useDesigner()


  useDndMonitor({
    onDragEnd:(event:DragEndEvent)=>{
      const {active,over} = event;
      if(!active || !over)return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
      if(isDesignerBtnElement){
        const type = active.data.current?.type
        const newElement = FormElements[type as ElementsType].construct(idGenerator());
        addElement(0,newElement)
      }

    }
  })

  return (
    <div className='flex w-full h-full' > 
        <div className='p-4 w-full'>
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

  const topHalf = useDroppable({
    id:element.id+"-top",
    data:{
      type:element.type,
      elementId:element.id,
      isBottomHalfDesignerElement:true
    }
  })

  const bottomHalf = useDroppable({
    id:element.id+"-bottom",
    data:{
      type:element.type,
      elementId:element.id,
      isTopHalfDesignerElement:true
    }
  })

  const DesignerElement = FormElements[element.type].designerComponent
  return (<div className='flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none' >
    <DesignerElement elementInstance={element} />
  </div>);
}


export default Designer