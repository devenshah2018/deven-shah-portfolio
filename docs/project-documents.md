# Project documents

Projects may have a `paper` PDF and an optional
`slideDeck: { pdf, source?, videos? }` in `database/content-registry.ts`. Keep
browser previews and download sources in `public/papers` and `public/slides`,
respectively, using descriptive kebab-case names. Paper and slide actions are
native buttons that open a document dialog. They cannot launch media tabs
through modified or middle clicks. A same-origin download link in `noscript`
preserves document discovery and access for browsers without JavaScript.

Papers display every page in a continuous vertical scroll, with visible page
labels and a total page count. Native scrolling, including Page Up/Down and
Home/End, works while the reading area is focused. Slide decks retain
previous/next controls and keyboard navigation (Left/Right, Page Up/Down,
Home/End). Both support selectable text, zoom, fit page, fit width, and PDF
download. Media stays inside the portfolio viewer; there are no open-in-new-tab
media actions. Slide decks also offer one icon-only Download control that opens
a PDF/PPTX format chooser. Papers use an icon-only direct PDF download. Download
controls have accessible labels and tooltips; format choices remain download
links with no new tabs. Escape, the close button, and the backdrop dismiss the
dialog and restore focus.

`PdfViewer` and the existing PDF.js dependency load only when a document dialog
opens. Webpack emits the matching installed PDF.js worker as a same-origin
asset. Slide decks render one page at a time. Papers reserve space for every
page but render only pages near the scroll viewport; distant canvases and text
layers are released while page dimensions remain stable. Rendering is canceled
on navigation/zoom/resize changes, and closing destroys the loading task, aborts
requests, and terminates its worker. Canvas backing stores are limited to 8
million pixels and at most 2x pixel density.

## GDELT slides

- Source: user-supplied `presentation-slides.pptx` from the GDELT term project.
- Original: `/slides/gdelt-conflict-forecasting.pptx`, copied without changes.
- Browser preview: `/slides/gdelt-conflict-forecasting.pdf`, a 20-page PDF
  export through LibreOffice. Every slide was rendered and visually inspected.
- Slide 15 overlays the original embedded video at its PowerPoint position. The
  local `/slides/gdelt-conflict-forecasting-demo.mp4` was extracted from
  `ppt/media/media1.mp4` and remuxed without re-encoding for fast-start
  playback.
- In the portfolio viewer it autoplays muted, inline, and loops, with a pause
  control and a play action if browser autoplay is blocked. It mounts only on
  its slide, remains the same video through zoom/resize, and releases its stream
  on navigation or close. No video downloads occur on other slides or papers.
- Downloaded PDFs remain static; the original PowerPoint retains embedded media.

To replace a deck, preserve the original presentation, regenerate its PDF with
an office PDF exporter, compare slide counts and inspect the rendered slides,
then update the registry paths. Optional `videos` entries declare a 1-based
slide `page`, local `src`, and `bounds` (`left`, `top`, `width`, `height` as
slide percentages), measured from the original presentation. PowerPoint files
are never sent to an external preview service.

## Project actions

Actions appear in this order when available: Live Site, Demo, Code, Paper,
Slidedeck. Hosted links are labeled Live Site; Demo always denotes the local
video player. The shared action styles provide 44px minimum touch targets and a
filled accent for Live Site.
