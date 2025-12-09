import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('humidity-sensors')
export class HumiditySensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  timestamp: Date;

  @Column({ type: 'varchar', length: 200 })
  sensorName: string;

  @Column({ type: 'double precision' })
  value: number;

  @Column({ type: 'varchar', length: 20 })
  unit: string;

  @CreateDateColumn()
  createdAt: Date;
}
