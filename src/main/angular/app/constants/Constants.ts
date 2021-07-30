export const PRINTS_ROLE: string = "prints";
export const ADMIN_ROLE: string = "admin";
export const CAMERA_ROLE: string = "camera";

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
        return "zevrant-model-service/";
    }

    public static get outsourceBaseUrl() {
        return "zevrant-outsource-service/";
    }

    public static get baseUrl(): string {
        return "http://localhost:7644/zevrant-home-ui/";
        // return "https://zevrant-services.com:7644/zevrant-home-ui/";
    }

    public static getCultsUrl() {
        return "https://cults3d.com";
    }


}
