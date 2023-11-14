import React, { useState } from 'react'
import * as Label from '@radix-ui/react-label';
import { Button } from './ui/button';
import axios from 'axios'
import Image from 'next/image';
import { useRouter } from 'next/router';

const Modal = ({setOpen}:{setOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [formName,setFormName] = useState<string>('');
  const [formDesc,setFormDesc] = useState<string>('');
  const router = useRouter();
  
  const handleCreateForm = async()=>{
    try {
      const resp = await axios.post(`/api/createform`,{
        name:formName,
        description:formDesc
      })
      router.replace('/forms')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form style={{ border: "2px solid #d3d3d3" }} className='flex items-center rounded-md justify-center p-3 w-1/3 mt-2 z-20 absolute top-2 bg-white flex-col gap-2'>
        <div className="heading flex items-start justify-between w-full p-2">
            <div className="headings">
            <h1 className='tracking-tight text-xl  font-semibold' >Create Form</h1>
            <h3 className='text-lg font-normal text-muted-foreground pt-1' > Create a new form to start collecting responses </h3>
            </div>
            <Image onClick={()=>setOpen(false)} className='cursor-pointer' alt='cross' src={'/Cross.svg'} width={20} height={20} />

        </div>
        <div className="w-full p-6">
        <Label.Root className="LabelRoot text-xl font-semibold" htmlFor="formName">
           Form Name
        </Label.Root>
        <input id='formName' value={formName} onChange={(e)=>setFormName(e.target.value)} style={{border:"1px solid #d3d3d3"}} className='w-full mt-3 p-2 rounded-lg' />
       
    </div>
        <div className="w-full flex flex-col p-6">
        <Label.Root className="LabelRoot text-xl font-semibold" htmlFor="description">
           Description
        </Label.Root>
        <textarea value={formDesc} onChange={(e)=>setFormDesc(e.target.value)} style={{border:"1px solid #d3d3d3"}} className='w-full mt-3 p-2 rounded-lg' name="" id="description" cols={30} rows={5}></textarea>
    </div>
    <div className="w-full p-6">
    <Button onClick={handleCreateForm} className='w-full bg-black hover:text-black text-white text-2xl' variant={"secondary"} >
        Save
    </Button>
    
    </div>
    </form>
  )
}

export default Modal