import { PartialType } from "@nestjs/mapped-types";
import { CreatePackageDTO } from "./create-package.dto";

export class UpdatePackageDTO extends PartialType(CreatePackageDTO) {
}