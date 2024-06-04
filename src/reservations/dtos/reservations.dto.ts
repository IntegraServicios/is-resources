import { IsDateString, IsNumber } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

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
