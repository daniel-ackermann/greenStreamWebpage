// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    apiMainUrl: "https://appsterdb.ackermann.digital",
    importPath: "api/import",
    itemsPath: "api/items",
    itemPath: "api/item",
    reviewedItemsPath: "api/items/reviewed",
    createdItemsPath: "api/items/created",
    likedItemsPath: "api/items/liked",
    reviewItemsPath: "api/items/review",
    reviewItemPath: "api/item/review",
    watchedItemsPath: "api/items/watched",
    watchListItemsPath: "api/items/watchlist",
    topicsPath: "api/topics",
    typesPath: "api/types",
    loginPath: "login",
    logoutPath: "login",
    registerPath: "account",
    deregisterPath: "account",
    requestPasswordPath: "account",
    setPassword: "passwordRestore",
    userPath: "api/user",
    languagesPath: "api/languages",
    feedbackItemsPath: "api/feedbacks/item",
    allFeedbackItemsPath: "api/items/feedbacks",
    feedbacksPath: "api/feedbacks",
    deleteFeedbackPath: "api/feedback",
    toggleLikePath: "api/item/status",
    labelItemPath: "api/labels/item",
    labelsPath: "api/labels",
    setFeedbackDoneByLabel: "api/feedbacks/status",
    toggleFeedbackStatus: "api/feedback/status",
    version: "0.1.3"
};