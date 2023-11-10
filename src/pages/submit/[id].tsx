
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmit";
import prisma from "@/lib/prisma";
import { Form } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import React,{useEffect} from "react";

export async function getServerSideProps(context: any) {
    const id = context.query.id;
    console.log(id)
    try {
        const form = await prisma.form.findUnique({
            where: {
              shareURL: id,
            },
          })
          console.log(form,19)
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

export default function SubmitPage({
  form
}: {
  form:Form;
}) {
    const router = useRouter();

    const { isSignedIn, user, isLoaded } = useUser();

    useEffect(() => {
      const formVisited = async()=>{
        try {
          const resp = await axios.patch(`/api/visited?formid=${form.id}`)
          console.log(resp)
          return resp;
        } catch (error) {
          console.log(error)
          throw new Error("Something Went Wrong")
        }
        
      }
      if(!isSignedIn){
        formVisited();
      }
      
    }, [form.id, isSignedIn])
 

//   if (!form) {
//     throw new Error("form not found");
//   }
  console.log(form)
  const formContent = JSON.parse(form?.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={router.query.id} content={formContent} />;
}

