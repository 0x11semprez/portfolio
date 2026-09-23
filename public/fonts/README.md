Site typeface, in order of preference:

  NanumMyeongjo-{Regular,ExtraBold}.woff2  (committed; Naver, SIL OFL,
    see NanumMyeongjo-OFL.txt; Latin subset from Google Fonts; ExtraBold
    serves weight 700, its Bold is too light next to YDMyungjo). The font
    has no accented letters, so é è à ç … are added as composites of its
    own ` ^ . ~ , glyphs by scripts/font-accents.py (needs fonttools):
      python3 scripts/font-accents.py in.woff2 out.woff2

  YDMyungjo-Regular.woff2 / YDMyungjo-Bold.woff2  (licensed, NOT committed —
    drop them here and the site switches to them, nothing else to change)

`public/index.html` declares the @font-face for exactly these paths.
