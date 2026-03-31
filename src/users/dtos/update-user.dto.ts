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
export class UpdateUserDto extends PartialType(CreateUserDto) {}