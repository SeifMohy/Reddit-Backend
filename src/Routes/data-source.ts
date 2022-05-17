import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment } from '../Entities/comment';
import {Post} from "../Entities/post"
import { User } from '../Entities/user';
import {Tag} from "../Entities/tag"

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: +process.env.DB_PORT!,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  synchronize: true,
  logging: false,
  entities: [Post,Comment,User,Tag],
  migrations: ['migration/*.ts'],
  subscribers: []
});