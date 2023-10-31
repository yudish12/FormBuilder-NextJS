import React from 'react'
import DesignerSideBar from './DesignerSideBar'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

const Designer = () => {
  const droppable = useDroppable({
    id:"droppable-container",
    data:{
      isDesignerDrop:true,
    }
  })
  return (
    <div className='flex w-full h-full' > 
        <div className='p-4 w-full'>
            <div ref={droppable.setNodeRef} className={cn('bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',droppable.isOver && "ring-2 ring-primary/20")} >
            {!droppable.isOver && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop here</p>
          )}

          {droppable.isOver  && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
            </div>
        </div>
        <DesignerSideBar/>
    </div>
  )
}

export default Designer