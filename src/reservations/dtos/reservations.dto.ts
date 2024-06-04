import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ReservationStatus } from '../enums/reservations.enum';

export class ReservateResourceDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  resourceId: number;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export class UpdateReservationStatus {
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
