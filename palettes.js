// Digitaliss Theme - Color Palette Definitions
// Each palette defines the full color set used by the build script to generate theme variants.

const dark = {
  name: "digitaliss",
  type: "dark",
  uiTheme: "vs-dark",

  // Syntax colors
  cyan: "#39e9ff",
  purple: "#9d74ff",
  lime: "#baff20",
  pink: "#ff0453",
  yellow: "#fff487",
  white: "#ffffff",
  fg: "#d8d6ce",
  fgMuted: "#d4d4d4",
  comment: "#6c6d998d",
  error: "#f44747",

  // Backgrounds
  editorBg: "#1a1925",
  sidebarBg: "#14131f",
  widgetBg: "#171620",
  shadowBg: "#12111b",
  listActiveBg: "#282639",
  selectionBg: "#152845",
  selectionBorder: "#556c8e",
  findMatchBg: "#515c6a",
  findMatchBorder: "#74879f",
  findMatchHighlightBg: "#ea5c0055",
  hoverHighlightBg: "#264f7840",
  wordHighlightBg: "#575757b8",
  wordHighlightStrongBg: "#004972b8",
  lineHighlightBg: "#ffffff0A",
  lineHighlightBorder: "#ffffff0e",
  foldBg: "#2b5d904d",

  // UI foregrounds
  uiFg: "#cccccc",
  uiFgMuted: "#bbbbbb",
  uiFgDim: "#cccccc99",
  accentBlue: "#007acc",
  accentLightBlue: "#4fa7ea",
  accentBrightBlue: "#3794ff",
  badgeBg: "#82b7f9",
  focusBorder: "#007fd4",
  progressBar: "#007acc",
  linkFg: "#3794ff",

  // Borders
  borderSubtle: "#ffffff28",
  borderMedium: "#ffffff32",
  borderStrong: "#ffffff59",
  borderBright: "#ffffff76",
  borderTransparent: "#00000000",
  borderMenu: "#00000085",

  // Editor details
  lineNumberFg: "#5b5b61",
  lineNumberActiveFg: "#e4e4e4",
  cursorFg: "#ffffff",
  cursorBg: "#000000",
  whitespaceFg: "#e3e4e229",
  indentGuideBg: "#ffffff46",
  indentGuideActiveBg: "#707070",
  rulerFg: "#5a5a5a",
  bracketMatchBg: "#0064001a",
  bracketMatchBorder: "#888888",
  codeLensFg: "#c4c4c4",

  // Scrollbar
  scrollbarBg: "#79797966",
  scrollbarHoverBg: "#646464b3",
  scrollbarActiveBg: "#bfbfbf66",

  // Buttons
  buttonBg: "#282639",
  buttonHoverBg: "#46435e",
  buttonSecondaryBg: "#3a3d41",
  buttonSecondaryHoverBg: "#45494e",

  // Input
  inputActiveBg: "#007fd466",
  inputActiveBorder: "#007acc00",
  placeholderFg: "#a6a6a6",

  // Tabs
  tabActiveBorder: "#00000000",
  tabInactiveFg: "#ffffff80",
  tabBorder: "#ffffff38",
  tabBarBorder: "#ffffff32",

  // Title bar
  titleInactiveBg: "#3c3c3c99",
  titleInactiveFg: "#cccccc99",

  // Status bar
  statusDebugBg: "#cc6633",
  statusNoFolderBg: "#68217a",
  statusRemoteBg: "#007acc",
  statusItemHoverBg: "#ffffff1f",
  statusItemActiveBg: "#FFFFFF25",

  // Git decorations
  gitAdded: "#b0da52",
  gitModified: "#ffb039",
  gitDeleted: "#ff4728",
  gitConflicting: "#6c6cc4",
  gitIgnored: "#6f6d67",
  gitUntracked: "#029636",
  gitStageDeleted: "#ff4a2a",
  gitStageModified: "#ffc978",
  gitSubmodule: "#8cc7ff",

  // Gutter
  gutterModified: "#04c8ff",
  gutterAdded: "#afff07",
  gutterDeleted: "#ff0511",
  gutterFolding: "#c5c5c5",

  // Diff
  diffInsertedBg: "#9bb95528",
  diffRemovedBg: "#ff000024",
  diffBorder: "#444444",

  // Merge
  mergeCurrentHeader: "#367366",
  mergeCurrentContent: "#27403B",
  mergeIncomingHeader: "#395F8F",
  mergeIncomingContent: "#28384B",
  mergeCommonHeader: "#1f1d30",

  // Peek view
  peekBorder: "#007acc",
  peekEditorBg: "#001f33",
  peekMatchHighlightBg: "#ff8f0099",
  peekMatchHighlightBorder: "#ee931e",
  peekResultMatchBg: "#ea5c004d",
  peekResultSelectionBg: "#3399ff33",

  // Suggest widget
  suggestSelectedBg: "#062f4a",
  suggestHighlightFg: "#0097fb",

  // Notifications
  errorIcon: "#f48771",
  warningIcon: "#cca700",
  infoIcon: "#75beff",
  notificationBorder: "#ffffff1c",
  notificationToastBorder: "#ffffff12",

  // Terminal
  terminalBg: "#14131F",
  terminalCursorBg: "#0087FF",
  terminalSelectionBg: "#ffffff40",
  ansiBlack: "#000000",
  ansiBlue: "#2472c8",
  ansiBrightBlack: "#666666",
  ansiBrightBlue: "#3b8eea",
  ansiBrightCyan: "#29b8db",
  ansiBrightGreen: "#23d18b",
  ansiBrightMagenta: "#d670d6",
  ansiBrightRed: "#f14c4c",
  ansiBrightWhite: "#e5e5e5",
  ansiBrightYellow: "#f5f543",
  ansiCyan: "#11a8cd",
  ansiGreen: "#0dbc79",
  ansiMagenta: "#bc3fbc",
  ansiRed: "#cd3131",
  ansiWhite: "#e5e5e5",
  ansiYellow: "#e5e510",

  // Breadcrumb
  breadcrumbFg: "#fdfdfdcc",
  breadcrumbFocusFg: "#e0e0e0",

  // Misc
  editorGroupBorder: "#ffffff76",
  listFilterBg: "#653723",
  listFilterNoMatch: "#be1100",
  treeIndentStroke: "#585858",
  walkThroughBg: "#00000050",
  settingsFocusedRow: "#ffffff07",
  debugToolbarBorder: "#eaeaea50",
  menuSeparator: "#bbbbbb",
  menuSelectionBg: "#ffffff1a",
  widgetResizeBorder: "#ffffff2c",
  pickerGroupBorder: "#ffffff26",
  pickerGroupFg: "#54b2f9",
  panelActiveBorder: "#e7e7e7",
  panelActiveFg: "#e7e7e7",
  panelInactiveFg: "#e7e7e799",
  editorOverviewBg: "#25252500",
  editorOverviewBorder: "#7f7f7f4d",
  editorErrorBg: "#B73A3400",
  editorWarningBg: "#A9904000",
  editorInfoBg: "#4490BF00",
};

const pastel = {
  ...dark,
  name: "digitaliss Pastel",

  // Softer, muted syntax colors
  cyan: "#7ec8d4",
  purple: "#b9a4e0",
  lime: "#a8d98a",
  pink: "#e88a9f",
  yellow: "#e8d4a0",
  comment: "#7a7b9e99",

  // Slightly lighter backgrounds
  editorBg: "#1e1d2b",
  sidebarBg: "#1a1928",
  widgetBg: "#1c1b28",
  shadowBg: "#161520",
  listActiveBg: "#2d2c3e",
  terminalBg: "#1a1928",
  selectionBg: "#1a3050",

  // Adjusted gutter colors to match palette
  gutterModified: "#7ec8d4",
  gutterAdded: "#a8d98a",
  gutterDeleted: "#e88a9f",

  // Adjusted git colors
  gitAdded: "#a8d98a",
  gitModified: "#e8d4a0",
  gitDeleted: "#e88a9f",

  // Softer badge
  badgeBg: "#9db8d4",

  // Adjusted diff
  diffInsertedBg: "#a8d98a22",
  diffRemovedBg: "#e88a9f22",
};

const light = {
  ...dark,
  name: "digitaliss Light",
  type: "light",
  uiTheme: "vs",

  // Syntax colors adapted for light backgrounds
  cyan: "#0184bc",
  purple: "#7c4dff",
  lime: "#50a14f",
  pink: "#e01050",
  yellow: "#986801",
  white: "#000000",
  fg: "#383a42",
  fgMuted: "#4a4a4a",
  comment: "#a0a1a7",
  error: "#e45649",

  // Light backgrounds
  editorBg: "#fafafa",
  sidebarBg: "#f0f0f3",
  widgetBg: "#f5f5f7",
  shadowBg: "#00000020",
  listActiveBg: "#e8e8ed",
  selectionBg: "#c8ddf5",
  selectionBorder: "#a0b8d0",
  findMatchBg: "#e2c08d",
  findMatchBorder: "#c9a060",
  findMatchHighlightBg: "#ea5c0044",
  hoverHighlightBg: "#0000000a",
  wordHighlightBg: "#d0d0d0a0",
  wordHighlightStrongBg: "#a8c8e8a0",
  lineHighlightBg: "#00000008",
  lineHighlightBorder: "#00000010",
  foldBg: "#d0e0f020",

  // UI foregrounds
  uiFg: "#383a42",
  uiFgMuted: "#6a6a6a",
  uiFgDim: "#383a4299",
  accentBlue: "#4078f2",
  accentLightBlue: "#4078f2",
  accentBrightBlue: "#4078f2",
  badgeBg: "#4078f2",
  focusBorder: "#4078f2",
  progressBar: "#4078f2",
  linkFg: "#4078f2",

  // Borders
  borderSubtle: "#00000015",
  borderMedium: "#00000020",
  borderStrong: "#00000030",
  borderBright: "#00000040",
  borderTransparent: "#00000000",
  borderMenu: "#00000020",

  // Editor details
  lineNumberFg: "#9d9d9f",
  lineNumberActiveFg: "#383a42",
  cursorFg: "#526fff",
  cursorBg: "#ffffff",
  whitespaceFg: "#00000015",
  indentGuideBg: "#00000015",
  indentGuideActiveBg: "#00000040",
  rulerFg: "#d0d0d0",
  bracketMatchBg: "#a0d0a030",
  bracketMatchBorder: "#b0b0b0",
  codeLensFg: "#999999",

  // Scrollbar
  scrollbarBg: "#00000020",
  scrollbarHoverBg: "#00000040",
  scrollbarActiveBg: "#00000060",

  // Buttons
  buttonBg: "#4078f2",
  buttonHoverBg: "#5589f5",
  buttonSecondaryBg: "#e0e0e3",
  buttonSecondaryHoverBg: "#d0d0d5",

  // Input
  inputActiveBg: "#4078f266",
  inputActiveBorder: "#4078f200",
  placeholderFg: "#a0a0a0",

  // Tabs
  tabActiveBorder: "#00000000",
  tabInactiveFg: "#383a4280",
  tabBorder: "#00000015",
  tabBarBorder: "#00000015",

  // Title bar
  titleInactiveBg: "#f0f0f399",
  titleInactiveFg: "#383a4299",

  // Status bar
  statusDebugBg: "#f5a623",
  statusNoFolderBg: "#9b59b6",
  statusRemoteBg: "#4078f2",
  statusItemHoverBg: "#0000000f",
  statusItemActiveBg: "#00000015",

  // Git decorations
  gitAdded: "#50a14f",
  gitModified: "#c18401",
  gitDeleted: "#e45649",
  gitConflicting: "#7c4dff",
  gitIgnored: "#a0a1a7",
  gitUntracked: "#50a14f",
  gitStageDeleted: "#e45649",
  gitStageModified: "#c18401",
  gitSubmodule: "#4078f2",

  // Gutter
  gutterModified: "#4078f2",
  gutterAdded: "#50a14f",
  gutterDeleted: "#e45649",
  gutterFolding: "#999999",

  // Diff
  diffInsertedBg: "#50a14f20",
  diffRemovedBg: "#e4564920",
  diffBorder: "#d0d0d0",

  // Merge
  mergeCurrentHeader: "#50a14f60",
  mergeCurrentContent: "#50a14f30",
  mergeIncomingHeader: "#4078f260",
  mergeIncomingContent: "#4078f230",
  mergeCommonHeader: "#e0e0e3",

  // Peek view
  peekBorder: "#4078f2",
  peekEditorBg: "#f0f4ff",
  peekMatchHighlightBg: "#e2c08d99",
  peekMatchHighlightBorder: "#c9a060",
  peekResultMatchBg: "#ea5c0030",
  peekResultSelectionBg: "#4078f233",

  // Suggest widget
  suggestSelectedBg: "#e8e8ed",
  suggestHighlightFg: "#4078f2",

  // Notifications
  errorIcon: "#e45649",
  warningIcon: "#c18401",
  infoIcon: "#4078f2",
  notificationBorder: "#00000015",
  notificationToastBorder: "#00000010",

  // Terminal
  terminalBg: "#f0f0f3",
  terminalCursorBg: "#4078f2",
  terminalSelectionBg: "#00000020",
  ansiBlack: "#383a42",
  ansiBlue: "#4078f2",
  ansiBrightBlack: "#a0a1a7",
  ansiBrightBlue: "#5589f5",
  ansiBrightCyan: "#0184bc",
  ansiBrightGreen: "#50a14f",
  ansiBrightMagenta: "#a626a4",
  ansiBrightRed: "#e45649",
  ansiBrightWhite: "#383a42",
  ansiBrightYellow: "#c18401",
  ansiCyan: "#0997b3",
  ansiGreen: "#44a14f",
  ansiMagenta: "#a626a4",
  ansiRed: "#e45649",
  ansiWhite: "#f0f0f3",
  ansiYellow: "#c18401",

  // Breadcrumb
  breadcrumbFg: "#383a42cc",
  breadcrumbFocusFg: "#383a42",

  // Misc
  editorGroupBorder: "#00000020",
  listFilterBg: "#e2c08d",
  listFilterNoMatch: "#e45649",
  treeIndentStroke: "#d0d0d0",
  walkThroughBg: "#00000008",
  settingsFocusedRow: "#00000005",
  debugToolbarBorder: "#00000020",
  menuSeparator: "#d0d0d0",
  menuSelectionBg: "#0000000a",
  widgetResizeBorder: "#00000020",
  pickerGroupBorder: "#00000015",
  pickerGroupFg: "#4078f2",
  panelActiveBorder: "#383a42",
  panelActiveFg: "#383a42",
  panelInactiveFg: "#383a4299",
  editorOverviewBg: "#fafafa00",
  editorOverviewBorder: "#0000001a",
  editorErrorBg: "#e4564900",
  editorWarningBg: "#c1840100",
  editorInfoBg: "#4078f200",
};

module.exports = { dark, pastel, light };
