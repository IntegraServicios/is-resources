import { IsDateString, IsNumber, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class ReservateResourceDto {
  @IsString()
  userId: string;

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
