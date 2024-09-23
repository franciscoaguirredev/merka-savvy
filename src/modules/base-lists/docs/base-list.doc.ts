import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiParam } from "@nestjs/swagger";
import { 
    ApiBadRequest,
    ApiConflictError,
    ApiBadRequest as //ApiBadRequest,   
    //ApiConflictError,
    ApiCreateResponses,
    ApiSuccessResponses,
    ApiSuccessResponsesArray, 
} from 'src/modules/common/docs';


export function ApiDocCreateBaseList<T>(entity: Type<T>) {
    const description =
      'This endpoint creates a new BaseList with the provided products and customer information.';
    return applyDecorators(
      ApiOperation({
        summary: 'Create a new BaseList',
        description,
      }),
      ApiBody({ type: entity }),
      ApiSuccessResponses(entity),
    );
}

export function ApiDocFindAllBaseLists<T>(entity: Type<T>) {
    const description =
      'This endpoint returns all BaseLists registered in the system.';
    return applyDecorators(
      ApiOperation({
        summary: 'Get all BaseLists',
        description,
      }),
      ApiSuccessResponsesArray(entity),
      ApiBadRequest(),
    );
}

export function ApiDocGetAllBaseLists<T>(entity: Type<T>) {
    const description =
      'This endpoint returns all BaseLists including their products.';
    return applyDecorators(
      ApiOperation({
        summary: 'Get all BaseLists with products',
        description,
      }),
      ApiSuccessResponsesArray(entity),
      ApiConflictError()
    );
  }

export function ApiDocFindOneBaseList<T>(entity: Type<T>) {
    const description =
      'This endpoint returns a BaseList by its ID.';
    return applyDecorators(
      ApiOperation({
        summary: 'Find a BaseList by ID',
        description,
      }),
      ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the BaseList to retrieve',
      }),
      ApiSuccessResponses(entity),
      //ApiBadRequest(),
    );
}

export function ApiDocUpdateBaseList<T>(entity: Type<T>) {
    const description =
      'This endpoint updates an existing BaseList by its ID.';
    return applyDecorators(
      ApiOperation({
        summary: 'Update a BaseList',
        description,
      }),
      ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the BaseList to update',
      }),
      ApiBody({ type: entity }),
      ApiSuccessResponses(entity),
      //ApiBadRequest(),
      //ApiConflictError()
    );
  }


export function ApiDocDeleteBaseList() {
    const description =
      'This endpoint deletes a BaseList by its ID.';
    return applyDecorators(
      ApiOperation({
        summary: 'Delete a BaseList',
        description,
      }),
      ApiParam({
        name: 'id',
        required: true,
        description: 'ID of the BaseList to delete',
      }),
      ApiNoContentResponse({
        description: 'BaseList deleted successfully',
      }),
      //ApiBadRequest(),
      //ApiConflictError()
    );}

