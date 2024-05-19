import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceType } from './resource-type.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => ResourceType, (resourceType) => resourceType.resources, {
    nullable: false,
  })
  resourceType: ResourceType;
}
