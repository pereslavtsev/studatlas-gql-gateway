import { Resolver, Query, Args } from '@nestjs/graphql';
import { Academy } from '../models/academy.model';
import { ClientGrpc } from '@nestjs/microservices';
import { grabber } from '../../../compiled/compiled';
import { Inject, OnModuleInit } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { GetAcademyArgs } from '../dto/get-academy.args';

@Resolver(of => Academy)
export class AcademiesResolver implements OnModuleInit {
  constructor(@Inject('GRABBER_PACKAGE') private readonly client: ClientGrpc) {}

  private academyService: grabber.AcademyService;

  onModuleInit() {
    this.academyService = this.client.getService<grabber.AcademyService>(
      grabber.AcademyService.name,
    );
  }

  @Query(returns => Academy, { name: 'academy' })
  getAcademy(@Args() args: GetAcademyArgs) {
    return this.academyService.getAcademy(args);
  }

  @Query(returns => [Academy], { name: 'academies' })
  getAcademies() {
    return this.academyService.listAcademies({}).pipe(map(({ data }) => data));
  }
}
