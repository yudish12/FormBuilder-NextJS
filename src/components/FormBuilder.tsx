import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveBtn from "./SaveBtn";
import PublishBtn from "./PublishBtn";
import { DndContext, MouseSensor, TouchSensor, useDraggable, useSensor, useSensors } from "@dnd-kit/core";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { useRouter } from 'next/router'
import axios from "axios";
import { toast } from "./ui/use-toast";
import useDesigner from "./hooks/useDesigner";

const FormBuilder = ({ form }: { form: Form }) => {
  const {setElements,elements} = useDesigner()
  const [isReady,setIsReady] = useState<boolean>(false);
  const router = useRouter();

  const mouseSensor = useSensor(MouseSensor,{
    activationConstraint:{
      distance:10
    }
  })

  const touchSensor = useSensor(TouchSensor,{
    activationConstraint:{
      delay:300,
      tolerance:5
    }
  })

  const saveForm = async()=>{

    try {
        const resp = await axios.patch(`/api/updateForm?formid=${form.id}`,{
          body:JSON.stringify(elements)
        })
        if(resp.status===200){
          console.log("dione")
        }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    console.log(form)
    if(!form.content){
      setElements([]);
      return;
    }
    const elements = JSON.parse(form.content);
    setElements(elements)
    setIsReady(true)
  },[form,setElements])

  const sensors = useSensors(mouseSensor,touchSensor)
  
  if(!isReady){
    return (
      <div>Loading....</div>
    )
  }

  return (
    <DndContext sensors={sensors} >
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveBtn clickHandler={saveForm} id={form.id} />
                <PublishBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[85vh] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
