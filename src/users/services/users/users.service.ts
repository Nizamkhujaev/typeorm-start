/* eslint-disable prettier/prettier */
import {InjectRepository} from '@nestjs/typeorm'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import {Repository} from 'typeorm';
import { CreateUserParam, UpdateUserParam, createUserPostParams, createUserProfileParams } from 'src/utils/type';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) {}
    
    fetchUsers() {
       return this.userRepository.find({ relations: ['profile', 'posts'] });
    }

    createUser(userDetails: CreateUserParam) {
        const newUser = this.userRepository.create({...userDetails, createdAt: new Date()});
        return this.userRepository.save(newUser);
    }

    editUser(id: number,editedUserDetail: UpdateUserParam) {
       return this.userRepository.update({id}, {...editedUserDetail})
    }

    deleteUser(id: number) {
        return this.userRepository.delete({id})
    }

    async createUserProfile(id: number, createUserProfileParams: createUserProfileParams) {
        const user = await this.userRepository.findOneBy({id});
        if(!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)

        const newProfile = this.profileRepository.create(createUserProfileParams);
        const savedProfile = await this.profileRepository.save(newProfile)
        user.profile = savedProfile
        return this.userRepository.save(user)
    }

    async createUserPost(id: number, createUserDetails: createUserPostParams) {
        const user = await this.userRepository.findOneBy({id});
        if(!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST)

        const newPost = this.postRepository.create({...createUserDetails, user})
        return this.postRepository.save(newPost)
    }
}
