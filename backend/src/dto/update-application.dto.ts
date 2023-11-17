import { IsOptional, IsString, IsBoolean } from "class-validator";

export class updateApplicationDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    grouped?: boolean;
}