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

import { mapValues } from "../runtime";
import type { PublicUserDto } from "./PublicUserDto";
import {
  PublicUserDtoFromJSON,
  PublicUserDtoFromJSONTyped,
  PublicUserDtoToJSON,
  PublicUserDtoToJSONTyped,
} from "./PublicUserDto";

/**
 *
 * @export
 * @interface PaginationUserResponseDto
 */
export interface PaginationUserResponseDto {
  /**
   * 전체 항목 수
   * @type {number}
   * @memberof PaginationUserResponseDto
   */
  totalCount: number;
  /**
   * 현재 페이지 번호
   * @type {number}
   * @memberof PaginationUserResponseDto
   */
  currentPage: number;
  /**
   * 페이지당 항목 수
   * @type {number}
   * @memberof PaginationUserResponseDto
   */
  limit: number;
  /**
   * 응답 데이터 배열
   * @type {Array<PublicUserDto>}
   * @memberof PaginationUserResponseDto
   */
  data: Array<PublicUserDto>;
}

/**
 * Check if a given object implements the PaginationUserResponseDto interface.
 */
export function instanceOfPaginationUserResponseDto(
  value: object,
): value is PaginationUserResponseDto {
  if (!("totalCount" in value) || value["totalCount"] === undefined) return false;
  if (!("currentPage" in value) || value["currentPage"] === undefined) return false;
  if (!("limit" in value) || value["limit"] === undefined) return false;
  if (!("data" in value) || value["data"] === undefined) return false;
  return true;
}

export function PaginationUserResponseDtoFromJSON(json: any): PaginationUserResponseDto {
  return PaginationUserResponseDtoFromJSONTyped(json, false);
}

export function PaginationUserResponseDtoFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): PaginationUserResponseDto {
  if (json == null) {
    return json;
  }
  return {
    totalCount: json["totalCount"],
    currentPage: json["currentPage"],
    limit: json["limit"],
    data: (json["data"] as Array<any>).map(PublicUserDtoFromJSON),
  };
}

export function PaginationUserResponseDtoToJSON(json: any): PaginationUserResponseDto {
  return PaginationUserResponseDtoToJSONTyped(json, false);
}

export function PaginationUserResponseDtoToJSONTyped(
  value?: PaginationUserResponseDto | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value;
  }

  return {
    totalCount: value["totalCount"],
    currentPage: value["currentPage"],
    limit: value["limit"],
    data: (value["data"] as Array<any>).map(PublicUserDtoToJSON),
  };
}
