import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('temperature-sensors')
export class TemperatureSensor {
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
