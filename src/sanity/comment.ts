import { defineField } from 'sanity'


export const comment = {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
      defineField({
        name: 'name',
        type: 'string',
        title: 'Name',
      }),
      defineField({
        name: 'message',
        type: 'text',
        title: 'Message',
      }),
      defineField({
        name: 'post',
        type: 'reference',
        to: [{ 
            type: 'post'
            }],
      }),
    ],
  };
  