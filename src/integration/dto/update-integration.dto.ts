import { PartialType } from "@nestjs/mapped-types";
import e from "express";
import { CreateIntegrationDTO } from "./create-integration.dto";

export class UpdateIntegrationDto extends PartialType(CreateIntegrationDTO) {}