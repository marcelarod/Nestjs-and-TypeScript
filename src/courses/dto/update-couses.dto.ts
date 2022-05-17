import { PartialType } from "@nestjs/mapped-types";
import { CreateCousesDto } from "./create-couses.dto";

export class UpdateCousesDto extends PartialType(CreateCousesDto) {}
