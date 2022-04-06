import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Samagra")
    .setDescription("CRUD API")
    .setVersion("1.0")
    .addTag("V2")
    .addApiKey(
      { type: "apiKey", name: "Authorization", in: "header" },
      "access-token"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
