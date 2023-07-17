/**
 * ##### Device Detection helper functions
 */
export default class DeviceDetection {
  /**
   * ## Helper function to detect if the current user device is a touch device
   */
  static isTouchDevice(): boolean {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  /**
   * ## Helper function to detect if current user device is an iOS Device
   */
  static isIOSDevice() {
    return DeviceDetection.isIPhoneDevice() || DeviceDetection.isIPadDevice();
  }

  /**
   * ## Helper function to detect if current user device is an iPhone Device
   */
  static isIPhoneDevice() {
    const userAgent = navigator.userAgent;
    return !!userAgent.match(/iPhone/i);
  }

  /**
   * ## Helper function to detect if current user device is an iPad Device
   */
  static isIPadDevice() {
    const userAgent = navigator.userAgent;
    return !!userAgent.match(/iPad/i);
  }

  /**
   * ## Helper function to detect if current user browser is Edge
   */
  static isEdgeBrowser() {
    const userAgent = navigator.userAgent;
    return !!userAgent.match(/Edge\/\d+/i);
  }

  /**
   * Get a list of css classes with the boolean result of all
   * device detection functions
   */
  static devices(): object {
    return {
      "is-touch": DeviceDetection.isTouchDevice(),
      "is-ios": DeviceDetection.isIOSDevice(),
      "is-iphone": DeviceDetection.isIPhoneDevice(),
      "is-ipad": DeviceDetection.isIPadDevice(),
      "is-edge": DeviceDetection.isEdgeBrowser(),
    };
  }
}
