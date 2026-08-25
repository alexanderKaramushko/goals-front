import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';

generateApi({
  url: 'https://goals.melkor-apps.ru/api/v1/docs-json',
  output: path.resolve(process.cwd(), './src/entities/api'),
  fileName: 'api-types.ts',
  enumStyle: 'enum',
  client: false,
  primitiveTypeConstructs: (structs) => ({
    ...structs,
    object: 'undefined',
  }),
});

