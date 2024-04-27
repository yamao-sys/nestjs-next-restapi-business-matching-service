import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DesiredConditionsService } from './desired-conditions.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DesiredConditionForEditDto } from './dto/desired-condition-for-edit.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UpdateDesiredConditionResponseDto } from './dto/update-desired-condition-response.dto';
import { UpdateDesiredConditionDto } from './dto/update-desired-condition.dto';
import formatValidationErrors from '../lib/formatValidationErrors';

@UseGuards(AuthGuard)
@Controller('desiredConditions')
export class DesiredConditionsController {
  constructor(
    private readonly desiredConditionsService: DesiredConditionsService,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: DesiredConditionForEditDto,
    description: '希望条件の取得',
  })
  async findForProfileEdit(@Request() req: { user: JwtPayload }) {
    return await this.desiredConditionsService.findOrInitialize(
      req.user.userId,
    );
  }

  @Post()
  @ApiCreatedResponse({
    type: UpdateDesiredConditionResponseDto,
    description: '希望条件の更新成功',
  })
  async update(
    @Request() req: { user: JwtPayload },
    @Body() dto: UpdateDesiredConditionDto,
  ) {
    const desiredCondition =
      await this.desiredConditionsService.findOrInitialize(req.user.userId);
    const assignedAttributesDesiredCondition =
      await this.desiredConditionsService.assignAttributes(
        desiredCondition,
        dto,
      );

    const validationErrors = await this.desiredConditionsService.validate(
      assignedAttributesDesiredCondition,
    );
    if (!!validationErrors.length) {
      return {
        profile: assignedAttributesDesiredCondition,
        errors: formatValidationErrors(validationErrors),
      };
    }

    try {
      const savedDesiredConditions = await this.desiredConditionsService.save(
        assignedAttributesDesiredCondition,
      );
      return {
        desiredCondition: savedDesiredConditions,
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
