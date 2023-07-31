import { NestBootStrapApplication } from './bootstrap.application';
const prisma = new PrismaClient().$extend({
  $model: {
      $all: {
          getClass<T extends object>(this: T): new () => T {
              return class { /**  Implementation */ } as any
          }
      },
  },
})
NestBootStrapApplication.getInstance().emit('ready');