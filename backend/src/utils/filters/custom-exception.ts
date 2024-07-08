import { HttpStatus } from '@nestjs/common'

export class CustomException {
  constructor(readonly message: string, readonly status: HttpStatus) {}
}
