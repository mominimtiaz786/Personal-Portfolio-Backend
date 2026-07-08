import { IsInt, IsUUID } from 'class-validator';

export class ReorderItemDto {
  @IsUUID()
  id: string;

  @IsInt()
  order: number;
}
