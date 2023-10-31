import React from 'react'
import { Skeleton } from './ui/skeleton'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Image from 'next/image'



export const FormCardSkeleton = ()=>{
    return <Skeleton className='border-2 border-primary-/20 h-[190px] w-full' />
}

const FormCard = () => {
    const router = useRouter();

  return (
   <div style={{border:"1px solid #d5cdcd"}} className='flex px-6 py-3 flex-col rounded-xl gap-1' >
    <div className="title flex justify-between">
        <h1 className='font-semibold capitalize text-xl from-neutral-800' >titkle</h1>
        <span className='bg-slate-800 px-2 py-1 text-white font-medium rounded-md' >Published</span>
    </div>
    <div className="stats flex justify-between">
        <span>created at</span>
        <div className="views">
        <span>views</span>
        </div>
    </div>
    <div className="description text-gray-400 font-medium">asdasdzxcasda</div>
    <div className="flex justify-between items-center">
    <button style={{marginTop:"2rem"}} type='button' className='flex rounded-md gap-2 bg-slate-800 p-2 text-white font-medium text-lg justify-center items-center' >
        View Submission <Image src={'/RightArrow.svg'} alt='rightarrow' height={20} width={20}/>
    </button>
    <button style={{marginTop:"2rem"}} type='button' 
    onClick={()=>router.push(`/form/${1}`)} className='flex rounded-md gap-2 bg-[#E0E0E0] p-2 text-black font-medium text-lg justify-center items-center' >
        Edit Form <Image src={'/Edit.svg'} alt='rightarrow' height={20} width={20}/>
    </button>
    </div>
   </div>
  )
}

export default FormCard