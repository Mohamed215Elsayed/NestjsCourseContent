import { IsOptional, IsString, MinLength } from 'class-validator';

// //traditional way
// export class UpdateUserDto {
//   username?: string;
//   email?: string;
//   password?: string;
//   country?: string;
// }  
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// 👇 Automatically makes all fields optional
export class UpdateUserDto extends PartialType(CreateUserDto) {
   /*  @IsOptional()
    @MinLength(8) // بدل 6
    password?: string;
    //اضيف field جديد
    @IsOptional()
    @IsString()
    bio?: string; */
}