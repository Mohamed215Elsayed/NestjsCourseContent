// import { Exclude } from 'class-transformer';

// export class UserResponseDto {//وظيفته format response مش يحتوي business logic
//     id: string;
//     username: string;
//     email: string;
//     country: string;
//     @Exclude()
//     password: string;
//     constructor(partial:Partial<UserResponseDto>) {
//         Object.assign(this,partial); 
//     }
// }

//ويمكن الاستغناء عن constructor?
/* 
وفي service:
👉 مش محتاج constructor هنا أصلاً طالما بتستخدم plainToInstance + @Expose/@Exclude
return plainToInstance(UserResponseDto, newUser, {
  excludeExtraneousValues: true,
});
class-transformer هو اللي:

بيعمل instance من الكلاس
وبيعمل assign للـ fields
وبيطبّق @Expose و @Exclude

➡️ فـ constructor بقى مالوش لازمة هنا
*/
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  country: string;
  //@Expose({ name: "Country" })
 /*  @Expose()
  get address(): string {
    return `Country: ${this.country}`;
  } */

  @Exclude()
  password: string;
}