import type { NextApiRequest, NextApiResponse } from "next";
import { formSchema, formSchemaType } from "../../../schema/form";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

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
      // Access the entire query string
      const queryString = req?.url?.split("?")[1];

      // Parse the query string using URLSearchParams
      const searchParams = new URLSearchParams(queryString);

      // Access individual search parameters
      const id = searchParams.get("formid");
      if(!id)return;

      // if(!user){
      //     res.status(401).json({status:false,message:"user not found",data:[]})
      // }
      const form = await prisma.form.update({
        where: {
          id:parseInt(id),
        },
        data: {
          visits: {increment:1},
        },
      });

      if (!form) {
        throw new Error("something went wrong");
      }
      res
        .status(200)
        .json({
          status: true,
          message: "Form Saved Successfully",
          data: form,
        });
      break;

    default:
      break;
  }
}
