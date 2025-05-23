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
import type {
  CreateUserDto,
  LoginDto,
  LoginResponseDto,
  PasswordResetDto,
  TokensDto,
} from "../models/index";
import {
  CreateUserDtoFromJSON,
  CreateUserDtoToJSON,
  LoginDtoFromJSON,
  LoginDtoToJSON,
  LoginResponseDtoFromJSON,
  LoginResponseDtoToJSON,
  PasswordResetDtoFromJSON,
  PasswordResetDtoToJSON,
  TokensDtoFromJSON,
  TokensDtoToJSON,
} from "../models/index";

export interface AuthControllerCheckValidAccessTokenRequest {
  accessToken: string;
}

export interface AuthControllerLoginRequest {
  loginDto: LoginDto;
}

export interface AuthControllerPasswordResetRequest {
  passwordResetDto: PasswordResetDto;
}

export interface AuthControllerRegisterRequest {
  createUserDto: CreateUserDto;
}

/**
 *
 */
export class AuthApi extends runtime.BaseAPI {
  /**
   * 관리자 여부를 확인합니다.
   * 관리자 여부 확인
   */
  async authControllerCheckIsAdminRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<boolean>> {
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
        path: `/api/auth/check/is-admin`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    if (this.isJsonMime(response.headers.get("content-type"))) {
      return new runtime.JSONApiResponse<boolean>(response);
    } else {
      return new runtime.TextApiResponse(response) as any;
    }
  }

  /**
   * 관리자 여부를 확인합니다.
   * 관리자 여부 확인
   */
  async authControllerCheckIsAdmin(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<boolean> {
    const response = await this.authControllerCheckIsAdminRaw(initOverrides);
    return await response.value();
  }

  /**
   * 유효한 Access Token인지 확인합니다.
   * Access Token 유효성 확인
   */
  async authControllerCheckValidAccessTokenRaw(
    requestParameters: AuthControllerCheckValidAccessTokenRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<boolean>> {
    if (requestParameters["accessToken"] == null) {
      throw new runtime.RequiredError(
        "accessToken",
        'Required parameter "accessToken" was null or undefined when calling authControllerCheckValidAccessToken().',
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
        path: `/api/auth/check/{accessToken}`.replace(
          `{${"accessToken"}}`,
          encodeURIComponent(String(requestParameters["accessToken"])),
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    if (this.isJsonMime(response.headers.get("content-type"))) {
      return new runtime.JSONApiResponse<boolean>(response);
    } else {
      return new runtime.TextApiResponse(response) as any;
    }
  }

  /**
   * 유효한 Access Token인지 확인합니다.
   * Access Token 유효성 확인
   */
  async authControllerCheckValidAccessToken(
    requestParameters: AuthControllerCheckValidAccessTokenRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<boolean> {
    const response = await this.authControllerCheckValidAccessTokenRaw(
      requestParameters,
      initOverrides,
    );
    return await response.value();
  }

  /**
   * 구글 계정으로 로그인합니다.
   * 구글 로그인
   */
  async authControllerGoogleAuthRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
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
        path: `/api/auth/google`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 구글 계정으로 로그인합니다.
   * 구글 로그인
   */
  async authControllerGoogleAuth(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerGoogleAuthRaw(initOverrides);
  }

  /**
   * 구글 로그인 후 콜백을 처리합니다.
   * 구글 로그인 콜백
   */
  async authControllerGoogleAuthRedirectRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
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
        path: `/api/auth/google/callback`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 구글 로그인 후 콜백을 처리합니다.
   * 구글 로그인 콜백
   */
  async authControllerGoogleAuthRedirect(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerGoogleAuthRedirectRaw(initOverrides);
  }

  /**
   */
  async authControllerKakaoCallbackRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
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
        path: `/api/auth/kakao/callback`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   */
  async authControllerKakaoCallback(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerKakaoCallbackRaw(initOverrides);
  }

  /**
   * 카카오 계정으로 로그인합니다.
   * 카카오 로그인
   */
  async authControllerKakaoLoginRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
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
        path: `/api/auth/kakao`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 카카오 계정으로 로그인합니다.
   * 카카오 로그인
   */
  async authControllerKakaoLogin(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerKakaoLoginRaw(initOverrides);
  }

  /**
   * 사용자 로그인을 처리합니다.
   * 로그인
   */
  async authControllerLoginRaw(
    requestParameters: AuthControllerLoginRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<LoginResponseDto>> {
    if (requestParameters["loginDto"] == null) {
      throw new runtime.RequiredError(
        "loginDto",
        'Required parameter "loginDto" was null or undefined when calling authControllerLogin().',
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
        path: `/api/auth/login`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: LoginDtoToJSON(requestParameters["loginDto"]),
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      LoginResponseDtoFromJSON(jsonValue),
    );
  }

  /**
   * 사용자 로그인을 처리합니다.
   * 로그인
   */
  async authControllerLogin(
    requestParameters: AuthControllerLoginRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<LoginResponseDto> {
    const response = await this.authControllerLoginRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * 네이버 로그인 후 콜백을 처리합니다.
   * 네이버 로그인 콜백
   */
  async authControllerNaverCallbackRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
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
        path: `/api/auth/naver/callback`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 네이버 로그인 후 콜백을 처리합니다.
   * 네이버 로그인 콜백
   */
  async authControllerNaverCallback(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerNaverCallbackRaw(initOverrides);
  }

  /**
   * 네이버 계정으로 로그인합니다.
   * 네이버 로그인
   */
  async authControllerNaverLoginRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
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
        path: `/api/auth/naver`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 네이버 계정으로 로그인합니다.
   * 네이버 로그인
   */
  async authControllerNaverLogin(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerNaverLoginRaw(initOverrides);
  }

  /**
   * 비밀번호 초기화를 처리합니다.
   * 비밀번호 초기화
   */
  async authControllerPasswordResetRaw(
    requestParameters: AuthControllerPasswordResetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters["passwordResetDto"] == null) {
      throw new runtime.RequiredError(
        "passwordResetDto",
        'Required parameter "passwordResetDto" was null or undefined when calling authControllerPasswordReset().',
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
        path: `/api/auth/reset-password`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: PasswordResetDtoToJSON(requestParameters["passwordResetDto"]),
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 비밀번호 초기화를 처리합니다.
   * 비밀번호 초기화
   */
  async authControllerPasswordReset(
    requestParameters: AuthControllerPasswordResetRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerPasswordResetRaw(requestParameters, initOverrides);
  }

  /**
   * 유효한 Refresh Token을 이용해 새로운 Access Token과 Refresh Token을 발급받습니다.
   * Access Token 재발급
   */
  async authControllerRefreshRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TokensDto>> {
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
        path: `/api/auth/refresh`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    );

    return new runtime.JSONApiResponse(response, (jsonValue) => TokensDtoFromJSON(jsonValue));
  }

  /**
   * 유효한 Refresh Token을 이용해 새로운 Access Token과 Refresh Token을 발급받습니다.
   * Access Token 재발급
   */
  async authControllerRefresh(
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TokensDto> {
    const response = await this.authControllerRefreshRaw(initOverrides);
    return await response.value();
  }

  /**
   * 새로운 사용자를 등록합니다.
   * 회원가입
   */
  async authControllerRegisterRaw(
    requestParameters: AuthControllerRegisterRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters["createUserDto"] == null) {
      throw new runtime.RequiredError(
        "createUserDto",
        'Required parameter "createUserDto" was null or undefined when calling authControllerRegister().',
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
        path: `/api/auth/register`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: CreateUserDtoToJSON(requestParameters["createUserDto"]),
      },
      initOverrides,
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * 새로운 사용자를 등록합니다.
   * 회원가입
   */
  async authControllerRegister(
    requestParameters: AuthControllerRegisterRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.authControllerRegisterRaw(requestParameters, initOverrides);
  }
}
