import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  favoriteId: string | undefined;

  async onModuleInit() {
    const favoriteTable = await this.favorite.create({
      data: {},
    });
    this.favoriteId = favoriteTable.id;
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
