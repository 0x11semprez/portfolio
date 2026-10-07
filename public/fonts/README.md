Site typeface: Hina Mincho, one weight (Regular), everywhere.

  HinaMincho-Regular.woff2  (committed; SIL OFL, see HinaMincho-OFL.txt)
    Subset of the Google Fonts TTF to Latin, Greek and Cyrillic, which
    covers every French accent:
      pyftsubset HinaMincho-Regular.ttf \
        --unicodes="U+0000-024F,U+0300-036F,U+0370-03FF,U+0400-04FF,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2100-214F,U+2190-21FF,U+2212,U+25A0-25FF" \
        --layout-features='*' --flavor=woff2 --output-file=HinaMincho-Regular.woff2

  The font has no bold: `font-bold` text is emboldened by the browser.

`index.html` declares the @font-face for this path.
