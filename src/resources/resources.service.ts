import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dtos/resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { ResourceType } from './entities/resource-type.entity';
import { Unit } from './entities/unit.entity';
import { Schedule } from './entities/schedule.entity';
@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(ResourceType)
    private readonly resourceTypeRepository: Repository<ResourceType>,
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}
  async createResource({ name, resourceTypeId }: CreateResourceDto) {
    const resourceType = await this.resourceTypeRepository.findOneBy({
      id: resourceTypeId,
    });
    if (!resourceType)
      throw new BadRequestException({
        message: 'El tipo de recurso no existe',
      });
    return this.resourceRepository.save({ name, resourceType });
  }

  getResourceTypesByUnit(unitId: number) {
    return this.resourceTypeRepository.findBy({ unit: { id: unitId } });
  }

  getAllUnits() {
    return this.unitRepository.find();
  }

  async getAllResources() {
    const units: any = await this.unitRepository.find({
      relations: {
        resourceTypes: { resources: true, schedule: true },
        schedule: true,
      },
    });
    units.forEach((unit) => {
      unit.schedule = this.parseSchedule(unit.schedule);
      unit.resourceTypes.forEach((rt) => {
        rt.schedule = this.parseSchedule(rt.schedule);
      });
    });
    return units;
  }

  private parseSchedule(schedule: Schedule) {
    return {
      mon: { startAt: schedule.mondayStartAt, endAt: schedule.mondayEndAt },
      tue: { startAt: schedule.tuesdayStartAt, endAt: schedule.tuesdayEndAt },
      wed: {
        startAt: schedule.wednesdayStartAt,
        endAt: schedule.wednesdayEndAt,
      },
      thu: { startAt: schedule.thursdayStartAt, endAt: schedule.thursdayEndAt },
      fri: { startAt: schedule.fridayStartAt, endAt: schedule.fridayEndAt },
      sat: { startAt: schedule.saturdayStartAt, endAt: schedule.saturdayEndAt },
      sun: { startAt: schedule.sundayStartAt, endAt: schedule.sundayEndAt },
    };
  }

  getResourceById(id: number) {
    return this.resourceRepository.findOne({
      where: { id },
      relations: { resourceType: { schedule: true } },
    });
  }
}
