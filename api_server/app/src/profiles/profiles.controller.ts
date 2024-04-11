import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
  Get,
  // Param,
  // NotFoundException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
// import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileForEditDto } from './dto/profile-for-edit.dto';
import { UpdateProfileResponseDto } from './dto/update-profile-response.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import formatValidationErrors from 'src/lib/formatValidationErrors';
import { CurrentEmployment } from './entities/profile.entity';

@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profilesService.create(createProfileDto);
  // }

  // @Get()
  // findAll() {
  //   return this.profilesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profilesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profilesService.update(+id, updateProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profilesService.remove(+id);
  // }
  @Get()
  @ApiCreatedResponse({
    type: ProfileForEditDto,
    description: 'ログインユーザのプロフィールの取得',
  })
  async fetchForEdit(@Request() req: { user: JwtPayload }) {
    const profile = await this.profilesService.findOne(req.user.userId);
    // if (!profile) {
    //   throw new NotFoundException({
    //     statusCode: 404,
    //     message: '該当するプロフィールがありません。',
    //   });
    // }
    return {
      lastName: profile?.lastName ?? '',
      firstName: profile?.firstName ?? '',
      birthday: profile?.birthday ?? '',
      currentEmployment:
        profile?.currentEmployment ?? CurrentEmployment.FLEELANCE,
      inWorkingCompanyName: profile?.inWorkingCompanyName ?? '',
      tel: profile?.tel ?? '',
    };
  }

  @Post()
  @ApiCreatedResponse({
    type: UpdateProfileResponseDto,
    description: 'ログインユーザのプロフィールの作成成功',
  })
  async update(
    @Request() req: { user: JwtPayload },
    @Body() dto: UpdateProfileDto,
  ) {
    const profile = await this.profilesService.findOrInitializeProfile(
      dto,
      req.user.userId,
    );
    const validationErrors = await this.profilesService.validate(profile);
    if (!!validationErrors.length) {
      return {
        profile,
        errors: formatValidationErrors(validationErrors),
      };
    }

    try {
      const savedProfile = await this.profilesService.save(profile);
      return { profile: savedProfile, errors: [] };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
