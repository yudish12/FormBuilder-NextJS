import React from 'react'
import { FormElement } from './FormElements'
import { Button } from './ui/button'
import Image from 'next/image'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

const SideBarElementBtn = ({formElement}:{formElement:FormElement}) => {
  const {icon,label} = formElement.designerBtnElement
  const draggable = useDraggable({
    id:`draggable-btn-${formElement.type}`,
    data:{
      type:formElement.type,
      isDesignerBtnElement:true
    }
  })
  return (
    <Button variant={"outline"} className={cn(
      "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
      draggable.isDragging && "ring-2 ring-primary",
    )} >
      <Image className="h-8 w-8 text-primary cursor-grab" alt='asdasd' src={icon} width={10} height={10} />
      <p className='text-xs' >{label}</p>
    </Button>
  )
}

export default SideBarElementBtn

export function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button variant={"outline"} className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
      <Image className="h-8 w-8 text-primary cursor-grab" alt='asdasd' src={Icon} width={10} height={10} />
      <p className="text-xs">{label}</p>
    </Button>
  );
}