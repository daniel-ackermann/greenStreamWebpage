// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiMainUrl: "https://localhost:4200",
    importPath: "api/import",
    itemsPath: "api/items",
    reviewedItemsPath: "api/items/reviewed",
    createdItemsPath: "api/items/created",
    likedItemsPath: "api/items/liked",
    reviewItemsPath: "api/items/review",
    watchedItemsPath: "api/items/watched",
    watchListItemsPath: "api/items/watchlist",
    topicsPath: "api/topics",
    typesPath: "api/types",
    loginPath: "login",
    logoutPath: "login",
    registerPath: "account",
    deregisterPath: "account",
    requestPasswordPath: "account",
    userPath: "api/user",
    languagesPath: "api/languages",
    feedbackItemsPath: "api/feedback/item",
    deleteFeedbackPath: "api/feedback",
    toggleLikePath:"api/items/status",
    version:"0.1.0"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.