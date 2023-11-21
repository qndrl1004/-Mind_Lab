import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.MAIN__PORT);

    process.on('SIGINT', () => app.close());
    process.on('SIGTERM', () => app.close());
  } catch (error) {
    console.error('애플리케이션 시작 중 오류:', error);
    process.exit(1);
  }
}

bootstrap();
