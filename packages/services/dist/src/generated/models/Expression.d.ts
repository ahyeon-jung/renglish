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
import type { ExampleDto } from "./ExampleDto";
/**
 *
 * @export
 * @interface Expression
 */
export interface Expression {
  /**
   * 아이디
   * @type {string}
   * @memberof Expression
   */
  id: string;
  /**
   * 생성일
   * @type {Date}
   * @memberof Expression
   */
  createdAt: Date;
  /**
   * 수정일
   * @type {Date}
   * @memberof Expression
   */
  updatedAt: Date;
  /**
   * 삭제일
   * @type {Date}
   * @memberof Expression
   */
  deletedAt: Date;
  /**
   *
   * @type {string}
   * @memberof Expression
   */
  expression: string;
  /**
   *
   * @type {string}
   * @memberof Expression
   */
  meaning: string;
  /**
   *
   * @type {string}
   * @memberof Expression
   */
  usage: string;
  /**
   * 영어 예문과 한글 번역 배열 (최대 2개)
   * @type {Array<ExampleDto>}
   * @memberof Expression
   */
  examples: Array<ExampleDto>;
}
/**
 * Check if a given object implements the Expression interface.
 */
export declare function instanceOfExpression(value: object): value is Expression;
export declare function ExpressionFromJSON(json: any): Expression;
export declare function ExpressionFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): Expression;
export declare function ExpressionToJSON(json: any): Expression;
export declare function ExpressionToJSONTyped(
  value?: Expression | null,
  ignoreDiscriminator?: boolean,
): any;
//# sourceMappingURL=Expression.d.ts.map
