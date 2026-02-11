# Changelog

All notable changes to the "digitaliss" extension will be documented in this file.

## [2.0.1] - 2026-02-11

### Added

- **5 new theme variants** — digitaliss Italic, digitaliss Pastel, digitaliss Pastel Italic, digitaliss Light, digitaliss Light Italic
- **Pastel palette** — soft, muted tones (teal, lavender, sage, rose, sand) on a dark background
- **Light mode** — full light theme with colors tuned for readability on white backgrounds
- **Italic variants** — italic styling on keywords, types, storage modifiers, and language variables
- **Bracket pair colorization** using the theme's accent palette
- **35 semantic token colors** (up from 3) — functions, methods, types, interfaces, parameters, decorators, enums, namespaces, and more
- **Expanded language support:**
  - React/JSX/TSX — component tags, expression braces, spread operators
  - Vue — directives, shorthand attributes, component tags, interpolation
  - PHP 8+ — attributes, enums, match expressions, arrow functions, named arguments, property promotion
  - Laravel Blade — directives, echo braces, raw echo, component tags
  - Rust — types, traits, macros, attributes, unsafe, async/await, impl/where (7 → 20+ rules)
  - Go — functions, types, storage, builtins, imports, method receivers (4 → 15+ rules)
  - Ruby — classes, modules, functions, instance/class variables, symbols, heredocs, blocks (2 → 15+ rules)
  - Kotlin — classes, functions, annotations, null-safety, coroutines, string templates
  - Shell/Bash — builtins, variables, pipes, redirections, subshells
  - Dockerfile — instructions, variables
  - YAML — anchors, aliases, block scalars, booleans, nulls (1 → 10 rules)
  - TOML — tables, array tables, dates, booleans
  - .env files — variable names, values, comments
  - SQL — keywords, functions, operators, types, table/database names (1 → 8 rules)
  - CSS/SCSS — variables, media queries, at-rules, property names
  - HTML — custom elements, data attributes
  - Markdown — fenced code block language tags
- **Build system** (`build.js` + `palettes.js`) — all 6 themes generated from shared palette definitions; change one color and regenerate all variants with `node build.js`

### Changed

- Updated README with variant table, language list, build instructions, and customization examples
- Version bumped to 2.0.1

## [1.0.1] - 2024-02-01

- Added theme icon

## [1.0.0] - 2024-02-01

- Updated package and VSIX version

## [0.0.2] - 2024-02-01

- Initial release
