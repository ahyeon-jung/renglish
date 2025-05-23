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
import type { Movie } from "./Movie";
import type { Study } from "./Study";
import type { Dialogue } from "./Dialogue";
import type { Expression } from "./Expression";
import type { Speaker } from "./Speaker";
/**
 *
 * @export
 * @interface ExtendedSceneDto
 */
export interface ExtendedSceneDto {
  /**
   * 아이디
   * @type {string}
   * @memberof ExtendedSceneDto
   */
  id: string;
  /**
   * 생성일
   * @type {Date}
   * @memberof ExtendedSceneDto
   */
  createdAt: Date;
  /**
   * 수정일
   * @type {Date}
   * @memberof ExtendedSceneDto
   */
  updatedAt: Date;
  /**
   * 삭제일
   * @type {Date}
   * @memberof ExtendedSceneDto
   */
  deletedAt: Date;
  /**
   *
   * @type {string}
   * @memberof ExtendedSceneDto
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof ExtendedSceneDto
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof ExtendedSceneDto
   */
  audioUrl: string;
  /**
   *
   * @type {Movie}
   * @memberof ExtendedSceneDto
   */
  movie: Movie;
  /**
   *
   * @type {Study}
   * @memberof ExtendedSceneDto
   */
  study: Study;
  /**
   *
   * @type {Array<Speaker>}
   * @memberof ExtendedSceneDto
   */
  speakers: Array<Speaker>;
  /**
   *
   * @type {Array<Dialogue>}
   * @memberof ExtendedSceneDto
   */
  dialogues: Array<Dialogue>;
  /**
   *
   * @type {Array<Expression>}
   * @memberof ExtendedSceneDto
   */
  expressions: Array<Expression>;
}
/**
 * Check if a given object implements the ExtendedSceneDto interface.
 */
export declare function instanceOfExtendedSceneDto(value: object): value is ExtendedSceneDto;
export declare function ExtendedSceneDtoFromJSON(json: any): ExtendedSceneDto;
export declare function ExtendedSceneDtoFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ExtendedSceneDto;
export declare function ExtendedSceneDtoToJSON(json: any): ExtendedSceneDto;
export declare function ExtendedSceneDtoToJSONTyped(
  value?: ExtendedSceneDto | null,
  ignoreDiscriminator?: boolean,
): any;
//# sourceMappingURL=ExtendedSceneDto.d.ts.map
