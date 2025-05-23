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
 * Check if a given object implements the CreateUserDto interface.
 */
export function instanceOfCreateUserDto(value) {
  if (!("provider" in value) || value["provider"] === undefined) return false;
  if (!("email" in value) || value["email"] === undefined) return false;
  if (!("nickname" in value) || value["nickname"] === undefined) return false;
  if (!("how" in value) || value["how"] === undefined) return false;
  if (!("password" in value) || value["password"] === undefined) return false;
  return true;
}
export function CreateUserDtoFromJSON(json) {
  return CreateUserDtoFromJSONTyped(json, false);
}
export function CreateUserDtoFromJSONTyped(json, ignoreDiscriminator) {
  if (json == null) {
    return json;
  }
  return {
    provider: json["provider"],
    email: json["email"],
    nickname: json["nickname"],
    how: json["how"],
    password: json["password"],
  };
}
export function CreateUserDtoToJSON(json) {
  return CreateUserDtoToJSONTyped(json, false);
}
export function CreateUserDtoToJSONTyped(value, ignoreDiscriminator = false) {
  if (value == null) {
    return value;
  }
  return {
    provider: value["provider"],
    email: value["email"],
    nickname: value["nickname"],
    how: value["how"],
    password: value["password"],
  };
}
//# sourceMappingURL=CreateUserDto.js.map
