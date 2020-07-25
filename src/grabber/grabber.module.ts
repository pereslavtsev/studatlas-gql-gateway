import { Module } from '@nestjs/common';
import { AcademiesResolver } from './resolvers/academies.resolver';
import { ClientsModule } from "@nestjs/microservices";
import { GrpcConfigService } from "./grpc-config.service";

@Module({
  imports: [
    ClientsModule.registerAsync([{
      useClass: GrpcConfigService,
      name: 'GRABBER_PACKAGE',
    }]),
  ],
  providers: [AcademiesResolver],
})
export class GrabberModule {}
