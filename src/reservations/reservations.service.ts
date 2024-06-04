import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { ReservateResourceDto } from './dtos/reservations.dto';
import { DateTime } from 'luxon';
import { ResourceService } from '../resources/resources.service';
import { ReservationStatus } from './enums/reservations.enum';
@Injectable()
export class ReservationsService {
  constructor(
    private readonly resourceService: ResourceService,
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
  ) {}
  async getAllReservations() {
    const reservations: any = await this.reservationRepository.find({
      relations: ['resource'],
    });
    reservations.forEach((reservation) => {
      reservation.name = reservation.resource.name;
    });
    return reservations;
  }

  async getUserReservations(userId: number) {
    const reservations: any = await this.reservationRepository.find({
      where: { userId },
      relations: ['resource'],
    });
    reservations.forEach((reservation) => {
      reservation.name = reservation.resource.name;
    });
    return reservations;
  }

  async reservateResource({
    resourceId,
    userId,
    startAt,
    endAt,
  }: ReservateResourceDto) {
    const startAtDate = DateTime.fromISO(startAt);
    const endAtDate = DateTime.fromISO(endAt);
    const nowDate = DateTime.now();
    if (startAtDate < nowDate) {
      throw new BadRequestException({
        message: 'La reserva debe ser en el futuro',
      });
    }
    if (startAtDate.day !== endAtDate.day) {
      throw new BadRequestException({
        message: 'Fecha fuera de rango',
      });
    }
    const otherResources = await this.reservationRepository.findOneBy({
      resource: { id: resourceId },
      startAt: Between(startAtDate.toJSDate(), endAtDate.toJSDate()),
      endAt: Between(startAtDate.toJSDate(), endAtDate.toJSDate()),
    });
    if (otherResources) {
      throw new BadRequestException({
        message: 'La fecha presenta cruce',
      });
    }
    const resource = await this.resourceService.getResourceById(resourceId);
    const dayLong = startAtDate.weekdayLong.toLowerCase();
    const resourceStartAt = resource.resourceType.schedule[`${dayLong}StartAt`];
    const resourceEndAt = resource.resourceType.schedule[`${dayLong}EndAt`];
    if (!resourceStartAt) {
      throw new BadRequestException({
        message: 'Fecha fuera de rango de tipo de recurso',
      });
    }
    const resourceStartTime = DateTime.fromFormat(
      resourceStartAt,
      'HH:mm:ss',
    ).set({
      day: startAtDate.day,
      month: startAtDate.month,
      year: startAtDate.year,
    });
    const resourceEndTime = DateTime.fromFormat(resourceEndAt, 'HH:mm:ss').set({
      day: startAtDate.day,
      month: startAtDate.month,
      year: startAtDate.year,
    });
    if (resourceStartTime > startAtDate || resourceEndTime < endAtDate) {
      throw new BadRequestException({
        message: 'Fecha fuera de rango de tipo de recurso',
      });
    }
    await this.reservationRepository.save({
      resource: { id: resourceId },
      userId,
      status: ReservationStatus.PENDING,
      startAt: startAt,
      endAt: endAt,
    });
    return { message: 'OK' };
  }

  getResourcePendingReservations(id) {
    return this.reservationRepository.findBy({
      status: ReservationStatus.PENDING,
      resource: { id },
      startAt: MoreThan(new Date()),
    });
  }

  updateReservationStatus(id: number, status: ReservationStatus) {
    const newValues: Partial<ReservationEntity> = { status };
    if (status === ReservationStatus.ON_LOAN) {
      newValues.loanedAt = new Date();
    } else if (status === ReservationStatus.RETURNED) {
      newValues.returnedAt = new Date();
    }
    return this.reservationRepository.update(id, newValues);
  }
}
