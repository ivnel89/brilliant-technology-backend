import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class User {
  constructor(
    firstName?: string,
    lastName?: string,
    displayPicture?: string,
    isActive = true,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayPicture = displayPicture;
    this.isActive = isActive;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  displayPicture: string;

  @UpdateDateColumn()
  lastModifiedDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}