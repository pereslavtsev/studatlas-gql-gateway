import { Injectable } from '@nestjs/common';
import {
  ClientsModuleOptionsFactory,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class GrpcConfigService implements ClientsModuleOptionsFactory {
  createClientOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50051',
        package: 'grabber',
        protoPath: join(__dirname, '../../shared/packages/grabber/academy.proto'),
      },
    };
  }
}
