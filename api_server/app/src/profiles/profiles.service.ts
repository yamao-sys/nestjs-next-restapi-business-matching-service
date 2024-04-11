import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findOrInitializeProfile(dto: UpdateProfileDto, userId: string) {
    const profile = await this.findOne(userId);
    if (!!profile) {
      return this.profileRepository.merge(profile, dto);
    }

    const newProfile = new Profile();
    return this.profileRepository.merge(newProfile, { userId, ...dto });
  }

  async validate(profile: Profile) {
    return validate(profile);
  }

  async save(profile: Profile) {
    return this.profileRepository.save(profile);
  }

  findOne(userId: string) {
    return this.profileRepository.findOneBy({
      userId,
    });
  }
}
