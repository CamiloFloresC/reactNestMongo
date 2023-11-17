import { IsOptional, IsString } from 'class-validator';

export class updateGroupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
