import prisma from '@/lib/prisma';
import React from 'react'
import { Form } from '@prisma/client';
import {DndContext,MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import FormBuilder from '@/components/FormBuilder';

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

const Builder = ({form}:{form:Form}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

        console.log(form)
  return (
    <FormBuilder form={form} />
  )
}

export default Builder