/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/AcrionButton` | `/Download` | `/Home` | `/Setting` | `/Style` | `/Team` | `/Upload` | `/_sitemap`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
