import {inject} from '@loopback/core';
import {ClassDecoratorFactory,MetadataInspector} from '@loopback/metadata';
import {
  get, Request,


  response,
  ResponseObject, RestBindings
} from '@loopback/rest';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

interface MyClassMetada {
  name: string;
}

function myClassDecorator(spec: MyClassMetada): ClassDecorator {
  const factory = new ClassDecoratorFactory<MyClassMetada>(
    'metada-data-my-class-decorator',
    spec
  );
  return factory.create();
}

/**
 * A simple controller to bounce back http requests
 */
@myClassDecorator({name: 'ping'})
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  // Map to `GET /ping`
  @get('/ping')
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack 11111',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
