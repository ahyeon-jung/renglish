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
/**
 * Check if a given object implements the VerifyCodeDto interface.
 */
export function instanceOfVerifyCodeDto(value) {
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("code" in value) || value["code"] === undefined) return false;
  return true;
}
export function VerifyCodeDtoFromJSON(json) {
  return VerifyCodeDtoFromJSONTyped(json, false);
}
export function VerifyCodeDtoFromJSONTyped(json, ignoreDiscriminator) {
  if (json == null) {
    return json;
  }
  return {
    email: json["email"],
    code: json["code"],
  };
}
export function VerifyCodeDtoToJSON(json) {
  return VerifyCodeDtoToJSONTyped(json, false);
}
export function VerifyCodeDtoToJSONTyped(value, ignoreDiscriminator = false) {
  if (value == null) {
    return value;
  }
  return {
    email: value["email"],
    code: value["code"],
  };
}
//# sourceMappingURL=VerifyCodeDto.js.map
