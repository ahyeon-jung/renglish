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
/**
 *
 */
export class StatisticsApi extends runtime.BaseAPI {
  /**
   * 방문자 row 추가(관리자 전용)
   */
  async statisticControllerCreateStaticsRowRaw(initOverrides) {
    const queryParameters = {};
    const headerParameters = {};
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("token", []);
      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/statistics/visitor`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );
    return new runtime.VoidApiResponse(response);
  }
  /**
   * 방문자 row 추가(관리자 전용)
   */
  async statisticControllerCreateStaticsRow(initOverrides) {
    await this.statisticControllerCreateStaticsRowRaw(initOverrides);
  }
  /**
   * 현재 몇명이 방문했는지 조회합니다
   * 방문자 수 조회하기
   */
  async statisticControllerGetVisitorCountRaw(initOverrides) {
    const queryParameters = {};
    const headerParameters = {};
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("token", []);
      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/statistics/visitor/count`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );
    return new runtime.VoidApiResponse(response);
  }
  /**
   * 현재 몇명이 방문했는지 조회합니다
   * 방문자 수 조회하기
   */
  async statisticControllerGetVisitorCount(initOverrides) {
    await this.statisticControllerGetVisitorCountRaw(initOverrides);
  }
  /**
   * 현재 방문자를 식별하여 첫 방문의 경우 카운트합니다.
   * 방문자 수 업데이트하기
   */
  async statisticControllerUpdateVisitorCountRaw(initOverrides) {
    const queryParameters = {};
    const headerParameters = {};
    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token("token", []);
      if (tokenString) {
        headerParameters["Authorization"] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request(
      {
        path: `/api/statistics/visitor/count`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );
    return new runtime.VoidApiResponse(response);
  }
  /**
   * 현재 방문자를 식별하여 첫 방문의 경우 카운트합니다.
   * 방문자 수 업데이트하기
   */
  async statisticControllerUpdateVisitorCount(initOverrides) {
    await this.statisticControllerUpdateVisitorCountRaw(initOverrides);
  }
}
//# sourceMappingURL=StatisticsApi.js.map
