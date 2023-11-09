import React from 'react'
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma';
import { Form } from '@prisma/client';
import { Button } from '@/components/ui/button';
import VisitBtn from '@/components/VisitBtn';
import FormCard from '@/components/StatCard';
import { CardData } from '@/data';
import FormLinkShare from '@/components/FormLinkShare';

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log(id)
  try {
      const form = await prisma.form.findUnique({
          where: {
            id: Number(id),
          },
        })
        if(form){
          return {
              props:{
                  form:JSON.parse(JSON.stringify(form))
              }
          }
        }else{
          return {
              props:{
                  form:{}
              }
          }
        }
  } catch (error) {
      console.log(error)
      return {
          props:{
              form:{}
          }
      }
  }
  

}

const Component = ({form}:{form:Form}) => {
    const router = useRouter();
    return (
    <section className='w-full p-16' >
      <div className="title pb-4 border-b border-muted flex justify-between item-center">
        <h1 className='text-5xl font-bold' >{form.name}</h1>
        <VisitBtn shareUrl={form.shareURL} />
      </div>
      <div className="py-8 border-b w-full border-muted">
        <div className="w-full flex items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="grid pt-12 lg:grid-cols-4 lg:grid-rows-1 md:grid-cols-2 md:grid-rows-2 grid-cols-1 gap-y-6 gap-x-8 place-items-center w-full">
          {CardData.map((e) => (
            <FormCard key={e.title} {...e} value={form.submissions} />
          ))}
        </div>

    </section>
  )
}

export default Component