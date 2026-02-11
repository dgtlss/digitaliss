#!/usr/bin/env node

// Digitaliss Theme Build Script
// Generates all theme variants from palette definitions.
// Usage: node build.js

const fs = require("fs");
const path = require("path");
const { dark, pastel, light } = require("./palettes");

const palettes = [dark, pastel, light];

function buildSemanticTokenColors(p, italic) {
  const itl = italic ? "italic" : "";
  return {
    enumMember: { foreground: p.cyan },
    "variable.constant": { foreground: p.purple },
    "variable.defaultLibrary": { foreground: p.lime },
    function: { foreground: p.pink },
    method: { foreground: p.pink },
    "function.declaration": { foreground: p.pink },
    "method.declaration": { foreground: p.pink },
    "function.defaultLibrary": { foreground: p.cyan },
    property: { foreground: p.fg },
    "property.readonly": { foreground: p.purple },
    parameter: { foreground: p.fgMuted },
    variable: { foreground: p.fg },
    "variable.readonly": { foreground: p.purple },
    "variable.local": { foreground: p.fg },
    type: { foreground: p.lime, ...(italic && { fontStyle: itl }) },
    interface: { foreground: p.lime, ...(italic && { fontStyle: itl }) },
    class: { foreground: p.lime },
    struct: { foreground: p.lime },
    typeParameter: { foreground: p.lime, fontStyle: "italic" },
    enum: { foreground: p.cyan },
    namespace: { foreground: p.lime },
    macro: { foreground: p.pink },
    decorator: { foreground: p.cyan },
    string: { foreground: p.yellow },
    number: { foreground: p.purple },
    regexp: { foreground: p.cyan },
    keyword: { foreground: p.pink, ...(italic && { fontStyle: itl }) },
    comment: { foreground: p.comment, fontStyle: "italic" },
    operator: { foreground: p.fgMuted },
    selfKeyword: { foreground: p.lime, fontStyle: "italic" },
    builtinType: { foreground: p.cyan },
    "type.defaultLibrary": { foreground: p.cyan },
    "property.declaration": { foreground: p.fg },
    event: { foreground: p.fg },
    label: { foreground: p.fg },
  };
}

function buildTokenColors(p, italic) {
  const itl = italic ? "italic" : "";

  // Helper to conditionally add italic fontStyle
  const kw = (fg) =>
    italic ? { foreground: fg, fontStyle: itl } : { foreground: fg };
  const storageStyle = (fg) =>
    italic ? { foreground: fg, fontStyle: itl } : { foreground: fg };

  return [
    // ============================================================
    // GENERIC / CROSS-LANGUAGE RULES
    // ============================================================

    // Comments
    {
      name: "Comments",
      scope: "comment, punctuation.definition.comment",
      settings: { fontStyle: "italic", foreground: p.comment },
    },
    {
      name: "Block comments",
      scope: "comment.line.double-slash,comment.block.documentation",
      settings: { fontStyle: "italic" },
    },

    // Keywords
    {
      name: "Keywords",
      scope: "keyword",
      settings: kw(p.pink),
    },
    {
      name: "Keyword Control",
      scope: "keyword.control",
      settings: kw(p.pink),
    },
    {
      name: "Storage",
      scope: "storage",
      settings: storageStyle(p.pink),
    },
    {
      name: "Storage JS TS",
      scope: "token.storage",
      settings: storageStyle(p.pink),
    },

    // Variables
    {
      name: "Variables",
      scope: "variable",
      settings: { foreground: p.fg },
    },
    {
      name: "Language variables",
      scope: "variable.language",
      settings: { foreground: p.lime, fontStyle: "italic" },
    },
    {
      name: "Variable parameter",
      scope: "variable.parameter.function",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Variable other constant",
      scope: "variable.other.constant",
      settings: { foreground: p.lime },
    },

    // Functions
    {
      name: "Functions",
      scope: [
        "entity.name.function",
        "meta.require",
        "support.function.any-method",
        "variable.function",
      ],
      settings: { foreground: p.pink },
    },
    {
      name: "Support function",
      scope: "support.function",
      settings: { foreground: p.cyan },
    },
    {
      name: "Function call console",
      scope: "entity.name.function,support.function.console",
      settings: { foreground: p.pink },
    },

    // Classes / Types
    {
      name: "Classes",
      scope: "support.class, entity.name.type.class",
      settings: { foreground: p.lime },
    },
    {
      name: "Class name",
      scope: [
        "entity.name.class",
        "variable.other.class.js",
        "variable.other.class.ts",
      ],
      settings: { foreground: p.lime },
    },
    {
      name: "Type Name",
      scope: "entity.name.type",
      settings: { foreground: p.lime },
    },
    {
      name: "Namespaces",
      scope: "entity.name.namespace",
      settings: { foreground: p.lime },
    },
    {
      name: "Type namespace",
      scope: "entity.name.type.namespace",
      settings: { foreground: p.lime },
    },
    {
      name: "Inherited Class",
      scope: "entity.other.inherited-class",
      settings: { foreground: p.lime },
    },
    {
      name: "Class name identifier",
      scope: "entity.name.class.identifier.namespace.type",
      settings: { foreground: p.lime },
    },

    // Strings
    {
      name: "Strings",
      scope: "string",
      settings: { foreground: p.yellow },
    },
    {
      name: "String punctuation",
      scope:
        "punctuation.definition.string.begin,punctuation.definition.string.end",
      settings: { foreground: p.yellow },
    },

    // Constants & Numbers
    {
      name: "Constants",
      scope: "constant",
      settings: { foreground: p.purple },
    },
    {
      name: "Integers",
      scope: "constant.numeric",
      settings: { foreground: p.purple },
    },
    {
      name: "Constant definition",
      scope: "punctuation.definition.constant",
      settings: { foreground: p.purple },
    },
    {
      name: "Constant other symbol",
      scope: "constant.other.symbol",
      settings: { foreground: p.cyan },
    },

    // Operators
    {
      name: "Operators",
      scope: "keyword.operator",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Operator logical",
      scope: "keyword.operator.logical",
      settings: { foreground: p.cyan },
    },
    {
      name: "Operator bitwise",
      scope: "keyword.operator.bitwise",
      settings: { foreground: p.cyan },
    },
    {
      name: "Operator channel",
      scope: "keyword.operator.channel",
      settings: { foreground: p.cyan },
    },
    {
      name: "Operator arithmetic/comparison",
      scope:
        "keyword.operator.arithmetic,keyword.operator.comparison,keyword.operator.decrement,keyword.operator.increment,keyword.operator.relational",
      settings: { foreground: p.cyan },
    },
    {
      name: "Compound Assignment Operators",
      scope: "keyword.operator.assignment.compound",
      settings: { foreground: p.pink },
    },
    {
      name: "Assignment operator",
      scope: "keyword.operator.assignment",
      settings: { foreground: p.cyan },
    },
    {
      name: "Operator delete",
      scope: "keyword.operator.delete",
      settings: { foreground: p.pink },
    },

    // Punctuation
    {
      name: "Punctuation separator delimiter",
      scope: "punctuation.separator.delimiter",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Punctuation separator key-value",
      scope: "punctuation.separator.key-value",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Meta tag",
      scope: "meta.tag",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Meta brace square",
      scope: "meta.brace.square",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Block scope",
      scope: "block.scope.end,block.scope.begin",
      settings: { foreground: p.fgMuted },
    },

    // Tags & Attributes (HTML)
    {
      name: "Tags",
      scope: "entity.name.tag",
      settings: { foreground: p.fg },
    },
    {
      name: "Attributes",
      scope: "entity.other.attribute-name",
      settings: { foreground: p.purple },
    },
    {
      name: "Attribute IDs",
      scope: "entity.other.attribute-name.id",
      settings: { fontStyle: "normal", foreground: p.pink },
    },
    {
      name: "Attribute class (CSS)",
      scope: "entity.other.attribute-name.class.css",
      settings: { fontStyle: "normal", foreground: p.purple },
    },

    // Support types
    {
      name: "Support type property-name",
      scope: "support.type.property-name",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Support constant property-value",
      scope: "support.constant.property-value",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Support constant font-name",
      scope: "support.constant.font-name",
      settings: { foreground: p.purple },
    },

    // Methods
    {
      name: "Methods",
      scope: "keyword.other.special-method",
      settings: { foreground: p.pink },
    },

    // Control Elements
    {
      name: "Control Elements",
      scope: "control.elements, keyword.operator.less",
      settings: { foreground: p.purple },
    },

    // Units
    {
      name: "Units",
      scope: "keyword.other.unit",
      settings: { foreground: p.fg },
    },

    // Selector
    {
      name: "Selector",
      scope: "meta.selector",
      settings: { foreground: p.pink },
    },

    // Regexp
    {
      name: "Regular Expressions",
      scope: "string.regexp",
      settings: { foreground: p.cyan },
    },
    {
      name: "Regexp constant character-class",
      scope: "constant.other.character-class.regexp",
      settings: { foreground: p.fg },
    },
    {
      name: "Regexp operator.quantifier",
      scope: "keyword.operator.quantifier.regexp",
      settings: { foreground: p.purple },
    },

    // Escape characters
    {
      name: "Escape Characters",
      scope: "constant.character.escape",
      settings: { foreground: p.cyan },
    },

    // Embedded
    {
      name: "Embedded",
      scope: "punctuation.section.embedded, variable.interpolation",
      settings: { foreground: p.fg },
    },
    {
      name: "Embedded begin/end",
      scope:
        "punctuation.section.embedded.begin,punctuation.section.embedded.end",
      settings: { foreground: p.pink },
    },

    // Invalid
    {
      name: "Invalid illegal",
      scope: "invalid.illegal",
      settings: { foreground: p.white },
    },
    {
      name: "Invalid illegal HTML",
      scope: "invalid.illegal.bad-ampersand.html",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Broken",
      scope: "invalid.broken",
      settings: { foreground: p.white },
    },
    {
      name: "Deprecated",
      scope: "invalid.deprecated",
      settings: { foreground: p.white },
    },
    {
      name: "Unimplemented",
      scope: "invalid.unimplemented",
      settings: { foreground: p.white },
    },

    // String interpolation
    {
      name: "String interpolation",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
      ],
      settings: { foreground: p.pink },
    },
    {
      name: "Template expression reset",
      scope: "meta.template.expression",
      settings: { foreground: p.fgMuted },
    },

    // Token info/warn/error/debug
    {
      scope: "token.info-token",
      settings: { foreground: p.pink },
    },
    {
      scope: "token.warn-token",
      settings: { foreground: p.purple },
    },
    {
      scope: "token.error-token",
      settings: { foreground: p.error },
    },
    {
      scope: "token.debug-token",
      settings: { foreground: p.pink },
    },

    // ============================================================
    // DIFF
    // ============================================================
    {
      name: "Markup diff changed",
      scope: "markup.changed.diff",
      settings: { foreground: p.lime },
    },
    {
      name: "Diff headers",
      scope:
        "meta.diff.header.from-file,meta.diff.header.to-file,punctuation.definition.from-file.diff,punctuation.definition.to-file.diff",
      settings: { foreground: p.pink },
    },
    {
      name: "Diff inserted",
      scope: "markup.inserted.diff",
      settings: { foreground: p.yellow },
    },
    {
      name: "Diff deleted",
      scope: "markup.deleted.diff",
      settings: { foreground: p.fg },
    },

    // ============================================================
    // MARKUP / MARKDOWN
    // ============================================================

    // Heading levels — each gets a distinct color for visual hierarchy
    {
      name: "Heading 1",
      scope:
        "heading.1.markdown entity.name.section.markdown,markup.heading.1.markdown",
      settings: { foreground: p.pink, fontStyle: "bold" },
    },
    {
      name: "Heading 2",
      scope:
        "heading.2.markdown entity.name.section.markdown,markup.heading.2.markdown",
      settings: { foreground: p.cyan, fontStyle: "bold" },
    },
    {
      name: "Heading 3",
      scope:
        "heading.3.markdown entity.name.section.markdown,markup.heading.3.markdown",
      settings: { foreground: p.lime, fontStyle: "bold" },
    },
    {
      name: "Heading 4",
      scope:
        "heading.4.markdown entity.name.section.markdown,markup.heading.4.markdown",
      settings: { foreground: p.purple, fontStyle: "bold" },
    },
    {
      name: "Heading 5",
      scope:
        "heading.5.markdown entity.name.section.markdown,markup.heading.5.markdown",
      settings: { foreground: p.yellow, fontStyle: "bold" },
    },
    {
      name: "Heading 6",
      scope:
        "heading.6.markdown entity.name.section.markdown,markup.heading.6.markdown",
      settings: { foreground: p.fg, fontStyle: "bold" },
    },
    {
      name: "Heading fallback",
      scope: "markup.heading,entity.name.section",
      settings: { foreground: p.pink, fontStyle: "bold" },
    },
    {
      name: "Heading # punctuation",
      scope: "punctuation.definition.heading.markdown",
      settings: { foreground: p.comment },
    },
    {
      name: "Markdown heading setext",
      scope:
        "markup.heading.setext,markup.heading.setext.1.markdown,markup.heading.setext.2.markdown",
      settings: { foreground: p.pink, fontStyle: "bold" },
    },

    // Bold & Italic
    {
      name: "Bold",
      scope: "markup.bold,todo.bold",
      settings: { foreground: p.purple, fontStyle: "bold" },
    },
    {
      name: "Bold punctuation",
      scope:
        "punctuation.definition.bold,punctuation.definition.bold.markdown",
      settings: { foreground: p.comment },
    },
    {
      name: "Markup italic",
      scope: "markup.italic,markup.italic.markdown,punctuation.definition.italic,todo.emphasis",
      settings: { foreground: p.pink, fontStyle: "italic" },
    },
    {
      name: "Bold italic",
      scope: "markup.bold markup.italic,markup.italic markup.bold",
      settings: { foreground: p.purple, fontStyle: "bold italic" },
    },
    {
      name: "Strikethrough",
      scope:
        "markup.strikethrough,markup.strikethrough.markdown,punctuation.definition.strikethrough.markdown",
      settings: { foreground: p.comment },
    },

    // Inline code & code blocks
    {
      name: "Markdown inline code",
      scope:
        "markup.inline.raw.markdown,markup.inline.raw.string.markdown",
      settings: { foreground: p.yellow },
    },
    {
      name: "Inline code backtick punctuation",
      scope:
        "punctuation.definition.raw.markdown",
      settings: { foreground: p.comment },
    },
    {
      name: "Markdown fenced code block",
      scope:
        "markup.fenced_code.block.markdown,punctuation.definition.markdown",
      settings: { foreground: p.yellow },
    },
    {
      name: "Fenced code block delimiters",
      scope: "punctuation.definition.fenced.markdown,markup.fenced_code.block.markdown punctuation.definition.markdown",
      settings: { foreground: p.comment },
    },
    {
      name: "Fenced code language identifier",
      scope: "fenced_code.block.language.markdown,fenced_code.block.language",
      settings: { foreground: p.cyan, fontStyle: "italic" },
    },

    // Lists
    {
      name: "Markdown list bullets/numbers",
      scope:
        "punctuation.definition.list.begin.markdown,punctuation.definition.list.markdown,beginning.punctuation.definition.list.markdown",
      settings: { foreground: p.cyan },
    },

    // Links
    {
      name: "Markdown link text",
      scope:
        "string.other.link.title.markdown,string.other.link.description.markdown",
      settings: { foreground: p.lime },
    },
    {
      name: "Markdown link URL",
      scope:
        "markup.underline.link.markdown,markup.underline.link.image.markdown",
      settings: { foreground: p.cyan, fontStyle: "underline" },
    },
    {
      name: "Markdown link brackets/parens",
      scope:
        "punctuation.definition.string.begin.markdown,punctuation.definition.string.end.markdown,punctuation.definition.metadata.markdown",
      settings: { foreground: p.comment },
    },
    {
      name: "Markdown image !",
      scope: "punctuation.definition.link.description.begin.markdown",
      settings: { foreground: p.purple },
    },

    // Blockquotes
    {
      name: "Markdown blockquote",
      scope: "markup.quote.markdown",
      settings: { foreground: p.comment, fontStyle: "italic" },
    },
    {
      name: "Markdown blockquote punctuation",
      scope: "punctuation.definition.quote.begin.markdown",
      settings: { foreground: p.cyan },
    },

    // Horizontal rule
    {
      name: "Markdown separator/thematic break",
      scope: "meta.separator.markdown",
      settings: { foreground: p.comment },
    },

    // Tables
    {
      name: "Markdown table",
      scope: "markup.table.markdown",
      settings: { foreground: p.fg },
    },
    {
      name: "Markdown table separator",
      scope:
        "punctuation.separator.table.markdown,punctuation.definition.table.markdown",
      settings: { foreground: p.comment },
    },

    // ============================================================
    // JAVASCRIPT / TYPESCRIPT
    // ============================================================
    {
      name: "js/ts import keyword",
      scope: "keyword.operator.expression.import",
      settings: { foreground: p.pink },
    },
    {
      name: "js/ts module",
      scope:
        "support.module.node,support.type.object.module,support.module.node",
      settings: { foreground: p.lime },
    },
    {
      name: "js/ts module type",
      scope: "entity.name.type.module",
      settings: { foreground: p.lime },
    },
    {
      name: "Math constant",
      scope: "support.constant.math",
      settings: { foreground: p.lime },
    },
    {
      name: "Math property",
      scope: "support.constant.property.math",
      settings: { foreground: p.purple },
    },
    {
      name: "js variable readwrite",
      scope:
        "variable.other.readwrite,meta.object-literal.key,support.variable.property,support.variable.object.process,support.variable.object.node",
      settings: { foreground: p.fg },
    },
    {
      name: "js/ts json",
      scope: "support.constant.json",
      settings: { foreground: p.purple },
    },
    {
      name: "js/ts keywords",
      scope: [
        "keyword.operator.expression.instanceof",
        "keyword.operator.new",
        "keyword.operator.ternary",
        "keyword.operator.optional",
        "keyword.operator.expression.keyof",
      ],
      settings: kw(p.pink),
    },
    {
      name: "js/ts console",
      scope: "support.type.object.console",
      settings: { foreground: p.fg },
    },
    {
      name: "js/ts process property",
      scope: "support.variable.property.process",
      settings: { foreground: p.purple },
    },
    {
      name: "js/ts expression operators",
      scope:
        "keyword.operator.expression.delete,keyword.operator.expression.in,keyword.operator.expression.of,keyword.operator.expression.instanceof,keyword.operator.new,keyword.operator.expression.typeof,keyword.operator.expression.void",
      settings: kw(p.pink),
    },
    {
      name: "Compound Assignment js/ts",
      scope:
        "keyword.operator.assignment.compound.js,keyword.operator.assignment.compound.ts",
      settings: { foreground: p.cyan },
    },
    {
      name: "Import module",
      scope: "keyword.operator.module",
      settings: { foreground: p.pink },
    },
    {
      name: "js Flowtype",
      scope: "support.type.type.flowtype",
      settings: { foreground: p.pink },
    },
    {
      name: "js Flow primitive",
      scope: "support.type.primitive",
      settings: { foreground: p.lime },
    },
    {
      name: "js class prop",
      scope: "meta.property.object",
      settings: { foreground: p.fg },
    },
    {
      name: "js func parameter",
      scope: "variable.parameter.function.js",
      settings: { foreground: p.fg },
    },
    {
      name: "js template literals begin",
      scope: "keyword.other.template.begin",
      settings: { foreground: p.yellow },
    },
    {
      name: "js template literals end",
      scope: "keyword.other.template.end",
      settings: { foreground: p.yellow },
    },
    {
      name: "js template literals variable braces begin",
      scope: "keyword.other.substitution.begin",
      settings: { foreground: p.yellow },
    },
    {
      name: "js template literals variable braces end",
      scope: "keyword.other.substitution.end",
      settings: { foreground: p.yellow },
    },
    {
      name: "js/ts parameter brace",
      scope: "function.parameter",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "js/ts brace function",
      scope: "function.brace",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "js dom",
      scope: "support.type.object.dom",
      settings: { foreground: p.cyan },
    },
    {
      name: "js dom variable",
      scope: "support.variable.dom,support.variable.property.dom",
      settings: { foreground: p.fg },
    },
    {
      name: "ts primitive/builtin",
      scope:
        "support.type.primitive.ts,support.type.builtin.ts,support.type.primitive.tsx,support.type.builtin.tsx",
      settings: { foreground: p.lime },
    },
    {
      name: "js/ts italic",
      scope:
        "entity.other.attribute-name.js,entity.other.attribute-name.ts,entity.other.attribute-name.jsx,entity.other.attribute-name.tsx,variable.parameter,variable.language.super",
      settings: { fontStyle: "italic" },
    },
    {
      name: "template literal punctuation",
      scope: "punctuation.quasi.element",
      settings: { foreground: p.pink },
    },

    // ============================================================
    // JSX / TSX / REACT
    // ============================================================
    {
      name: "JSX component tags",
      scope:
        "support.class.component.js,support.class.component.tsx,support.class.component.jsx",
      settings: { foreground: p.lime },
    },
    {
      name: "JSX tag names",
      scope:
        "entity.name.tag.js,entity.name.tag.tsx,entity.name.tag.jsx,entity.name.tag.ts",
      settings: { foreground: p.fg },
    },
    {
      name: "JSX expression braces",
      scope:
        "punctuation.section.embedded.begin.jsx,punctuation.section.embedded.end.jsx,punctuation.section.embedded.begin.tsx,punctuation.section.embedded.end.tsx",
      settings: { foreground: p.pink },
    },
    {
      name: "JSX spread operator",
      scope: "keyword.operator.spread.jsx,keyword.operator.spread.tsx",
      settings: { foreground: p.pink },
    },
    {
      name: "JSX string attribute values",
      scope:
        "string.quoted.double.jsx,string.quoted.single.jsx,string.quoted.double.tsx,string.quoted.single.tsx",
      settings: { foreground: p.yellow },
    },

    // ============================================================
    // VUE
    // ============================================================
    {
      name: "Vue directives",
      scope:
        "entity.other.attribute-name.directive.vue,punctuation.separator.key-value.html.vue",
      settings: { foreground: p.pink },
    },
    {
      name: "Vue directive shorthand",
      scope:
        "entity.other.attribute-name.shorthand.vue,entity.other.attribute-name.event.shorthand.vue",
      settings: { foreground: p.pink },
    },
    {
      name: "Vue component tags",
      scope: "entity.name.tag.other.html.vue",
      settings: { foreground: p.lime },
    },
    {
      name: "Vue interpolation braces",
      scope: "punctuation.definition.block.tag.vue",
      settings: { foreground: p.pink },
    },
    {
      name: "Vue template expression",
      scope: "expression.embedded.vue",
      settings: { foreground: p.fg },
    },

    // ============================================================
    // CSS / SCSS / LESS
    // ============================================================
    {
      name: "CSS/SCSS/LESS property values",
      scope:
        "support.constant.property-value.scss,support.constant.property-value.css",
      settings: { foreground: p.purple },
    },
    {
      name: "CSS/SCSS/LESS operators",
      scope:
        "keyword.operator.css,keyword.operator.scss,keyword.operator.less",
      settings: { foreground: p.cyan },
    },
    {
      name: "CSS color names",
      scope:
        "support.constant.color.w3c-standard-color-name.css,support.constant.color.w3c-standard-color-name.scss",
      settings: { foreground: p.purple },
    },
    {
      name: "CSS comma",
      scope: "punctuation.separator.list.comma.css",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "CSS vendored property",
      scope: "support.type.vendored.property-name.css",
      settings: { foreground: p.cyan },
    },
    {
      name: "CSS pseudo-elements/classes",
      scope:
        "entity.other.attribute-name.pseudo-element,entity.other.attribute-name.pseudo-class",
      settings: { foreground: p.cyan },
    },
    {
      name: "SCSS selector",
      scope: "selector.sass",
      settings: { foreground: p.fg },
    },
    {
      name: "CSS rgb-value",
      scope: "rgb-value",
      settings: { foreground: p.cyan },
    },
    {
      name: "CSS inline color decoration",
      scope: "inline-color-decoration rgb-value",
      settings: { foreground: p.purple },
    },
    {
      name: "LESS rgb value",
      scope: "less rgb-value",
      settings: { foreground: p.purple },
    },
    {
      name: "CSS variable",
      scope: "variable.css,variable.scss,variable.less,variable.argument.css",
      settings: { foreground: p.fg },
    },
    {
      name: "CSS property name",
      scope:
        "support.type.property-name.css,support.type.property-name.scss,support.type.property-name.less",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "CSS media query",
      scope:
        "support.type.property-name.media.css,support.type.property-name.media.scss",
      settings: { foreground: p.cyan },
    },
    {
      name: "CSS at-rule",
      scope: "keyword.control.at-rule.css,keyword.control.at-rule.scss",
      settings: kw(p.pink),
    },

    // ============================================================
    // PHP
    // ============================================================
    {
      name: "PHP class",
      scope: "variable.other.class.php",
      settings: { foreground: p.fg },
    },
    {
      name: "PHP use/namespace",
      scope:
        "support.other.namespace.use.php,support.other.namespace.use-as.php,support.other.namespace.php,entity.other.alias.php,meta.interface.php",
      settings: { foreground: p.lime },
    },
    {
      name: "PHP error-control",
      scope: "keyword.operator.error-control.php",
      settings: { foreground: p.pink },
    },
    {
      name: "PHP instanceof",
      scope: "keyword.operator.type.php",
      settings: kw(p.pink),
    },
    {
      name: "PHP array begin",
      scope: "punctuation.section.array.begin.php",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "PHP array end",
      scope: "punctuation.section.array.end.php",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "PHP illegal non-null-typehinted",
      scope: "invalid.illegal.non-null-typehinted.php",
      settings: { foreground: p.error },
    },
    {
      name: "PHP types",
      scope:
        "storage.type.php,meta.other.type.phpdoc.php,keyword.other.type.php,keyword.other.array.phpdoc.php",
      settings: { foreground: p.lime },
    },
    {
      name: "PHP function call",
      scope:
        "meta.function-call.php,meta.function-call.object.php,meta.function-call.static.php",
      settings: { foreground: p.pink },
    },
    {
      name: "PHP punctuation",
      scope:
        "punctuation.definition.parameters.begin.bracket.round.php,punctuation.definition.parameters.end.bracket.round.php,punctuation.separator.delimiter.php,punctuation.section.scope.begin.php,punctuation.section.scope.end.php,punctuation.terminator.expression.php,punctuation.definition.arguments.begin.bracket.round.php,punctuation.definition.arguments.end.bracket.round.php,punctuation.definition.storage-type.begin.bracket.round.php,punctuation.definition.storage-type.end.bracket.round.php,punctuation.definition.array.begin.bracket.round.php,punctuation.definition.array.end.bracket.round.php,punctuation.definition.begin.bracket.round.php,punctuation.definition.end.bracket.round.php,punctuation.definition.begin.bracket.curly.php,punctuation.definition.end.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php,punctuation.definition.section.switch-block.start.bracket.curly.php,punctuation.definition.section.switch-block.begin.bracket.curly.php,punctuation.definition.section.switch-block.end.bracket.curly.php",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "PHP constants",
      scope:
        "support.constant.ext.php,support.constant.std.php,support.constant.core.php,support.constant.parser-token.php",
      settings: { foreground: p.purple },
    },
    {
      name: "PHP goto/other",
      scope: "entity.name.goto-label.php,support.other.php",
      settings: { foreground: p.pink },
    },
    {
      name: "PHP logical/bitwise",
      scope:
        "keyword.operator.logical.php,keyword.operator.bitwise.php,keyword.operator.arithmetic.php",
      settings: { foreground: p.cyan },
    },
    {
      name: "PHP regexp",
      scope: "keyword.operator.regexp.php",
      settings: { foreground: p.pink },
    },
    {
      name: "PHP comparison",
      scope: "keyword.operator.comparison.php",
      settings: { foreground: p.cyan },
    },
    {
      name: "PHP heredoc/nowdoc",
      scope: "keyword.operator.heredoc.php,keyword.operator.nowdoc.php",
      settings: { foreground: p.pink },
    },
    // PHP 8+ features
    {
      name: "PHP attributes",
      scope: "meta.attribute.php",
      settings: { foreground: p.cyan },
    },
    {
      name: "PHP enum keyword",
      scope: "storage.type.enum.php",
      settings: storageStyle(p.pink),
    },
    {
      name: "PHP match expression",
      scope: "keyword.control.match.php",
      settings: kw(p.pink),
    },
    {
      name: "PHP named argument",
      scope: "entity.name.variable.parameter.php",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "PHP arrow function",
      scope: "storage.type.function.arrow.php",
      settings: storageStyle(p.pink),
    },
    {
      name: "PHP property promotion",
      scope: "storage.modifier.php",
      settings: storageStyle(p.pink),
    },

    // ============================================================
    // LARAVEL BLADE
    // ============================================================
    {
      name: "Blade tag",
      scope:
        "text.html.laravel-blade source.php.embedded.line.html entity.name.tag.laravel-blade",
      settings: { foreground: p.pink },
    },
    {
      name: "Blade @",
      scope:
        "text.html.laravel-blade source.php.embedded.line.html support.constant.laravel-blade",
      settings: { foreground: p.pink },
    },
    {
      name: "Blade directives",
      scope: "keyword.blade,keyword.control.blade",
      settings: kw(p.pink),
    },
    {
      name: "Blade echo braces",
      scope:
        "support.function.construct.begin.blade,support.function.construct.end.blade",
      settings: { foreground: p.cyan },
    },
    {
      name: "Blade raw echo",
      scope: "punctuation.blade.raw.begin,punctuation.blade.raw.end",
      settings: { foreground: p.pink },
    },
    {
      name: "Blade component tag",
      scope: "entity.name.tag.component.blade",
      settings: { foreground: p.lime },
    },

    // ============================================================
    // PYTHON
    // ============================================================
    {
      name: "Python magic variable",
      scope: "support.variable.magic.python",
      settings: { foreground: p.fg },
    },
    {
      name: "Python punctuation",
      scope:
        "punctuation.separator.period.python,punctuation.separator.element.python,punctuation.parenthesis.begin.python,punctuation.parenthesis.end.python",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Python self",
      scope: "variable.parameter.function.language.special.self.python",
      settings: { foreground: p.lime },
    },
    {
      name: "Python parameter",
      scope: "variable.parameter.function.language.python",
      settings: { foreground: p.purple },
    },
    {
      name: "Python type",
      scope: "support.type.python",
      settings: { foreground: p.cyan },
    },
    {
      name: "Python logical",
      scope: "keyword.operator.logical.python",
      settings: kw(p.pink),
    },
    {
      name: "Python parameter function",
      scope: "variable.parameter.function.python",
      settings: { foreground: p.purple },
    },
    {
      name: "Python block",
      scope:
        "punctuation.definition.arguments.begin.python,punctuation.definition.arguments.end.python,punctuation.separator.arguments.python,punctuation.definition.list.begin.python,punctuation.definition.list.end.python",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Python function-call",
      scope: "meta.function-call.generic.python",
      settings: { foreground: p.pink },
    },
    {
      name: "Python placeholder",
      scope: "constant.character.format.placeholder.other.python",
      settings: { foreground: p.purple },
    },
    {
      name: "Python decorator @",
      scope: "meta.function.decorator.python",
      settings: { foreground: p.pink },
    },
    {
      name: "Python decorator support",
      scope:
        "support.token.decorator.python,meta.function.decorator.identifier.python",
      settings: { foreground: p.cyan },
    },
    {
      name: "Python keyword control",
      scope: "keyword.control.import.python,keyword.control.flow.python",
      settings: { fontStyle: "italic" },
    },
    {
      name: "Python f-string braces",
      scope:
        "punctuation.definition.f-string.begin.python,punctuation.definition.f-string.end.python",
      settings: { foreground: p.yellow },
    },
    {
      name: "Python type hint",
      scope: "support.type.python,meta.function.parameters.python",
      settings: { foreground: p.cyan },
    },

    // ============================================================
    // RUST
    // ============================================================
    {
      name: "Rust lifetime",
      scope: "storage.modifier.lifetime.rust",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Rust std function",
      scope: "support.function.std.rust",
      settings: { foreground: p.pink },
    },
    {
      name: "Rust lifetime entity",
      scope: "entity.name.lifetime.rust",
      settings: { foreground: p.lime },
    },
    {
      name: "Rust language variable",
      scope: "variable.language.rust",
      settings: { foreground: p.fg },
    },
    {
      name: "Rust core constant",
      scope: "support.constant.core.rust",
      settings: { foreground: p.purple },
    },
    {
      name: "Rust operator misc",
      scope: "keyword.operator.misc.rust",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Rust operator sigil",
      scope: "keyword.operator.sigil.rust",
      settings: { foreground: p.pink },
    },
    // New Rust rules
    {
      name: "Rust type",
      scope: "entity.name.type.rust",
      settings: { foreground: p.lime },
    },
    {
      name: "Rust function",
      scope: "entity.name.function.rust",
      settings: { foreground: p.pink },
    },
    {
      name: "Rust module",
      scope: "entity.name.module.rust",
      settings: { foreground: p.lime },
    },
    {
      name: "Rust keyword control",
      scope: "keyword.control.rust",
      settings: kw(p.pink),
    },
    {
      name: "Rust storage type",
      scope: "storage.type.rust",
      settings: storageStyle(p.pink),
    },
    {
      name: "Rust trait",
      scope: "entity.name.type.trait.rust",
      settings: { foreground: p.lime },
    },
    {
      name: "Rust constant caps",
      scope: "constant.other.caps.rust",
      settings: { foreground: p.purple },
    },
    {
      name: "Rust attribute",
      scope: "meta.attribute.rust",
      settings: { foreground: p.cyan },
    },
    {
      name: "Rust macro",
      scope: "support.macro.rust,entity.name.function.macro.rust",
      settings: { foreground: p.cyan },
    },
    {
      name: "Rust unsafe",
      scope: "keyword.other.unsafe.rust",
      settings: kw(p.pink),
    },
    {
      name: "Rust impl/where",
      scope:
        "keyword.other.impl.rust,keyword.other.where.rust,keyword.other.fn.rust",
      settings: kw(p.pink),
    },
    {
      name: "Rust type numeric",
      scope: "entity.name.type.numeric.rust",
      settings: { foreground: p.lime },
    },
    {
      name: "Rust async/await",
      scope: "keyword.control.async.rust,keyword.control.await.rust",
      settings: kw(p.pink),
    },

    // ============================================================
    // GO
    // ============================================================
    {
      name: "Go assignment operator",
      scope: "keyword.operator.assignment.go",
      settings: { foreground: p.lime },
    },
    {
      name: "Go arithmetic/address operator",
      scope: "keyword.operator.arithmetic.go,keyword.operator.address.go",
      settings: { foreground: p.pink },
    },
    {
      name: "Go package name",
      scope: "entity.name.package.go",
      settings: { foreground: p.lime },
    },
    // New Go rules
    {
      name: "Go function",
      scope: "entity.name.function.go",
      settings: { foreground: p.pink },
    },
    {
      name: "Go type",
      scope: "entity.name.type.go",
      settings: { foreground: p.lime },
    },
    {
      name: "Go storage type",
      scope: "storage.type.go",
      settings: storageStyle(p.pink),
    },
    {
      name: "Go keyword control",
      scope: "keyword.control.go",
      settings: kw(p.pink),
    },
    {
      name: "Go keyword function",
      scope: "keyword.function.go",
      settings: kw(p.pink),
    },
    {
      name: "Go variable",
      scope: "variable.other.go",
      settings: { foreground: p.fg },
    },
    {
      name: "Go constant",
      scope: "constant.other.go",
      settings: { foreground: p.purple },
    },
    {
      name: "Go builtin function",
      scope: "support.function.builtin.go",
      settings: { foreground: p.cyan },
    },
    {
      name: "Go import",
      scope: "entity.name.import.go",
      settings: { foreground: p.yellow },
    },
    {
      name: "Go keyword type",
      scope: "keyword.type.go",
      settings: { foreground: p.lime },
    },
    {
      name: "Go method receiver",
      scope: "variable.other.receiver.go",
      settings: { foreground: p.fg },
    },

    // ============================================================
    // RUBY
    // ============================================================
    {
      name: "Ruby parameter",
      scope: "function.parameter.ruby, function.parameter.cs",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Ruby constant symbol",
      scope: "constant.language.symbol.ruby",
      settings: { foreground: p.cyan },
    },
    // New Ruby rules
    {
      name: "Ruby keyword control",
      scope:
        "keyword.control.ruby,keyword.control.class.ruby,keyword.control.module.ruby,keyword.control.def.ruby",
      settings: kw(p.pink),
    },
    {
      name: "Ruby class",
      scope: "entity.name.type.class.ruby",
      settings: { foreground: p.lime },
    },
    {
      name: "Ruby module",
      scope: "entity.name.type.module.ruby",
      settings: { foreground: p.lime },
    },
    {
      name: "Ruby function",
      scope: "entity.name.function.ruby",
      settings: { foreground: p.pink },
    },
    {
      name: "Ruby constant language",
      scope: "constant.language.ruby",
      settings: { foreground: p.purple },
    },
    {
      name: "Ruby instance variable",
      scope: "variable.other.readwrite.instance.ruby",
      settings: { foreground: p.fg },
    },
    {
      name: "Ruby class variable",
      scope: "variable.other.readwrite.class.ruby",
      settings: { foreground: p.fg },
    },
    {
      name: "Ruby support function",
      scope: "support.function.kernel.ruby",
      settings: { foreground: p.cyan },
    },
    {
      name: "Ruby constant other",
      scope: "variable.other.constant.ruby",
      settings: { foreground: p.purple },
    },
    {
      name: "Ruby string interpolation",
      scope: "string.interpolated.ruby",
      settings: { foreground: p.yellow },
    },
    {
      name: "Ruby embedded punctuation",
      scope: "punctuation.section.embedded.ruby",
      settings: { foreground: p.pink },
    },
    {
      name: "Ruby symbol",
      scope: "constant.other.symbol.ruby",
      settings: { foreground: p.cyan },
    },
    {
      name: "Ruby heredoc",
      scope:
        "string.unquoted.heredoc.ruby,punctuation.definition.string.begin.ruby,punctuation.definition.string.end.ruby",
      settings: { foreground: p.yellow },
    },
    {
      name: "Ruby block variable",
      scope: "variable.other.block.ruby",
      settings: { foreground: p.fg },
    },

    // ============================================================
    // KOTLIN
    // ============================================================
    {
      name: "Kotlin keyword control",
      scope: "keyword.control.kotlin",
      settings: kw(p.pink),
    },
    {
      name: "Kotlin storage modifier",
      scope: "storage.modifier.kotlin",
      settings: storageStyle(p.pink),
    },
    {
      name: "Kotlin function",
      scope: "entity.name.function.kotlin",
      settings: { foreground: p.pink },
    },
    {
      name: "Kotlin class",
      scope: "entity.name.type.class.kotlin",
      settings: { foreground: p.lime },
    },
    {
      name: "Kotlin storage type",
      scope: "storage.type.kotlin",
      settings: { foreground: p.lime },
    },
    {
      name: "Kotlin parameter",
      scope: "variable.parameter.kotlin",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Kotlin constant",
      scope: "constant.other.kotlin",
      settings: { foreground: p.purple },
    },
    {
      name: "Kotlin support function",
      scope: "support.function.kotlin",
      settings: { foreground: p.cyan },
    },
    {
      name: "Kotlin string template",
      scope: "string.template.kotlin,punctuation.definition.template.kotlin",
      settings: { foreground: p.yellow },
    },
    {
      name: "Kotlin package",
      scope: "entity.name.package.kotlin",
      settings: { foreground: p.lime },
    },
    {
      name: "Kotlin annotation",
      scope: "entity.name.type.annotation.kotlin,storage.type.annotation.kotlin",
      settings: { foreground: p.cyan },
    },
    {
      name: "Kotlin null safety",
      scope:
        "keyword.operator.elvis.kotlin,keyword.operator.null-check.kotlin",
      settings: { foreground: p.pink },
    },

    // ============================================================
    // SHELL / BASH
    // ============================================================
    {
      name: "Shell keyword control",
      scope: "keyword.control.shell,keyword.control.bash",
      settings: kw(p.pink),
    },
    {
      name: "Shell function",
      scope: "entity.name.function.shell",
      settings: { foreground: p.pink },
    },
    {
      name: "Shell variable",
      scope: "variable.other.normal.shell,variable.other.special.shell",
      settings: { foreground: p.fg },
    },
    {
      name: "Shell builtin",
      scope: "support.function.builtin.shell",
      settings: { foreground: p.cyan },
    },
    {
      name: "Shell string",
      scope:
        "string.quoted.double.shell,string.quoted.single.shell",
      settings: { foreground: p.yellow },
    },
    {
      name: "Shell option",
      scope: "constant.other.option.shell,constant.other.option.bash",
      settings: { foreground: p.purple },
    },
    {
      name: "Shell variable definition",
      scope:
        "punctuation.definition.variable.shell,punctuation.definition.variable.bash",
      settings: { foreground: p.fg },
    },
    {
      name: "Shell pipe/redirection",
      scope:
        "keyword.operator.pipe.shell,keyword.operator.redirect.shell,keyword.operator.logical.shell",
      settings: { foreground: p.cyan },
    },
    {
      name: "Shell assignment",
      scope: "keyword.operator.assign.shell",
      settings: { foreground: p.cyan },
    },
    {
      name: "Shell subshell",
      scope:
        "punctuation.definition.subshell.begin,punctuation.definition.subshell.end",
      settings: { foreground: p.pink },
    },

    // ============================================================
    // DOCKERFILE
    // ============================================================
    {
      name: "Dockerfile keyword",
      scope:
        "keyword.other.special-method.dockerfile,keyword.control.dockerfile",
      settings: kw(p.cyan),
    },
    {
      name: "Dockerfile instruction",
      scope: "entity.name.function.dockerfile",
      settings: { foreground: p.pink },
    },
    {
      name: "Dockerfile variable",
      scope: "variable.other.dockerfile",
      settings: { foreground: p.fg },
    },
    {
      name: "Dockerfile from",
      scope: "keyword.other.dockerfile",
      settings: kw(p.pink),
    },
    {
      name: "Dockerfile string",
      scope: "string.quoted.double.dockerfile,string.quoted.single.dockerfile",
      settings: { foreground: p.yellow },
    },

    // ============================================================
    // YAML
    // ============================================================
    {
      name: "YAML block sequence",
      scope: "punctuation.definition.block.sequence.item.yaml",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "YAML tag",
      scope: "entity.name.tag.yaml",
      settings: { foreground: p.fg },
    },
    {
      name: "YAML string",
      scope:
        "string.unquoted.plain.out.yaml,string.unquoted.block.yaml,string.quoted.single.yaml,string.quoted.double.yaml",
      settings: { foreground: p.yellow },
    },
    {
      name: "YAML boolean",
      scope: "constant.language.boolean.yaml",
      settings: { foreground: p.purple },
    },
    {
      name: "YAML numeric",
      scope: "constant.numeric.yaml,constant.numeric.integer.yaml,constant.numeric.float.yaml",
      settings: { foreground: p.purple },
    },
    {
      name: "YAML null",
      scope: "constant.language.null.yaml",
      settings: { foreground: p.purple },
    },
    {
      name: "YAML key",
      scope: "entity.name.tag.yaml,support.type.property-name.yaml",
      settings: { foreground: p.fg },
    },
    {
      name: "YAML anchor/alias",
      scope:
        "entity.name.type.anchor.yaml,variable.other.alias.yaml,punctuation.definition.anchor.yaml,punctuation.definition.alias.yaml",
      settings: { foreground: p.cyan },
    },
    {
      name: "YAML separator",
      scope: "punctuation.separator.key-value.mapping.yaml",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "YAML block scalar",
      scope:
        "keyword.control.flow.block-scalar.literal.yaml,keyword.control.flow.block-scalar.folded.yaml",
      settings: kw(p.pink),
    },

    // ============================================================
    // TOML
    // ============================================================
    {
      name: "TOML key",
      scope: "keyword.key.toml,support.type.property-name.toml",
      settings: { foreground: p.fg },
    },
    {
      name: "TOML string",
      scope: "string.quoted.single.basic.line.toml,string.quoted.double.basic.line.toml",
      settings: { foreground: p.yellow },
    },
    {
      name: "TOML date/datetime",
      scope:
        "constant.other.date.toml,constant.other.datetime.toml,constant.other.time.toml",
      settings: { foreground: p.purple },
    },
    {
      name: "TOML table",
      scope:
        "entity.other.attribute-name.table.toml,support.type.property-name.table.toml",
      settings: { foreground: p.cyan },
    },
    {
      name: "TOML array table",
      scope: "entity.other.attribute-name.table.array.toml",
      settings: { foreground: p.cyan },
    },
    {
      name: "TOML boolean",
      scope: "constant.language.boolean.toml",
      settings: { foreground: p.purple },
    },

    // ============================================================
    // .ENV FILES
    // ============================================================
    {
      name: "Env variable name",
      scope: "variable.other.env,keyword.other.definition.ini",
      settings: { foreground: p.fg },
    },
    {
      name: "Env variable value",
      scope: "source.env,source.ini",
      settings: { foreground: p.yellow },
    },
    {
      name: "Env comment",
      scope: "comment.line.number-sign.env,comment.line.semicolon.ini",
      settings: { foreground: p.comment, fontStyle: "italic" },
    },
    {
      name: "Ini section header",
      scope: "entity.name.section.group-title.ini",
      settings: { foreground: p.cyan },
    },

    // ============================================================
    // SQL
    // ============================================================
    {
      name: "SQL Variables",
      scope: "text.variable,text.bracketed",
      settings: { foreground: p.fg },
    },
    {
      name: "SQL keyword",
      scope: "keyword.other.sql,keyword.other.DML.sql,keyword.other.DDL.sql",
      settings: kw(p.pink),
    },
    {
      name: "SQL function",
      scope: "support.function.sql",
      settings: { foreground: p.cyan },
    },
    {
      name: "SQL operator",
      scope: "keyword.operator.sql",
      settings: { foreground: p.cyan },
    },
    {
      name: "SQL string",
      scope: "string.quoted.single.sql,string.quoted.double.sql",
      settings: { foreground: p.yellow },
    },
    {
      name: "SQL constant",
      scope: "constant.other.database-name.sql,constant.other.table-name.sql",
      settings: { foreground: p.lime },
    },
    {
      name: "SQL star",
      scope: "keyword.operator.star.sql",
      settings: { foreground: p.fg },
    },
    {
      name: "SQL type",
      scope: "storage.type.sql",
      settings: { foreground: p.lime },
    },

    // ============================================================
    // JSON
    // ============================================================
    {
      name: "JSON property name",
      scope: "support.type.property-name.json",
      settings: { foreground: p.fg },
    },
    {
      name: "JSON property name punctuation",
      scope: "support.type.property-name.json punctuation",
      settings: { foreground: p.fg },
    },
    {
      name: "JSON dictionary keys",
      scope:
        "source.json meta.structure.dictionary.json > string.quoted.json",
      settings: { foreground: p.fg },
    },
    {
      name: "JSON dictionary key punctuation",
      scope:
        "source.json meta.structure.dictionary.json > string.quoted.json > punctuation.string",
      settings: { foreground: p.fg },
    },
    {
      name: "JSON values",
      scope:
        "source.json meta.structure.dictionary.json > value.json > string.quoted.json,source.json meta.structure.array.json > value.json > string.quoted.json,source.json meta.structure.dictionary.json > value.json > string.quoted.json > punctuation,source.json meta.structure.array.json > value.json > string.quoted.json > punctuation",
      settings: { foreground: p.yellow },
    },
    {
      name: "JSON constants",
      scope:
        "source.json meta.structure.dictionary.json > constant.language.json,source.json meta.structure.array.json > constant.language.json",
      settings: { foreground: p.cyan },
    },
    {
      name: "JSONC comments",
      scope: "comment.line.double-slash.js,comment.block.json",
      settings: { foreground: p.comment, fontStyle: "italic" },
    },

    // ============================================================
    // JAVA
    // ============================================================
    {
      name: "Java type annotations",
      scope: ["storage.type.annotation.java", "storage.type.object.array.java"],
      settings: { foreground: p.lime },
    },
    {
      name: "Java source",
      scope: "source.java",
      settings: { foreground: p.fg },
    },
    {
      name: "Java punctuation",
      scope:
        "punctuation.section.block.begin.java,punctuation.section.block.end.java,punctuation.definition.method-parameters.begin.java,punctuation.definition.method-parameters.end.java,meta.method.identifier.java,punctuation.section.method.begin.java,punctuation.section.method.end.java,punctuation.terminator.java,punctuation.section.class.begin.java,punctuation.section.class.end.java,punctuation.section.inner-class.begin.java,punctuation.section.inner-class.end.java,meta.method-call.java,punctuation.section.class.begin.bracket.curly.java,punctuation.section.class.end.bracket.curly.java,punctuation.section.method.begin.bracket.curly.java,punctuation.section.method.end.bracket.curly.java,punctuation.separator.period.java,punctuation.bracket.angle.java,punctuation.definition.annotation.java,meta.method.body.java",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Java method",
      scope: "meta.method.java",
      settings: { foreground: p.pink },
    },
    {
      name: "Java storage",
      scope:
        "storage.modifier.import.java,storage.type.java,storage.type.generic.java",
      settings: { foreground: p.lime },
    },
    {
      name: "Java instanceof",
      scope: "keyword.operator.instanceof.java",
      settings: kw(p.pink),
    },
    {
      name: "Java variable",
      scope: "meta.definition.variable.name.java",
      settings: { foreground: p.fg },
    },
    {
      name: "Java Variables",
      scope: "token.variable.parameter.java",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Java Imports",
      scope: "import.storage.java",
      settings: { foreground: p.lime },
    },
    {
      name: "Java Packages keyword",
      scope: "token.package.keyword",
      settings: { foreground: p.pink },
    },
    {
      name: "Java Packages",
      scope: "token.package",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Java Storage",
      scope: "token.storage.type.java",
      settings: { foreground: p.lime },
    },

    // ============================================================
    // C / C++
    // ============================================================
    {
      name: "C++ function",
      scope: "meta.function.c,meta.function.cpp",
      settings: { foreground: p.fg },
    },
    {
      name: "C++ block",
      scope:
        "punctuation.section.block.begin.bracket.curly.cpp,punctuation.section.block.end.bracket.curly.cpp,punctuation.terminator.statement.c,punctuation.section.block.begin.bracket.curly.c,punctuation.section.block.end.bracket.curly.c,punctuation.section.parens.begin.bracket.round.c,punctuation.section.parens.end.bracket.round.c,punctuation.section.parameters.begin.bracket.round.c,punctuation.section.parameters.end.bracket.round.c",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "C operator assignment",
      scope:
        "keyword.operator.assignment.c,keyword.operator.comparison.c,keyword.operator.c,keyword.operator.increment.c,keyword.operator.decrement.c,keyword.operator.bitwise.shift.c,keyword.operator.assignment.cpp,keyword.operator.comparison.cpp,keyword.operator.cpp,keyword.operator.increment.cpp,keyword.operator.decrement.cpp,keyword.operator.bitwise.shift.cpp",
      settings: { foreground: p.pink },
    },
    {
      name: "C punctuation separator",
      scope: "punctuation.separator.c,punctuation.separator.cpp",
      settings: { foreground: p.pink },
    },
    {
      name: "C type posix-reserved",
      scope: "support.type.posix-reserved.c,support.type.posix-reserved.cpp",
      settings: { foreground: p.cyan },
    },
    {
      name: "C sizeof",
      scope: "keyword.operator.sizeof.c,keyword.operator.sizeof.cpp",
      settings: kw(p.pink),
    },
    {
      name: "C variables",
      scope: "variable.c",
      settings: { foreground: p.fgMuted },
    },

    // ============================================================
    // C#
    // ============================================================
    {
      name: "C# storage type",
      scope: "storage.type.cs",
      settings: { foreground: p.lime },
    },
    {
      name: "C# local variable",
      scope: "entity.name.variable.local.cs",
      settings: { foreground: p.fg },
    },
    {
      name: "C++/C# scope resolution",
      scope: [
        "entity.name.label.cs",
        "entity.name.scope-resolution.function.call",
        "entity.name.scope-resolution.function.definition",
      ],
      settings: { foreground: p.lime },
    },

    // ============================================================
    // HASKELL
    // ============================================================
    {
      name: "Haskell variable generic-type",
      scope: "variable.other.generic-type.haskell",
      settings: { foreground: p.pink },
    },
    {
      name: "Haskell storage type",
      scope: "storage.type.haskell",
      settings: { foreground: p.purple },
    },

    // ============================================================
    // ELIXIR
    // ============================================================
    {
      name: "Elixir symbol",
      scope: "constant.language.symbol.elixir",
      settings: { foreground: p.cyan },
    },

    // ============================================================
    // CLOJURE
    // ============================================================
    {
      name: "Clojure globals",
      scope: "entity.global.clojure",
      settings: { foreground: p.lime },
    },
    {
      name: "Clojure symbols",
      scope: "meta.symbol.clojure",
      settings: { foreground: p.fg },
    },
    {
      name: "Clojure constants",
      scope: "constant.keyword.clojure",
      settings: { foreground: p.cyan },
    },

    // ============================================================
    // COFFEESCRIPT
    // ============================================================
    {
      name: "CoffeeScript function argument",
      scope: "meta.arguments.coffee,variable.parameter.function.coffee",
      settings: { foreground: p.fg },
    },

    // ============================================================
    // ELM
    // ============================================================
    {
      name: "Elm prelude",
      scope: "support.type.prelude.elm",
      settings: { foreground: p.cyan },
    },
    {
      name: "Elm constant",
      scope: "support.constant.elm",
      settings: { foreground: p.purple },
    },

    // ============================================================
    // GROOVY
    // ============================================================
    {
      name: "Groovy import",
      scope: "storage.modifier.import.groovy",
      settings: { foreground: p.lime },
    },
    {
      name: "Groovy methods",
      scope: "meta.method.groovy",
      settings: { foreground: p.pink },
    },
    {
      name: "Groovy variables",
      scope: "meta.definition.variable.name.groovy",
      settings: { foreground: p.fg },
    },
    {
      name: "Groovy inheritance",
      scope: "meta.definition.class.inherited.classes.groovy",
      settings: { foreground: p.yellow },
    },

    // ============================================================
    // MAKEFILE
    // ============================================================
    {
      name: "Makefile prerequisites",
      scope: "meta.scope.prerequisites.makefile",
      settings: { foreground: p.fg },
    },
    {
      name: "Makefile text",
      scope: "source.makefile",
      settings: { foreground: p.lime },
    },

    // ============================================================
    // HLSL
    // ============================================================
    {
      name: "HLSL semantic",
      scope: "support.variable.semantic.hlsl",
      settings: { foreground: p.lime },
    },
    {
      name: "HLSL types",
      scope: [
        "support.type.texture.hlsl",
        "support.type.sampler.hlsl",
        "support.type.object.hlsl",
        "support.type.object.rw.hlsl",
        "support.type.fx.hlsl",
      ],
      settings: { foreground: p.pink },
    },

    // ============================================================
    // SWIFT / VB
    // ============================================================
    {
      name: "Swift/VB types",
      scope: "support.type.swift,support.type.vb.asp",
      settings: { foreground: p.lime },
    },

    // ============================================================
    // UNISON
    // ============================================================
    {
      name: "Unison punctuation",
      scope:
        "punctuation.definition.delayed.unison,punctuation.definition.list.begin.unison,punctuation.definition.list.end.unison,punctuation.definition.ability.begin.unison,punctuation.definition.ability.end.unison,punctuation.operator.assignment.as.unison,punctuation.separator.pipe.unison,punctuation.separator.delimiter.unison,punctuation.definition.hash.unison",
      settings: { foreground: p.fg },
    },

    // ============================================================
    // EDGE
    // ============================================================
    {
      name: "Edge support constant",
      scope: "support.constant.edge",
      settings: { foreground: p.pink },
    },

    // ============================================================
    // XI
    // ============================================================
    {
      name: "Xi function",
      scope: "entity.name.function.xi",
      settings: { foreground: p.lime },
    },
    {
      name: "Xi class",
      scope: "entity.name.class.xi",
      settings: { foreground: p.cyan },
    },
    {
      name: "Xi character class",
      scope: "constant.character.character-class.regexp.xi",
      settings: { foreground: p.fg },
    },
    {
      name: "Xi constant regexp",
      scope: "constant.regexp.xi",
      settings: { foreground: p.pink },
    },
    {
      name: "Xi control",
      scope: "keyword.control.xi",
      settings: { foreground: p.cyan },
    },
    {
      name: "Xi invalid",
      scope: "invalid.xi",
      settings: { foreground: p.fgMuted },
    },
    {
      name: "Xi quote",
      scope: "beginning.punctuation.definition.quote.markdown.xi",
      settings: { foreground: p.yellow },
    },
    {
      name: "Xi comments list",
      scope: "beginning.punctuation.definition.list.markdown.xi",
      settings: { foreground: p.comment },
    },
    {
      name: "Xi link",
      scope: "constant.character.xi",
      settings: { foreground: p.pink },
    },
    {
      name: "Xi accent",
      scope: "accent.xi",
      settings: { foreground: p.pink },
    },
    {
      name: "Xi wikiword",
      scope: "wikiword.xi",
      settings: { foreground: p.purple },
    },
    {
      name: "Xi operators",
      scope: "constant.other.color.rgb-value.xi",
      settings: { foreground: p.white },
    },
    {
      name: "Xi dim elements",
      scope: "punctuation.definition.tag.xi",
      settings: { foreground: p.comment },
    },

    // ============================================================
    // HTML / PUG
    // ============================================================
    {
      name: "HTML entities",
      scope: "constant.character.entity",
      settings: { foreground: p.fg },
    },
    {
      name: "HTML custom element",
      scope: "entity.name.tag.custom.html",
      settings: { foreground: p.lime },
    },
    {
      name: "HTML data attribute",
      scope: "entity.other.attribute-name.html",
      settings: { foreground: p.purple },
    },

    // ============================================================
    // COMMENT MARKUP LINK
    // ============================================================
    {
      name: "Comment Markup Link",
      scope: "comment markup.link",
      settings: { foreground: p.comment },
    },
  ];
}

function buildWorkbenchColors(p) {
  return {
    foreground: p.uiFg,
    focusBorder: p.focusBorder,
    "selection.background": p.accentBlue,
    "scrollbar.shadow": p.shadowBg,
    "activityBar.foreground": p.type === "light" ? p.uiFg : p.white,
    "activityBar.background": p.sidebarBg,
    "activityBar.inactiveForeground":
      p.type === "light" ? p.uiFgDim : "#ffffff66",
    "activityBarBadge.foreground": p.type === "light" ? p.white : p.widgetBg,
    "activityBarBadge.background": p.badgeBg,
    "activityBar.border": p.borderSubtle,
    "sideBar.background": p.sidebarBg,
    "sideBar.foreground": p.uiFg,
    "sideBarSectionHeader.background": p.borderTransparent,
    "sideBarSectionHeader.foreground": p.accentLightBlue,
    "sideBarSectionHeader.border":
      p.type === "light" ? "#00000015" : "#cccccc33",
    "sideBarTitle.foreground": p.uiFgMuted,
    "list.inactiveSelectionBackground": p.listActiveBg,
    "list.inactiveSelectionForeground": p.uiFg,
    "list.hoverBackground": p.listActiveBg,
    "list.hoverForeground": p.uiFg,
    "list.activeSelectionBackground": p.listActiveBg,
    "list.activeSelectionForeground": p.type === "light" ? p.uiFg : p.white,
    "tree.indentGuidesStroke": p.treeIndentStroke,
    "list.dropBackground": p.listActiveBg,
    "list.highlightForeground": p.accentLightBlue,
    "list.focusBackground": p.listActiveBg,
    "list.focusForeground": p.uiFg,
    "listFilterWidget.background": p.listFilterBg,
    "listFilterWidget.outline": p.borderTransparent,
    "listFilterWidget.noMatchesOutline": p.listFilterNoMatch,
    "statusBar.foreground": p.type === "light" ? p.uiFg : p.white,
    "statusBar.background": p.sidebarBg,
    "statusBarItem.hoverBackground": p.statusItemHoverBg,
    "statusBar.debuggingBackground": p.statusDebugBg,
    "statusBar.debuggingForeground": p.white,
    "statusBar.noFolderBackground": p.statusNoFolderBg,
    "statusBar.noFolderForeground": p.white,
    "statusBarItem.remoteBackground": p.statusRemoteBg,
    "statusBarItem.remoteForeground": p.white,
    "titleBar.activeBackground": p.sidebarBg,
    "titleBar.activeForeground": p.uiFg,
    "titleBar.inactiveBackground": p.titleInactiveBg,
    "titleBar.inactiveForeground": p.titleInactiveFg,
    "titleBar.border": p.borderTransparent,
    "menubar.selectionForeground": p.uiFg,
    "menubar.selectionBackground": p.menuSelectionBg,
    "menu.foreground": p.uiFg,
    "menu.background": p.sidebarBg,
    "menu.selectionForeground": p.type === "light" ? p.uiFg : p.white,
    "menu.selectionBackground": p.listActiveBg,
    "menu.selectionBorder": p.borderTransparent,
    "menu.separatorBackground": p.menuSeparator,
    "menu.border": p.borderMenu,
    "button.background": p.buttonBg,
    "button.foreground": p.white,
    "button.hoverBackground": p.buttonHoverBg,
    "button.secondaryForeground": p.type === "light" ? p.uiFg : p.white,
    "button.secondaryBackground": p.buttonSecondaryBg,
    "button.secondaryHoverBackground": p.buttonSecondaryHoverBg,
    "input.background": p.editorBg,
    "input.border": p.borderTransparent,
    "input.foreground": p.uiFg,
    "inputOption.activeBackground": p.inputActiveBg,
    "inputOption.activeBorder": p.inputActiveBorder,
    "inputOption.activeForeground": p.type === "light" ? p.uiFg : p.white,
    "input.placeholderForeground": p.placeholderFg,
    "textLink.foreground": p.linkFg,
    "editor.background": p.editorBg,
    "editor.foreground": p.fgMuted,
    "editorLineNumber.foreground": p.lineNumberFg,
    "editorCursor.foreground": p.cursorFg,
    "editorCursor.background": p.cursorBg,
    "editor.selectionBackground": p.selectionBg,
    "editor.inactiveSelectionBackground":
      p.type === "light" ? p.selectionBg + "83" : "#15284583",
    "editorWhitespace.foreground": p.whitespaceFg,
    "editor.selectionHighlightBackground": p.selectionBg,
    "editor.selectionHighlightBorder": p.selectionBorder,
    "editor.findMatchBackground": p.findMatchBg,
    "editor.findMatchBorder": p.findMatchBorder,
    "editor.findMatchHighlightBackground": p.findMatchHighlightBg,
    "editor.findMatchHighlightBorder": p.borderTransparent,
    "editor.findRangeHighlightBackground":
      p.type === "light" ? "#00000010" : "#3a3d4166",
    "editor.findRangeHighlightBorder": p.borderTransparent,
    "editor.rangeHighlightBackground":
      p.type === "light" ? "#00000008" : "#ffffff0b",
    "editor.rangeHighlightBorder": p.borderTransparent,
    "editor.hoverHighlightBackground": p.hoverHighlightBg,
    "editor.wordHighlightStrongBackground": p.wordHighlightStrongBg,
    "editor.wordHighlightBackground": p.wordHighlightBg,
    "editor.lineHighlightBackground": p.lineHighlightBg,
    "editor.lineHighlightBorder": p.lineHighlightBorder,
    "editorLineNumber.activeForeground": p.lineNumberActiveFg,
    "editorLink.activeForeground":
      p.type === "light" ? p.accentBlue : "#4d93cd",
    "editorIndentGuide.background": p.indentGuideBg,
    "editorIndentGuide.activeBackground": p.indentGuideActiveBg,
    "editorRuler.foreground": p.rulerFg,
    "editorBracketMatch.background": p.bracketMatchBg,
    "editorBracketMatch.border": p.bracketMatchBorder,
    "editor.foldBackground": p.foldBg,
    "editorOverviewRuler.background": p.editorOverviewBg,
    "editorOverviewRuler.border": p.editorOverviewBorder,
    "editorError.foreground": p.errorIcon,
    "editorError.background": p.editorErrorBg,
    "editorError.border": p.borderTransparent,
    "editorWarning.foreground": p.warningIcon,
    "editorWarning.background": p.editorWarningBg,
    "editorWarning.border": p.borderTransparent,
    "editorInfo.foreground": p.infoIcon,
    "editorInfo.background": p.editorInfoBg,
    "editorInfo.border": p.editorInfoBg,
    "editorGutter.background": p.editorBg,
    "editorGutter.modifiedBackground": p.gutterModified,
    "editorGutter.addedBackground": p.gutterAdded,
    "editorGutter.deletedBackground": p.gutterDeleted,
    "editorGutter.foldingControlForeground": p.gutterFolding,
    "editorCodeLens.foreground": p.codeLensFg,
    "editorGroup.border": p.editorGroupBorder,
    "diffEditor.insertedTextBackground": p.diffInsertedBg,
    "diffEditor.removedTextBackground": p.diffRemovedBg,
    "diffEditor.border": p.diffBorder,
    "panel.background": p.sidebarBg,
    "panel.border": p.borderStrong,
    "panelTitle.activeBorder": p.panelActiveBorder,
    "panelTitle.activeForeground": p.panelActiveFg,
    "panelTitle.inactiveForeground": p.panelInactiveFg,
    "badge.background": p.badgeBg,
    "badge.foreground": p.type === "light" ? p.white : p.sidebarBg,
    "terminal.foreground": p.type === "light" ? p.uiFg : p.white,
    "terminal.background": p.terminalBg,
    "terminal.selectionBackground": p.terminalSelectionBg,
    "terminalCursor.background": p.terminalCursorBg,
    "terminalCursor.foreground": p.type === "light" ? p.white : p.white,
    "terminal.border": p.borderStrong,
    "terminal.ansiBlack": p.ansiBlack,
    "terminal.ansiBlue": p.ansiBlue,
    "terminal.ansiBrightBlack": p.ansiBrightBlack,
    "terminal.ansiBrightBlue": p.ansiBrightBlue,
    "terminal.ansiBrightCyan": p.ansiBrightCyan,
    "terminal.ansiBrightGreen": p.ansiBrightGreen,
    "terminal.ansiBrightMagenta": p.ansiBrightMagenta,
    "terminal.ansiBrightRed": p.ansiBrightRed,
    "terminal.ansiBrightWhite": p.ansiBrightWhite,
    "terminal.ansiBrightYellow": p.ansiBrightYellow,
    "terminal.ansiCyan": p.ansiCyan,
    "terminal.ansiGreen": p.ansiGreen,
    "terminal.ansiMagenta": p.ansiMagenta,
    "terminal.ansiRed": p.ansiRed,
    "terminal.ansiWhite": p.ansiWhite,
    "terminal.ansiYellow": p.ansiYellow,
    "breadcrumb.background": p.editorBg,
    "breadcrumb.foreground": p.breadcrumbFg,
    "breadcrumb.focusForeground": p.breadcrumbFocusFg,
    "editorGroupHeader.tabsBackground": p.sidebarBg,
    "editorGroupHeader.tabsBorder": p.tabBarBorder,
    "tab.activeForeground": p.type === "light" ? p.uiFg : p.white,
    "tab.border": p.tabBorder,
    "tab.activeBackground": p.editorBg,
    "tab.activeBorder": p.tabActiveBorder,
    "tab.activeBorderTop": p.tabActiveBorder,
    "tab.inactiveBackground": p.sidebarBg,
    "tab.inactiveForeground": p.tabInactiveFg,
    "scrollbarSlider.background": p.scrollbarBg,
    "scrollbarSlider.hoverBackground": p.scrollbarHoverBg,
    "scrollbarSlider.activeBackground": p.scrollbarActiveBg,
    "progressBar.background": p.progressBar,
    "widget.shadow": p.type === "light" ? "#00000020" : "#0000005c",
    "editorWidget.foreground": p.type === "light" ? p.uiFg : p.white,
    "editorWidget.background": p.widgetBg,
    "editorWidget.resizeBorder": p.widgetResizeBorder,
    "pickerGroup.border": p.pickerGroupBorder,
    "pickerGroup.foreground": p.pickerGroupFg,
    "debugToolBar.background": p.widgetBg,
    "debugToolBar.border": p.debugToolbarBorder,
    "notifications.foreground": p.uiFg,
    "notifications.background": p.widgetBg,
    "notificationToast.border": p.notificationToastBorder,
    "notificationsErrorIcon.foreground": p.errorIcon,
    "notificationsWarningIcon.foreground": p.warningIcon,
    "notificationsInfoIcon.foreground": p.infoIcon,
    "notificationCenter.border": p.notificationBorder,
    "notificationCenterHeader.foreground": p.uiFg,
    "notificationCenterHeader.background": p.widgetBg,
    "notifications.border": p.notificationBorder,
    "gitDecoration.addedResourceForeground": p.gitAdded,
    "gitDecoration.conflictingResourceForeground": p.gitConflicting,
    "gitDecoration.deletedResourceForeground": p.gitDeleted,
    "gitDecoration.ignoredResourceForeground": p.gitIgnored,
    "gitDecoration.modifiedResourceForeground": p.gitModified,
    "gitDecoration.stageDeletedResourceForeground": p.gitStageDeleted,
    "gitDecoration.stageModifiedResourceForeground": p.gitStageModified,
    "gitDecoration.submoduleResourceForeground": p.gitSubmodule,
    "gitDecoration.untrackedResourceForeground": p.gitUntracked,
    "editorMarkerNavigation.background": p.sidebarBg,
    "editorMarkerNavigationError.background": p.errorIcon,
    "editorMarkerNavigationWarning.background": p.warningIcon,
    "editorMarkerNavigationInfo.background": p.infoIcon,
    "merge.currentHeaderBackground": p.mergeCurrentHeader,
    "merge.currentContentBackground": p.mergeCurrentContent,
    "merge.incomingHeaderBackground": p.mergeIncomingHeader,
    "merge.incomingContentBackground": p.mergeIncomingContent,
    "merge.commonHeaderBackground": p.mergeCommonHeader,
    "merge.commonContentBackground": p.type === "light" ? p.sidebarBg : p.sidebarBg,
    "editorSuggestWidget.background": p.sidebarBg,
    "editorSuggestWidget.border": p.borderMedium,
    "editorSuggestWidget.foreground": p.fgMuted,
    "editorSuggestWidget.highlightForeground": p.suggestHighlightFg,
    "editorSuggestWidget.selectedBackground": p.suggestSelectedBg,
    "editorHoverWidget.foreground": p.uiFg,
    "editorHoverWidget.background": p.sidebarBg,
    "editorHoverWidget.border":
      p.type === "light" ? "#00000020" : "#ffffff2e",
    "peekView.border": p.peekBorder,
    "peekViewEditor.background": p.peekEditorBg,
    "peekViewEditorGutter.background": p.peekEditorBg,
    "peekViewEditor.matchHighlightBackground": p.peekMatchHighlightBg,
    "peekViewEditor.matchHighlightBorder": p.peekMatchHighlightBorder,
    "peekViewResult.background": p.sidebarBg,
    "peekViewResult.fileForeground": p.type === "light" ? p.uiFg : p.white,
    "peekViewResult.lineForeground": p.uiFgMuted,
    "peekViewResult.matchHighlightBackground": p.peekResultMatchBg,
    "peekViewResult.selectionBackground": p.peekResultSelectionBg,
    "peekViewResult.selectionForeground":
      p.type === "light" ? p.uiFg : p.white,
    "peekViewTitle.background": p.sidebarBg,
    "peekViewTitleDescription.foreground":
      p.type === "light" ? p.uiFgDim : "#ccccccb3",
    "peekViewTitleLabel.foreground": p.type === "light" ? p.uiFg : p.white,
    "icon.foreground": p.uiFg,
    "checkbox.background": p.editorBg,
    "checkbox.foreground": p.uiFg,
    "checkbox.border": p.borderTransparent,
    "dropdown.background": p.editorBg,
    "dropdown.foreground": p.uiFg,
    "dropdown.border": p.borderTransparent,
    "minimapGutter.addedBackground": p.gutterAdded,
    "minimapGutter.modifiedBackground": p.gutterModified,
    "minimapGutter.deletedBackground": p.gutterDeleted,
    "minimap.findMatchHighlight": p.findMatchBg,
    "minimap.selectionHighlight": p.selectionBg,
    "minimap.errorHighlight": p.errorIcon,
    "minimap.warningHighlight": p.warningIcon,
    "minimap.background": p.editorBg,
    "sideBar.dropBackground": p.listActiveBg,
    "editorGroup.emptyBackground": p.editorBg,
    "panelSection.border": p.borderStrong,
    "statusBarItem.activeBackground": p.statusItemActiveBg,
    "settings.headerForeground": p.uiFg,
    "settings.focusedRowBackground": p.settingsFocusedRow,
    "walkThrough.embeddedEditorBackground": p.walkThroughBg,
    "breadcrumb.activeSelectionForeground": p.breadcrumbFocusFg,
    "editorGutter.commentRangeForeground": p.gutterFolding,
    "debugExceptionWidget.background": p.widgetBg,
    "debugExceptionWidget.border": p.debugToolbarBorder,

    // Bracket pair colorization
    "editorBracketHighlight.foreground1": p.cyan,
    "editorBracketHighlight.foreground2": p.pink,
    "editorBracketHighlight.foreground3": p.purple,
    "editorBracketHighlight.foreground4": p.lime,
    "editorBracketHighlight.foreground5": p.yellow,
    "editorBracketHighlight.foreground6": p.fg,
    "editorBracketHighlight.unexpectedBracket.foreground": p.error,
  };
}

function buildTheme(palette, italic) {
  const suffix = italic ? " Italic" : "";
  return {
    name: palette.name + suffix,
    type: palette.type,
    semanticHighlighting: true,
    semanticTokenColors: buildSemanticTokenColors(palette, italic),
    tokenColors: buildTokenColors(palette, italic),
    colors: buildWorkbenchColors(palette),
  };
}

// Generate all 6 variants
const themesDir = path.join(__dirname, "themes");

if (!fs.existsSync(themesDir)) {
  fs.mkdirSync(themesDir, { recursive: true });
}

const variants = [];

for (const palette of palettes) {
  for (const italic of [false, true]) {
    const theme = buildTheme(palette, italic);
    const suffix = italic ? "-italic" : "";
    // Create filename from palette name
    const baseName = palette.name
      .toLowerCase()
      .replace(/\s+/g, "-");
    const fileName = `${baseName}${suffix}-color-theme.json`;
    const filePath = path.join(themesDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(theme, null, 2));
    variants.push({
      label: theme.name,
      uiTheme: palette.uiTheme,
      path: `./themes/${fileName}`,
    });
    console.log(`Generated: ${fileName}`);
  }
}

console.log("\nAll themes generated. Update package.json contributes.themes with:");
console.log(JSON.stringify(variants, null, 2));
