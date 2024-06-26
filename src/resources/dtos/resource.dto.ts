import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  resourceTypeId: number;
}
