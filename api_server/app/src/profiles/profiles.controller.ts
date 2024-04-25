import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  HttpException,
  HttpStatus,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ProfileForEditDto } from './dto/profile_for_edit.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UpdateProfileResponseDto } from './dto/update_profile_response.dto';
import formatValidationErrors from '../lib/formatValidationErrors';
import { UpdateProfileDto } from './dto/update_profile.dto';
import { AuthGuard } from '../auth/auth.guard';
// import { FileInterceptor } from '@nestjs/platform-express';
import { getObject } from '../lib/awsService';

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

    if (!data.skillsheet?.filePath) return data;

    // スキルシートが存在していれば、ファイル名とデータ(Base64)を含めて返す
    const skillsheetData = await getObject(data.skillsheet?.filePath);
    return {
      ...data,
      skillsheetName: data.skillsheet?.fileName,
      skillsheetData,
    };
  }

  @Post()
  // @UseInterceptors(FileInterceptor('file'))
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
      !dto.skillsheetName
        ? dto
        : {
            // スキルシート以外の入力値を渡す
            skillsheetName: {},
            skillsheetData: {},
            ...dto,
          },
    );

    // TODO: ファイルバリデーションもこの中に入れる
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
      } = await this.profilesService.save(assignProfilesEngineer, {
        skillsheetName: dto?.skillsheetName,
        skillsheetData: dto?.skillsheetData,
      });
      if (!data.skillsheet?.filePath) return { profile: data, errors: [] };

      // スキルシートが存在していれば、ファイル名とデータ(Base64)を含めて返す
      const skillsheetData = await getObject(data.skillsheet?.filePath);
      return {
        profile: {
          ...data,
          skillsheetName: data.skillsheet?.fileName,
          skillsheetData,
        },
        errors: [],
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
