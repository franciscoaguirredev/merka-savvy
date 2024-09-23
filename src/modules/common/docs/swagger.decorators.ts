import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ApiResponseDto,
  ApiErrorResponseDto,
  ApiErrorConflictDto,
  ApiErrorUnauthorizeDto,
  ApiResponseWhitMetaDataDto,
} from 'src/modules/common/docs';

/**
 * Applies common decorators to handle typical API responses, including error handling for bad requests.
 *
 * @template T The DTO (Data Transfer Object) class used for the successful response data.
 * @param {Type<T>} entity The DTO class that will be included in the successful response.
 * @returns Decorators that define common API responses.
 */

export function ApiCommonResponses<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto, ApiResponseDto),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

/**
 * Decorates a controller method to define an API response for successful entity creation.
 *
 * @template T The entity type (DTO) for which creation response is being defined.
 * @param {Type<T>} entity The DTO class representing the entity that was created.
 * @returns Decorators specifying a successful creation response.
 */
export function ApiCreateResponses<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiOkResponse({
      status: HttpStatus.CREATED,
      description: `${entity.name} was created`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(entity) },
            },
          },
        ],
      },
    })
  );
}

/**
 * Decorates a controller method to define a general successful API response.
 *
 * @template T The entity type (DTO) for which the success response is being defined.
 * @param {Type<T>} entity The DTO class representing the successful response data.
 * @returns Decorators specifying a successful API response.
 */

export function ApiSuccessResponses<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: `Request Succesfull`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(entity) },
            },
          },
        ],
      },
    })
  );
}

export function ApiSuccessResponsesArray<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiResponseDto),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: `Request Successful`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(entity) },
              },
            },
          },
        ],
      },
    })
  );
}

export function ApiSuccessMetaDataResponses<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(ApiResponseWhitMetaDataDto),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: `Request Succesfull`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseWhitMetaDataDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(entity) },
            },
          },
        ],
      },
    })
  );
}

/**
 * Decorates a controller method to define a response for bad requests.
 *
 * @returns Decorators specifying the API response for a bad request scenario.
 */
export function ApiBadRequest() {
  return applyDecorators(
    ApiExtraModels(ApiErrorResponseDto),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Bad request',
      schema: { $ref: getSchemaPath(ApiErrorResponseDto) },
    })
  );
}

/**
 * Decorates a controller method to define a response for conflicts, such as duplicate entries.
 *
 * @returns Decorators specifying the API response for a conflict scenario.
 */
export function ApiConflictError() {
  return applyDecorators(
    ApiExtraModels(ApiErrorConflictDto),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Conflict',
      schema: { $ref: getSchemaPath(ApiErrorConflictDto) },
    })
  );
}

/**
 * Decorates a controller method to define an unauthorized response, typically due to failed authentication.
 *
 * @returns Decorators specifying the API response for an unauthorized access scenario.
 */
export function ApiUnauthorized() {
  return applyDecorators(
    ApiExtraModels(ApiErrorUnauthorizeDto),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized',
      schema: { $ref: getSchemaPath(ApiErrorUnauthorizeDto) },
    })
  );
}
