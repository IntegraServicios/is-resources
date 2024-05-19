import { Module } from '@nestjs/common';
import { ResourceController } from './resources.controller';
import { ResourceService } from './resources.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Unit } from './entities/unit.entity';
import { ResourceType } from './entities/resource-type.entity';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Unit, ResourceType, Schedule])],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
