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
import type { User } from "./User";
import { UserFromJSON, UserFromJSONTyped, UserToJSON, UserToJSONTyped } from "./User";
import type { Scene } from "./Scene";
import { SceneFromJSON, SceneFromJSONTyped, SceneToJSON, SceneToJSONTyped } from "./Scene";

/**
 *
 * @export
 * @interface Study
 */
export interface Study {
  /**
   * 아이디
   * @type {string}
   * @memberof Study
   */
  id: string;
  /**
   * 생성일
   * @type {Date}
   * @memberof Study
   */
  createdAt: Date;
  /**
   * 수정일
   * @type {Date}
   * @memberof Study
   */
  updatedAt: Date;
  /**
   * 삭제일
   * @type {Date}
   * @memberof Study
   */
  deletedAt: Date;
  /**
   * 스터디 진행 일자
   * @type {Date}
   * @memberof Study
   */
  studiedAt: Date;
  /**
   * 스터디 제목
   * @type {string}
   * @memberof Study
   */
  title: string;
  /**
   * 스터디 설명
   * @type {string}
   * @memberof Study
   */
  description: string;
  /**
   * 스터디 완료 여부
   * @type {boolean}
   * @memberof Study
   */
  isCompleted: boolean;
  /**
   *
   * @type {Scene}
   * @memberof Study
   */
  scene: Scene;
  /**
   * 스터디 신청자
   * @type {Array<User>}
   * @memberof Study
   */
  applicants?: Array<User>;
  /**
   * 스터디 참여자
   * @type {Array<User>}
   * @memberof Study
   */
  participants?: Array<User>;
}

/**
 * Check if a given object implements the Study interface.
 */
export function instanceOfStudy(value: object): value is Study {
  if (!("id" in value) || value["id"] === undefined) return false;
  if (!("createdAt" in value) || value["createdAt"] === undefined) return false;
  if (!("updatedAt" in value) || value["updatedAt"] === undefined) return false;
  if (!("deletedAt" in value) || value["deletedAt"] === undefined) return false;
  if (!("studiedAt" in value) || value["studiedAt"] === undefined) return false;
  if (!("title" in value) || value["title"] === undefined) return false;
  if (!("description" in value) || value["description"] === undefined) return false;
  if (!("isCompleted" in value) || value["isCompleted"] === undefined) return false;
  if (!("scene" in value) || value["scene"] === undefined) return false;
  return true;
}

export function StudyFromJSON(json: any): Study {
  return StudyFromJSONTyped(json, false);
}

export function StudyFromJSONTyped(json: any, ignoreDiscriminator: boolean): Study {
  if (json == null) {
    return json;
  }
  return {
    id: json["id"],
    createdAt: new Date(json["createdAt"]),
    updatedAt: new Date(json["updatedAt"]),
    deletedAt: new Date(json["deletedAt"]),
    studiedAt: new Date(json["studiedAt"]),
    title: json["title"],
    description: json["description"],
    isCompleted: json["isCompleted"],
    scene: SceneFromJSON(json["scene"]),
    applicants:
      json["applicants"] == null ? undefined : (json["applicants"] as Array<any>).map(UserFromJSON),
    participants:
      json["participants"] == null
        ? undefined
        : (json["participants"] as Array<any>).map(UserFromJSON),
  };
}

export function StudyToJSON(json: any): Study {
  return StudyToJSONTyped(json, false);
}

export function StudyToJSONTyped(value?: Study | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    id: value["id"],
    createdAt: value["createdAt"].toISOString(),
    updatedAt: value["updatedAt"].toISOString(),
    deletedAt: value["deletedAt"].toISOString(),
    studiedAt: value["studiedAt"].toISOString(),
    title: value["title"],
    description: value["description"],
    isCompleted: value["isCompleted"],
    scene: SceneToJSON(value["scene"]),
    applicants:
      value["applicants"] == null ? undefined : (value["applicants"] as Array<any>).map(UserToJSON),
    participants:
      value["participants"] == null
        ? undefined
        : (value["participants"] as Array<any>).map(UserToJSON),
  };
}
