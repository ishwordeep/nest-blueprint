import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly config: ConfigService) {
    super();
  }
}