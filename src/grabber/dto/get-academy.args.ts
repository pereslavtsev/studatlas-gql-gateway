import { IsMongoId } from 'class-validator';
import { Field, ArgsType, ID } from '@nestjs/graphql';
import { grabber } from '../../../compiled/compiled';

@ArgsType()
export class GetAcademyArgs extends grabber.GetAcademyRequest {
  @Field(type => ID)
  @IsMongoId()
  id: string;
}