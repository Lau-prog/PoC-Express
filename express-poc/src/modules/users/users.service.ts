import {PrismaClient, User} from '../../../generated/prisma';

export default class UsersService { constructor(private prisma: PrismaClient){}
async findAll():Promise<User[]>{
  return this.prisma.user.findMany();
}
async create (data: { name:string; email:string}) {
  return this.prisma.user.create({data});
}
async findOne(id:number){
  return this.prisma.user.findUnique({where:{id}});
}
}