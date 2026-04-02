import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty, IsIn, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @Length(3, 20)
  // @MinLength(3)
  // @MaxLength(20)
  // @Length(3, 20, { message: "InCorrect length" })
  // @Length(3, 150,{groups:['create']})
  // @Length(6, 150,{groups:['update']})//علشان تطبق نحذف الglobal pipes and go to route controller  make group
  readonly username: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  // @IsEmail({}, { message: 'Invalid email format' })
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 150)
  readonly email: string;

  @IsString()
  /* @MinLength(6)
  @MaxLength(30) */
  @Length(8, 100)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
    message: 'Password must contain uppercase, lowercase, number and special character',
  })  
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Egypt', 'USA', 'UAE'])
  readonly country: string;
  //no business logic here
}