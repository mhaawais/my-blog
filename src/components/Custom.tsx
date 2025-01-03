import { PortableTextComponents } from "next-sanity";

export const components:PortableTextComponents ={
    block:{
        h2:({children})=><h2 className="text-3xl font-bold text-accentDarkPrimary">{children}</h2>
    },
    listItem:{
        bullet:({children}) => <li className="list-disc marker:text-accentDarkSecondary
        list-inside ml-4">{children}</li>
    },
    marks:{
        strong:({children})=> <strong className="font-bold text-green-500">{children}</strong>
    }
}