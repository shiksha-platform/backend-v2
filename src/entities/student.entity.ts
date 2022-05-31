import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  studentId: string;

  @Column({ type: "string" })
  aadhaar: string;

  @Column({ type: "string" })
  refStudentId: string;

  @Column({ type: "character varying" })
  firstName: string;

  @Column({ type: "character varying" })
  lastName: string;

  @Column({ type: "integer" })
  contactNumber: number;

  @Column({ type: "string" })
  email: string;

  @Column({ type: "character varying", length: 1 })
  gender: string;

  @Column({ type: "character varying", length: 1 })
  socialCategory: string;

  @Column({ type: "character varying", length: 1 })
  iscwsn: string;

  @Column({ type: "character varying", length: 1 })
  religion: string;

  @Column({ type: "character varying", length: 1 })
  singleGirl: string;

  @Column({ type: "real" })
  weight: number;

  @Column({ type: "real" })
  height: number;

  @Column({ type: "character varying", length: 1 })
  bloodGroup: string;

  @Column({ type: "date" })
  birthDate: Date;

  @Column({ type: "character varying", length: 1 })
  homeless: string;

  @Column({ type: "character varying", length: 1 })
  bpl: string;

  @Column({ type: "character varying", length: 1 })
  migrant: string;

  @Column({ type: "string" })
  schoolId: string;

  @Column({ type: "string" })
  classId: string;

  @Column({ type: "character varying", length: 1 })
  status: string;
}
