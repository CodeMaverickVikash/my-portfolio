import { createNestApplication } from "./bootstrap";

async function bootstrap() {
  const app = await createNestApplication();
  await app.listen(process.env.PORT || 3001);
}

void bootstrap();
