import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { ResourceType } from './resource-type.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => Schedule, { nullable: false })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @OneToMany(() => ResourceType, (resource) => resource.unit)
  resourceTypes: ResourceType[];
}
