// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CAR, Post, Comment } = initSchema(schema);

export {
  CAR,
  Post,
  Comment
};