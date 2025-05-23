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
/**
 *
 * @export
 * @interface Speaker
 */
export interface Speaker {
  /**
   * 아이디
   * @type {string}
   * @memberof Speaker
   */
  id: string;
  /**
   * 생성일
   * @type {Date}
   * @memberof Speaker
   */
  createdAt: Date;
  /**
   * 수정일
   * @type {Date}
   * @memberof Speaker
   */
  updatedAt: Date;
  /**
   * 삭제일
   * @type {Date}
   * @memberof Speaker
   */
  deletedAt: Date;
  /**
   *
   * @type {string}
   * @memberof Speaker
   */
  speakerName: string;
  /**
   *
   * @type {string}
   * @memberof Speaker
   */
  speakerType: string;
}
/**
 * Check if a given object implements the Speaker interface.
 */
export declare function instanceOfSpeaker(value: object): value is Speaker;
export declare function SpeakerFromJSON(json: any): Speaker;
export declare function SpeakerFromJSONTyped(json: any, ignoreDiscriminator: boolean): Speaker;
export declare function SpeakerToJSON(json: any): Speaker;
export declare function SpeakerToJSONTyped(
  value?: Speaker | null,
  ignoreDiscriminator?: boolean,
): any;
//# sourceMappingURL=Speaker.d.ts.map
