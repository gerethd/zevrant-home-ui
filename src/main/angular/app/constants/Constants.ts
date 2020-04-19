import {environment} from "../../environments/environment";

export class Constants {

  public static get oauthTokenName(): string {
    return "LOCAL_STORAGE_TOKEN";
  }

  public static get expiresInName(): string {
    return "EXPIRES_IN";
  }

  public static get oauthBaseUrl(): string {
    return "zevrant-oauth2-service/";
  }

  public static get username() {
    return "USERNAME"
  }

  public static get modelBaseUrl() {
    return "zuul/zevrant-model-service/";
  }

  public static get baseUrl(): string {
      return "https://zevrant-services.com:7644/zevrant-home-ui/"
  }
}
