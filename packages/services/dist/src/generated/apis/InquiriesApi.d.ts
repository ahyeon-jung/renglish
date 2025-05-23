/**
 * Renglish API Swagger
 * Download: <a href=/api-docs-ahyeon-renglish-api/swagger-json target=\"_blank\">click here</a><br/><br/>github: <a href=\"https://github.com/ahyeon-jung/renglish\" target=\"_blank\">ahyeon-jung/renglish</a><br/>contact: ahyeon.aisha@gmail.com
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import * as runtime from "../runtime";
export interface InquiryControllerCreateRequest {
  body: object;
}
export interface InquiryControllerFindOneRequest {
  inquiryId: string;
}
export interface InquiryControllerRemoveRequest {
  inquiryId: string;
}
export interface InquiryControllerUpdateRequest {
  inquiryId: string;
  body: object;
}
/**
 *
 */
export declare class InquiriesApi extends runtime.BaseAPI {
  /**
   * 문의사항을 작성합니다.
   * 문의사항 작성 [TOKEN]
   */
  inquiryControllerCreateRaw(
    requestParameters: InquiryControllerCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;
  /**
   * 문의사항을 작성합니다.
   * 문의사항 작성 [TOKEN]
   */
  inquiryControllerCreate(
    requestParameters: InquiryControllerCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;
  /**
   * 모든 문의사항을 가져옵니다.
   * 모든 문의사항 가져오기
   */
  inquiryControllerFindAllRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;
  /**
   * 모든 문의사항을 가져옵니다.
   * 모든 문의사항 가져오기
   */
  inquiryControllerFindAll(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;
  /**
   * 해당 ID의 문의사항을 가져옵니다.
   * 해당 ID 문의사항 가져오기
   */
  inquiryControllerFindOneRaw(
    requestParameters: InquiryControllerFindOneRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;
  /**
   * 해당 ID의 문의사항을 가져옵니다.
   * 해당 ID 문의사항 가져오기
   */
  inquiryControllerFindOne(
    requestParameters: InquiryControllerFindOneRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;
  /**
   * 해당 ID의 문의사항을 삭제합니다.
   * 해당 ID 문의사항 삭제 [TOKEN]
   */
  inquiryControllerRemoveRaw(
    requestParameters: InquiryControllerRemoveRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;
  /**
   * 해당 ID의 문의사항을 삭제합니다.
   * 해당 ID 문의사항 삭제 [TOKEN]
   */
  inquiryControllerRemove(
    requestParameters: InquiryControllerRemoveRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;
  /**
   * 해당 ID의 문의사항을 업데이트합니다.
   * 문의사항 수정 [TOKEN]
   */
  inquiryControllerUpdateRaw(
    requestParameters: InquiryControllerUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>>;
  /**
   * 해당 ID의 문의사항을 업데이트합니다.
   * 문의사항 수정 [TOKEN]
   */
  inquiryControllerUpdate(
    requestParameters: InquiryControllerUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void>;
}
//# sourceMappingURL=InquiriesApi.d.ts.map
