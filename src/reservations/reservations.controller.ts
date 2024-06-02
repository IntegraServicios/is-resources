import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservateResourceDto } from './dtos/reservations.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Get('user/:userId')
  getUserReservations(@Param('userId') userId: string) {
    return this.reservationsService.getUserReservations(userId);
  }

  @Post()
  reservateResource(@Body() data: ReservateResourceDto) {
    return this.reservationsService.reservateResource(data);
  }

  @Get('resource/:id')
  getResourcePendingReservations(@Param('id') id: number) {
    return this.reservationsService.getResourcePendingReservations(id);
  }
}
