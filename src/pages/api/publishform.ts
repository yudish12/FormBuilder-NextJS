import type { NextApiRequest, NextApiResponse } from "next";
import { formSchema, formSchemaType } from "../../../schema/form";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export type ResponseData = {
  status: boolean;
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "PATCH":
      const {content} = req.body
      const queryString = req?.url?.split("?")[1];
      const searchParams = new URLSearchParams(queryString);
      const id = searchParams.get("formid");
      if(!id)return;

      const user = getAuth(req);
      // if(!user){
      //     res.status(401).json({status:false,message:"user not found",data:[]})
      // }

      const userid: string = user?.userId!;
      const form = await prisma.form.update({
        data: {
          published: true,
          content:JSON.stringify(content)
        },
        where: {
            userId: userid,
            id:parseInt(id),
          },
      });

      if (!form) {
        throw new Error("something went wrong");
      }
      res
        .status(200)
        .json({
          status: true,
          message: "Form Published Successfully",
          data: form,
        });
      break;

    default:
      break;
  }
}
