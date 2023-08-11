import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {EavAttribute} from "./entity/eav.attribute";
import {EavAttributeType} from "./entity/eav.attribute.type";

@Module({
    imports: [
        TypeOrmModule.forFeature([EavAttribute]),
        TypeOrmModule.forFeature([EavAttributeType])
    ],
})
export class EavModule {}
