import { type SchemaTypeDefinition } from 'sanity'
import { post } from '../post'
import { author } from '../author'
import { comment } from '../comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,author,comment],
}
