/* tslint:disable */
/* eslint-disable */
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
import type { CreateWritingDto } from "../models/index";
import { CreateWritingDtoFromJSON, CreateWritingDtoToJSON } from "../models/index";

export interface WritingControllerCreateRequest {
  dialogueId: string;
  createWritingDto: CreateWritingDto;
}

export interface WritingControllerFindAllByMovieIdRequest {
  movieId: string;
}

/**
 *
 */
export class WritingsApi extends runtime.BaseAPI {
  /**
   * 사용자가 작성한 대사의 대본을 저장합니다.
   * 사용자가 작성한 대사의 대본 저장하기 [TOKEN]
   */
  async writingControllerCreateRaw(
    requestParameters: WritingControllerCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters["dialogueId"] == null) {
      throw new runtime.RequiredError(
        "dialogueId",
        'Required parameter "dialogueId" was null or undefined when calling writingControllerCreate().',
      );
    }

    if (requestParameters["createWritingDto"] == null) {
      throw new runtime.RequiredError(
        "createWritingDto",
        'Required parameter "createWritingDto" was null or undefined when calling writingControllerCreate().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("token", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/writings/{dialogueId}`.replace(
          `{${"dialogueId"}}`,
          encodeURIComponent(String(requestParameters["dialogueId"])),
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateWritingDtoToJSON(requestParameters["createWritingDto"]),
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 사용자가 작성한 대사의 대본을 저장합니다.
   * 사용자가 작성한 대사의 대본 저장하기 [TOKEN]
   */
  async writingControllerCreate(
    requestParameters: WritingControllerCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.writingControllerCreateRaw(requestParameters, initOverrides);
  }

  /**
   * 사용자가 작성한 작문 정보를 가져옵니다.
   * 사용자가 작성한 작문 정보 가져오기 [TOKEN]
   */
  async writingControllerFindAllByMovieIdRaw(
    requestParameters: WritingControllerFindAllByMovieIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters["movieId"] == null) {
      throw new runtime.RequiredError(
        "movieId",
        'Required parameter "movieId" was null or undefined when calling writingControllerFindAllByMovieId().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("token", []);

      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/writings/{movieId}`.replace(
          `{${"movieId"}}`,
          encodeURIComponent(String(requestParameters["movieId"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 사용자가 작성한 작문 정보를 가져옵니다.
   * 사용자가 작성한 작문 정보 가져오기 [TOKEN]
   */
  async writingControllerFindAllByMovieId(
    requestParameters: WritingControllerFindAllByMovieIdRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.writingControllerFindAllByMovieIdRaw(requestParameters, initOverrides);
  }
}
