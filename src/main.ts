import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { RequestMethod } from "@nestjs/common";
import { join } from "path";
import express = require("express");
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    process.env.IMAGEPATH,
    express.static(join(__dirname, "..", "uploads"))
  );
  app.setGlobalPrefix("api/v1", {
    exclude: [{ path: "health", method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle("Shiksha Platform")
    .setDescription("CRUD API")
    .setVersion("1.0")
    .addTag("V1")
    .addApiKey(
      { type: "apiKey", name: "Authorization", in: "header" },
      "access-token"
    )

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger-docs", app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
