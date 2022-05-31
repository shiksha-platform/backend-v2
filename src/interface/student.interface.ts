export interface StudentInterface extends Document {
  readonly studentId: string;
  readonly aadhaar: string;
  readonly refStudentId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly contactNumber: number;
  readonly email: string;
  readonly gender: string;
  readonly socialCategory: string;
  readonly iscwsn: string;
  readonly religion: string;
  readonly singleGirl: string;
  readonly weight: number;
  readonly height: number;
  readonly bloodGroup: string;
  readonly birthDate: Date;
  readonly homeless: string;
  readonly bpl: string;
  readonly migrant: string;
  readonly schoolId: string;
  readonly classId: string;
  readonly status: string;
}
