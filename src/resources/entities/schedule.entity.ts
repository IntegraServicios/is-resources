import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'time' })
  mondayStartAt: Date;

  @Column({ nullable: true, type: 'time' })
  mondayEndAt: Date;

  @Column({ nullable: true, type: 'time' })
  tuesdayStartAt: Date;

  @Column({ nullable: true, type: 'time' })
  tuesdayEndAt: Date;

  @Column({ nullable: true, type: 'time' })
  wednesdayStartAt: Date;

  @Column({ nullable: true, type: 'time' })
  wednesdayEndAt: Date;

  @Column({ nullable: true, type: 'time' })
  thursdayStartAt: Date;

  @Column({ nullable: true, type: 'time' })
  thursdayEndAt: Date;

  @Column({ nullable: true, type: 'time' })
  fridayStartAt: Date;

  @Column({ nullable: true, type: 'time' })
  fridayEndAt: Date;

  @Column({ nullable: true, type: 'time' })
  saturdayStartAt: Date;

  @Column({ nullable: true, type: 'time' })
  saturdayEndAt: Date;

  @Column({ nullable: true, type: 'time' })
  sundayStartAt: Date;

  @Column({ nullable: true, type: 'time' })
  sundayEndAt: Date;
}
