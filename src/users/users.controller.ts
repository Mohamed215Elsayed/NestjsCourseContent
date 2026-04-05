import {
    BadRequestException,
    Body, Controller, Delete,  ParseUUIDPipe, Get, HttpCode, HttpStatus,  Param, Patch, Post, 
    // , Res, ValidationPipe, UsePipes, Query, ParseIntPipe,ForbiddenException, ,NotFoundException,
}
    from "@nestjs/common";
// import type {
//     Request, Response
// }
//     from 'express';
import {
    CreateUserDto
}
    from "./dtos/create-user.dto";
import {
    UpdateUserDto
}
    from "./dtos/update-user.dto";
import {
    UserEntity
}
    from "./user.entity";
import {
    v4 as uuidv4
}
    from 'uuid';
// import { CustomValidationPipe } from "./pipes/validation.pipe";
import { UsersService } from "./users.service";

// @UsePipes(ValidationPipe)//validation pipe on controller level
@Controller("api/v1/users") export class UsersController {
    /*****************/
    // private readonly users: UserEntity[] = [];
    /*****************/
    /*  @Get() @HttpCode(200) */
    /*  find(): string[] {
         return ["ali", "mo", "rana", "wafaa"]
     } */
    /* @Get() @HttpCode(200)
    find(): UserEntity[] {
        return this.users;
    }  */
    //ex on custom validation pipe
    /*   @Get() @HttpCode(200)
      find(@Query('username', CustomValidationPipe)username:string): UserEntity[] {
          return this.users;
      } */
    /*****************/
    /*  @Get(':username')
     @HttpCode(200)
     findOne(@Param('username') username: string): string {
         return `User ${username} details`;
     } */
    /*  @Get(':id')
     @HttpCode(200)
     findOne(
       @Param('id', 
         new ParseIntPipe({
             errorHttpStatusCode: HttpStatus.FORBIDDEN,
             exceptionFactory: () =>
                 new BadRequestException('ID must be a valid number'),
         
           }),
         )
          id: string): UserEntity {
         const user = this.users.find((user) => user.id === id);
 
         if (!user) {
             throw new NotFoundException('User not found');
         }
 
         return user;
     }
  */
    /*  @Get(':id')
     @HttpCode(200)
     findOne( */
    /*     @Param('id', new ParseUUIDPipe()) id: string): UserEntity { */
    /*    @Param('id', new ParseUUIDPipe({
           exceptionFactory: () =>
               new BadRequestException('Invalid UUID format'),
       })) id: string): UserEntity {
       const user = this.users.find((user) => user.id === id);
       if (!user) {
           throw new NotFoundException('User not found');
       }
       return user;
   } */
    /*****************/
    /*  @Post()
     @HttpCode(201)
     Create(@Body() userData: any): string {//body way
         return userData;
     } */
    /*  Create(@Req() request: Request): string {//request way
         // console.log('Request:', request.body);//Request:{name:'Moh'}
         // console.log('Request:', request.params);
         return "User Created successfully!"
     } */
    // @Post()
    // @HttpCode(201)
    // // Create(@Body() CreateUserDto: CreateUserDto): UserEntity {
    // Create(@Body(ValidationPipe) CreateUserDto: CreateUserDto): UserEntity {//validation pipes make nest see the rules in dtos
    //     const newUser: UserEntity = {
    //         ...CreateUserDto,
    //         id: uuidv4()
    //     };
    //     this.users.push(newUser);
    //     return newUser;
    // }
    // @UsePipes(ValidationPipe)//validation pipe on route level
    // @Post()
    // @HttpCode(201)
    // // Create(@Body() CreateUserDto: CreateUserDto): UserEntity {
    // Create(@Body() CreateUserDto: CreateUserDto): UserEntity {//validation pipes make nest see the rules in dtos
    //     const newUser: UserEntity = {
    //         ...CreateUserDto,
    //         id: uuidv4()
    //     };
    //     this.users.push(newUser);
    //     return newUser;
    // }
    //global
    /*   @Post()
      @HttpCode(201)
      // Create(@Body() CreateUserDto: CreateUserDto): UserEntity {
      Create(@Body() CreateUserDto: CreateUserDto): UserEntity {//validation pipes make nest see the rules in dtos
          const newUser: UserEntity = {
              ...CreateUserDto,
              id: uuidv4()
          };
          this.users.push(newUser);
          return newUser;
      } */
    //group test
    /*  @Post()
     @HttpCode(201)
     // Create(@Body() CreateUserDto: CreateUserDto): UserEntity {
     Create(@Body(new ValidationPipe({groups:['create']})) CreateUserDto: CreateUserDto): UserEntity {//validation pipes make nest see the rules in dtos
         const newUser: UserEntity = {
             ...CreateUserDto,
             id: uuidv4()
         };
         this.users.push(newUser);
         return newUser;
     } */
    /*****************/
    /*  @Patch(':username')
     update(@Param('username') username: string, @Body() input: any): string {
         return `User ${username}-${input}  updated successfully`;
     } */
    // UpdateUserDto
    /*  @Patch(':id')
     @HttpCode(200)
     update(
         @Param('id', new ParseUUIDPipe({
             exceptionFactory: () =>
                 new BadRequestException('Invalid UUID format'),
         })) id: string, */
    // @Param('id', ParseIntPipe) id: number,
    /*@Body(ValidationPipe) updateUserDto: UpdateUserDto, */
    // @Body(new ValidationPipe({groups:['update']}))updateUserDto: UpdateUserDto,//for group test
    /*   @Body() updateUserDto: UpdateUserDto,//with global pipe way
  ): UserEntity {
      const userIndex = this.users.findIndex(user => user.id === id);

      if (userIndex === -1) {
          throw new NotFoundException('User not found');
      }

      this.users[userIndex] = {
          ...this.users[userIndex],
          ...updateUserDto,
      };

      return this.users[userIndex];
  } */
    /*****************/
    /*  @Delete(':id')
     @HttpCode(HttpStatus.NO_CONTENT)
     remove(@Param('id', new ParseUUIDPipe({
         exceptionFactory: () =>
             new BadRequestException('Invalid UUID format'),
     })) id: string): void {
         const userIndex = this.users.findIndex((user) => user.id === id);
         if (userIndex === -1) {
             throw new NotFoundException('User not found');
         }
         this.users.splice(userIndex, 1);
     }; */
    /*    @Delete(':username')// @HttpCode(204)
       @HttpCode(HttpStatus.NO_CONTENT) remove(@Param('username') username: string): string {
           return `User $ {
               username
           }
           removed successfully`; //
       }; */
    //    //by express way
    //     @Delete(':username')
    //      remove(@Param('username') username: string,@Res() res: Response) {
    //         res.status(204).send();
    //      }
    // ⚠️ Note: When you use @Res(), Nest stops automatic response handling — you must manage status codes and responses manually.
    /*****************/
    /*********** */
    //   @Get()
    //   findAll(@Res({ passthrough: true }) res: Response) {
    //     res.cookie('token', 'abc123'); // 👈 You can still set cookies/headers
    //     return ['Persian', 'Siamese', 'Maine Coon']; // 👈 Nest will still serialize this
    //   }
    //   •	You can set headers/cookies manually.
    // •	You still get automatic response handling (status codes, JSON serialization).
    /***********section-3 */
    constructor(private readonly usersService: UsersService) { }
    //The technique we've used so far is called constructor-based injection, 
    //where the token is used to request an instance of a class by the same name.
    @Get() @HttpCode(200)
    find(): UserEntity[] {
        return this.usersService.findUsers();
    }
    /*########################*/
    @Get(':id')
    @HttpCode(200)
    findOne(
        @Param('id', new ParseUUIDPipe({
            exceptionFactory: () =>
                new BadRequestException('Invalid UUID format'),
        })) id: string): UserEntity {
        return this.usersService.findUserById(id);
    }
    /*########################*/
    @Post()
    @HttpCode(201)
    Create(@Body() createUserDto: CreateUserDto): UserEntity {
        return this.usersService.createUser(createUserDto);
    }
    /*########################*/
    @Patch(':id')
    @HttpCode(200)
    update(
        @Param('id', new ParseUUIDPipe({
            exceptionFactory: () =>
                new BadRequestException('Invalid UUID format'),
        })) id: string,

        @Body() updateUserDto: UpdateUserDto,
    ): UserEntity {
        return this.usersService.updateUser(id, updateUserDto);
    }
    /*########################*/
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', new ParseUUIDPipe({
        exceptionFactory: () =>
            new BadRequestException('Invalid UUID format'),
    })) id: string): void {
        return this.usersService.deleteUser(id);
    };
    /*########################*/
}