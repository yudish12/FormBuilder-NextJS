import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveBtn from "./SaveBtn";
import PublishBtn from "./PublishBtn";
import { DndContext, MouseSensor, TouchSensor, useDraggable, useSensor, useSensors } from "@dnd-kit/core";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";

const FormBuilder = ({ form }: { form: Form }) => {
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
  

  const sensors = useSensors(mouseSensor,touchSensor)
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
                <SaveBtn id={form.id} />
                <PublishBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[75vh] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
