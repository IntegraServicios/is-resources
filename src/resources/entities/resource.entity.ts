import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ResourceType } from './resource-type.entity';
import { ReservationEntity } from 'src/reservations/entities/reservation.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => ResourceType, (resourceType) => resourceType.resources, {
    nullable: false,
  })
  resourceType: ResourceType;

  @OneToMany(() => ReservationEntity, (resource) => resource.resource)
  reservations: ReservationEntity[];
}
