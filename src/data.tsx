import { ReactNode } from "react"
// import { EyeOpenIcon } from "../public/EyeOpen.svg"
import { IconProps } from "@radix-ui/react-icons/dist/types"

export type FormCardData = {
    title:string,
    value:number,
    Icon:string,
    subHeading:string,
    shadowColor:string,
}

export type formType = {form:{
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
}} | null

export const CardData:FormCardData[] = [
    {
        title:"Total visits",
        value:0,
        subHeading:'All time form visits',
        Icon:"EyeOpen",
        shadowColor:"blue",
    },
    {
        title:"Total submissions",
        value:0,
        subHeading:'All time form Submissions',
        Icon:"Reader",
        shadowColor:"yellow",
    },
    {
        title:"Submission Rate",
        value:0,
        subHeading:'View Rate in Submission rate',
        Icon:"CursorArrow",
        shadowColor:"green"
    },
    {
        title:"Bounce Rate",
        value:0,
        subHeading:'Visits that leaves without interacting',
        Icon:"BarChart",
        shadowColor:"red"
    },
]