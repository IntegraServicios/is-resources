import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { Resource } from './resource.entity';
import { Unit } from './unit.entity';

@Entity()
export class ResourceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ name: 'min_reserve', type: 'int', default: 60 })
  minReserve: number;

  @Column({ nullable: true, type: 'json' })
  characteristics: object;

  @OneToOne(() => Schedule, { nullable: false })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @OneToMany(() => Resource, (resource) => resource.resourceType)
  resources: Resource[];

  @ManyToOne(() => Unit, (unit) => unit.resourceTypes, { nullable: false })
  unit: Unit;
}
