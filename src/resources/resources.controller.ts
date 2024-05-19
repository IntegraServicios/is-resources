import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ResourceService } from './resources.service';
import { CreateResourceDto } from './dtos/resource.dto';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}
  @Get()
  getAllResources() {
    return this.resourceService.getAllResources();
  }

  @Put()
  createResource(@Body() data: CreateResourceDto) {
    return this.resourceService.createResource(data);
  }

  @Get('types/:unitId')
  getResourceTypesByUnit(@Param('unitId') unitId: number) {
    return this.resourceService.getResourceTypesByUnit(unitId);
  }
  @Get('unit')
  getAllUnits() {
    return this.resourceService.getAllUnits();
  }
}
