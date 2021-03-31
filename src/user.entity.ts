import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Index('NAME_IDX', { unique: true })
  name: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];
}
