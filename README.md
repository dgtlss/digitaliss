# digitaliss

A vibrant theme suite for VS Code and Cursor, inspired by Monokai and Dracula. Comes in 6 variants — Dark, Pastel, and Light, each with an optional italic style.

![digitaliss JS Example](https://github.com/dgtlss/digitaliss/blob/main/images/jsexample.png?raw=true)

## Variants

| Theme | Description |
|-------|-------------|
| **digitaliss** | The original dark theme with vivid cyan, purple, lime, pink, and yellow accents |
| **digitaliss Italic** | Dark theme with italic keywords, types, and language variables |
| **digitaliss Pastel** | Softer, muted tones — teal, lavender, sage, rose, and sand on a dark background |
| **digitaliss Pastel Italic** | Pastel palette with italic styling |
| **digitaliss Light** | Full light mode with adjusted colors for readability on white backgrounds |
| **digitaliss Light Italic** | Light theme with italic styling |

## Language Support

Optimized syntax highlighting for:

- **Web** — JavaScript, TypeScript, JSX/TSX, React, Vue, HTML, CSS, SCSS, LESS
- **Backend** — PHP, Laravel Blade, Python, Ruby, Java, C#, Go, Rust, Kotlin
- **Shell & DevOps** — Bash/Shell, Dockerfile, YAML, TOML, .env, SQL
- **Other** — Markdown, JSON/JSONC, Haskell, Elixir, Clojure, Groovy, Swift, HLSL, Makefile

Plus 35 semantic token colors for enhanced IDE integration and bracket pair colorization.

## Installation

1. Open **Extensions** in VS Code or Cursor. `View > Extensions`
2. Search for `digitaliss`
3. Click **Install**
4. Open the Command Palette (`Cmd+K Cmd+T` on macOS, `Ctrl+K Ctrl+T` on Windows/Linux) and select your preferred variant.

## Building from Source

The theme is generated from a palette-based build system. To modify colors or add languages:

1. Edit `palettes.js` to adjust colors for any variant
2. Edit `build.js` to add or modify token rules
3. Run `node build.js` to regenerate all 6 theme files

Changing a single color in `palettes.js` updates it across all variants automatically.

## Customization

VS Code lets you override any theme colors. Add overrides to your `settings.json`:

```json
"workbench.colorCustomizations": {
  "[digitaliss]": {
    "editor.background": "#1e1d2b"
  }
},
"editor.tokenColorCustomizations": {
  "[digitaliss]": {
    "comments": "#7a7b9e"
  }
}
```

See the [VS Code Theme Color Reference](https://code.visualstudio.com/api/references/theme-color) for all available keys.

## Contributing

Contributions are welcome — improvements, bug reports, or feature requests. Fork the repo and submit a pull request.

## Credits

- Designed and developed by [Nathan Langer](https://github.com/dgtlss)
- Inspired by Monokai and Dracula

---

Enjoy coding with digitaliss! If you like it, consider rating it on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=dgtlss.digitaliss).
