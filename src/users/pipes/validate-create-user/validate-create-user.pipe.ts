import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      let validateAge: number = Number(value.age.toString());
      if (isNaN(validateAge)) {
        throw new HttpException('Invalid age provided', HttpStatus.BAD_REQUEST);
      }
      return {
        ...value,
        age: validateAge,
      };
    } catch (error) {
      throw new HttpException(
        'Validation failed: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
