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
import {toast} from 'react-toastify'
import useDesigner from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Confetti from "react-confetti";
import Link from "next/link";
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";

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
    console.log(elements)
    try {
        const resp = await axios.patch(`/api/updateForm?formid=${form.id}`,{
          body:JSON.stringify(elements)
        })
        if(resp.status===200){
          toast.success("Form Saved Successfully")
          router.replace("/forms")
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
  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;
  if (form.published) {
    return (
      <>
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.success("Link Copied to Clipboard")
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <BiSolidArrowToLeft />
                  Go back home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <BiSolidArrowToRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
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
