import type { NextApiRequest, NextApiResponse } from 'next'
import { formSchema, formSchemaType } from "../../../schema/form";;
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { getAuth } from '@clerk/nextjs/server';

export type ResponseData={
    status:boolean,
    message:string,
    data:any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    switch (req.method) {
        case "POST":
            const body = req.body;
            const validation = formSchema.safeParse(body);
            if (!validation.success) {
                throw new Error("form not valid");
            }

            const user =  getAuth(req);
            // if(!user){
            //     res.status(401).json({status:false,message:"user not found",data:[]})
            // }
            
              const { name, description } = body;
            const id:string = user?.userId!;
              const form = await prisma.form.create({
                data: {
                  userId: id,
                  name,
                  description,
                },
              });
            
              if (!form) {
                throw new Error("something went wrong");
              }
              res.status(200).json({status:true,message:"Form Created Successfully",data:form});
            break;
    
        default:
            break;
    }
  }