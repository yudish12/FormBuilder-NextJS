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
        case "PATCH":
            const content = req.body.content;
            const formUrl = req.body.shareURL;
            const form = await prisma.form.update({
                data: {
                  submissions: {
                    increment: 1,
                  },
                  FormSubmissions: {
                    create: {
                      content,
                    },
                  },
                },
                where: {
                  shareURL: formUrl,
                  published: true,
                },
              });
              res.status(200).json({status:true,message:"Form Created Successfully",data:form});
            break;
    
        default:
            break;
    }
  }

// export async function SubmitForm(formUrl: string, content: string) {
//     return 
//   }