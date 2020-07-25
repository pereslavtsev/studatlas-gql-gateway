import { Field, ID, ObjectType } from '@nestjs/graphql';
import { grabber } from '../../../compiled/compiled'

@ObjectType()
export class Academy extends grabber.Academy {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    abbreviation: string;

    @Field()
    alias: string;

    @Field()
    website: string;

    @Field()
    endpoint: string;

    @Field()
    version: string;

    @Field(type => [String], { defaultValue: [] })
    disabledSources: string[];

    @Field({ defaultValue: false })
    isDisabled: boolean;
}