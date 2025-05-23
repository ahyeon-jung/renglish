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
/**
 *
 * @export
 * @interface CreateMovieDto
 */
export interface CreateMovieDto {
  /**
   * 영화 제목
   * @type {string}
   * @memberof CreateMovieDto
   */
  title: string;
  /**
   * 카테고리
   * @type {string}
   * @memberof CreateMovieDto
   */
  category: string;
  /**
   * 영화 이미지 주소
   * @type {string}
   * @memberof CreateMovieDto
   */
  imageUrl: string;
  /**
   * 영화 설명
   * @type {string}
   * @memberof CreateMovieDto
   */
  description: string;
}

/**
 * Check if a given object implements the CreateMovieDto interface.
 */
export function instanceOfCreateMovieDto(value: object): value is CreateMovieDto {
  if (!("title" in value) || value["title"] === undefined) return false;
  if (!("category" in value) || value["category"] === undefined) return false;
  if (!("imageUrl" in value) || value["imageUrl"] === undefined) return false;
  if (!("description" in value) || value["description"] === undefined) return false;
  return true;
}

export function CreateMovieDtoFromJSON(json: any): CreateMovieDto {
  return CreateMovieDtoFromJSONTyped(json, false);
}

export function CreateMovieDtoFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CreateMovieDto {
  if (json == null) {
    return json;
  }
  return {
    title: json["title"],
    category: json["category"],
    imageUrl: json["imageUrl"],
    description: json["description"],
  };
}

export function CreateMovieDtoToJSON(json: any): CreateMovieDto {
  return CreateMovieDtoToJSONTyped(json, false);
}

export function CreateMovieDtoToJSONTyped(
  value?: CreateMovieDto | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value;
  }

  return {
    title: value["title"],
    category: value["category"],
    imageUrl: value["imageUrl"],
    description: value["description"],
  };
}
