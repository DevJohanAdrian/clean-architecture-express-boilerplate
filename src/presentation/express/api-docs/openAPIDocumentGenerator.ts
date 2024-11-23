import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';

import { healthCheckRegistry } from '@presentation/express/controller/healthCheck/healthCheckRouter';
import { userRegistry } from '@presentation/express/controller/user/userRouter';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([userRegistry, healthCheckRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API'
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json'
    }
  });
}
