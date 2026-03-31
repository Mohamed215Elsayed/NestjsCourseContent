import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Req, Res
}
    from "@nestjs/common";
import type {
    Request, Response
}
    from 'express';
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

@Controller("api/v1/users") export class UsersController {
    /*****************/
    private readonly users: UserEntity[] = [];
    /*****************/
    @Get() @HttpCode(200)/*  find(): string[] {
         return ["ali", "mo", "rana", "wafaa"]
     } */
    find(): UserEntity[] {
        return this.users;
    }
    /*****************/
    /*  @Get(':username')
     @HttpCode(200)
     findOne(@Param('username') username: string): string {
         return `User ${username} details`;
     } */
    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string): UserEntity {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

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
    @Post()
    @HttpCode(201)
    Create(@Body() CreateUserDto: CreateUserDto): UserEntity {
        const newUser: UserEntity = {
            ...CreateUserDto,
            id: uuidv4()
        };
        this.users.push(newUser);
        return newUser;
    }
    /*****************/
    /*  @Patch(':username')
     update(@Param('username') username: string, @Body() input: any): string {
         return `User ${username}-${input}  updated successfully`;
     } */
    // UpdateUserDto
    @Patch(':id')
    @HttpCode(200)
    update(
        @Param('id') id: string,
        // @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
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
    }
    /*****************/
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): void {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }
        this.users.splice(userIndex, 1);
    };
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
}
