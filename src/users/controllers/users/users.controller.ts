/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { CreateUserPostDto } from '../../dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    async getUsers() {
        const users = await this.usersService.fetchUsers();
        return users;
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @Put(':id')
    async editUser(@Param('id', ParseIntPipe) id: number, @Body() editUserDto: UpdateUserDto) {
       const user = await this.usersService.editUser(id,editUserDto)
       return user;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
     await this.usersService.deleteUser(id)
    }

    @Post(':id/profiles')
    async createUserProfile(@Param('id', ParseIntPipe) id: number,@Body() createUserProfileDto: CreateUserProfileDto) {
        return this.usersService.createUserProfile(id, createUserProfileDto)
    }

    @Post(':id/post')
    createUserPost(@Param('id', ParseIntPipe) id: number, @Body() createUserPostDto: CreateUserPostDto ) {
        return this.usersService.createUserPost(id, createUserPostDto)
    }
}
