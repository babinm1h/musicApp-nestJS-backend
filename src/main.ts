import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser"

const start = async () => {
  try {
    const PORT = process.env.PORT || 7777
    const app = await NestFactory.create(AppModule)
    app.enableCors({ credentials: true, origin: "http://localhost:3000" })
    app.use(cookieParser())
    await app.listen(PORT, () => console.log(`${PORT} started`,))

  } catch (err) {
    console.log(err);
  }
};
start()