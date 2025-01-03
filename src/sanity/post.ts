import { defineType,defineField,defineArrayMember } from 'sanity'

export const post = {
    name:'post',
    type:'document',
    title:'Post',
    fields:[
        defineField ({
            name:'title',
            type:'string',
            title:'Post Title',
            description:'Title of the post',
          //  validation: Rule => Rule.required(),

        }),

        defineField ({
            name:'slug',
            type:'slug',
            title:'Slug',
            options:{
                source:'title',
            },
           // validation: Rule => Rule.required(),

        }),

        defineField ({
            name:'summary',
            type:'text',
            title:'Summary',
           // validation: Rule => Rule.required(),

        }),

        defineField ({
            name:'image',
            type:'image',
            title:'Image',
           // validation: Rule => Rule.required(),

        }),

        defineField ({
            name:'content',
            type:'array',
            title:'Content', 
            // validation: Rule => Rule.required(),       
               of:[
                  defineArrayMember({
                  type:'block',
                  })
                ]

         }),

         defineField ({
            name:'author',
            type:'reference',
            title:'Author',
            to:[{
                type:'author'
                }],
           // validation: Rule => Rule.required(),

        }),


    ]}
