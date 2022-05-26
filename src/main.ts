import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from "express-session"
import * as passport from 'passport';

const start = async () => {
  try {
    const PORT = process.env.PORT || 7777
    const app = await NestFactory.create(AppModule)
    app.enableCors({ credentials: true, origin: "http://localhost:3000" })
    app.use(cookieParser())
    app.use(session({
      secret: process.env.SESSION_KEY, resave: false, saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    await app.listen(PORT, () => console.log(`${PORT} started`,))

  } catch (err) {
    console.log(err);
  }
};
start()