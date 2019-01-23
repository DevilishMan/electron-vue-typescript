export class Utils {
  public static Config: { [key: string]: any } = {
    pageSize: 15,
  };
  public static isAppClient(): boolean {
    return window.navigator.userAgent.includes('Electron');
  }
}