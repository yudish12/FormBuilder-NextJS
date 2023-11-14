import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import prisma from '@/lib/prisma';
import { Form, FormSubmissions } from '@prisma/client';
import { Button } from '@/components/ui/button';
import VisitBtn from '@/components/VisitBtn';
import FormCard from '@/components/StatCard';
import { CardData } from '@/data';
import FormLinkShare from '@/components/FormLinkShare';
import { ElementsType, FormElementInstance } from '@/components/FormElements';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { format,formatDistance  } from 'date-fns';

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  console.log(id)
  try {
      const form = await prisma.form.findUnique({
          where: {
            id: Number(id),
          },
          include:{
            FormSubmissions:true
          }
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

type formDetailType = {
  id: number;
    userId: string;
    createdAt: Date;
    published: boolean;
    name: string;
    description: string;
    content: string;
    visits: number;
    submissions: number;
    shareURL: string;
    FormSubmissions:FormSubmissions[]
}

const Component = ({form}:{form:formDetailType}) => {
    const router = useRouter();
    console.log(form)
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
            <FormCard key={e.title} {...e} value={form.submissions} visits={form.visits} />
          ))}
        </div>
        <FormSubmissionTable form={form} />
    </section>
  )
}

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

const FormSubmissionTable = ({form}:{form:formDetailType})=>{
  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "SelectField":
      case "Checkbox":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">Submitted at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell key={column.id} type={column.type} value={row[column.id]} />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(new Date(row.submittedAt), new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}



function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  // switch (type) {
  //   case "DateField":
  //     if (!value) break;
  //     const date = new Date(value);
  //     node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Bad>;
  //     break;
  //   case "CheckboxField":
  //     const checked = value === "true";
  //     node = <Checkbox checked={checked} disabled />;
  //     break;
  // }

  return <TableCell>{node}</TableCell>;
}

export default Component