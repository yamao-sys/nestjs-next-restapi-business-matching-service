import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ProfileForEditDto } from './dto/profile_for_edit.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UpdateProfileResponseDto } from './dto/update_profile_response.dto';
import formatValidationErrors from '../lib/formatValidationErrors';
import { UpdateProfileDto } from './dto/update_profile.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @ApiCreatedResponse({
    type: ProfileForEditDto,
    description: 'プロフィールの取得',
  })
  async findForProfileEdit(@Request() req: { user: JwtPayload }) {
    const {
      userId: {},
      ...data
    } = await this.profilesService.findOrInitialize(req.user.userId);

    return data;
  }

  @Post()
  @ApiCreatedResponse({
    type: UpdateProfileResponseDto,
    description: 'プロフィールの更新成功',
  })
  async update(
    @Request() req: { user: JwtPayload },
    @Body() dto: UpdateProfileDto,
  ) {
    const engineer = await this.profilesService.findOrInitialize(
      req.user.userId,
    );
    const assignProfilesEngineer = await this.profilesService.assignAttributes(
      engineer,
      dto,
    );

    const validationErrors = await this.profilesService.validate(
      assignProfilesEngineer,
    );
    if (!!validationErrors.length) {
      return {
        profile: assignProfilesEngineer,
        errors: formatValidationErrors(validationErrors),
      };
    }

    try {
      const {
        id: {},
        ...data
      } = await this.profilesService.save(assignProfilesEngineer);
      return { profile: data, errors: [] };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
