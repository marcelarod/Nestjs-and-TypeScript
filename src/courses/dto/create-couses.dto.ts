import { IsString } from "class-validator";

export class CreateCousesDto {
    @IsString()
   readonly name: string;

   @IsString()
   readonly description: string;

   @IsString({each: true})
   readonly tags: string[];
}
