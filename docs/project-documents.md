# Project documents

Projects may have a `paper` PDF and an optional `slideDeck: { pdf, source? }` in
`database/content-registry.ts`. Keep browser previews and download sources in
`public/papers` and `public/slides`, respectively, using descriptive kebab-case
names. Documents are same-origin links in server HTML; ordinary clicks open a
separate document dialog, while modified clicks and browsers without JavaScript
retain normal link behavior.

The document dialog supports previous/next page, keyboard navigation
(Left/Right, Page Up/Down, Home/End while the page area is focused), selectable
text, zoom, fit page, fit width, PDF download, and opening the original PDF in
another tab. Slide decks also offer their original presentation download.
Escape, the close button, and the backdrop dismiss the dialog and restore focus.

`PdfViewer` and the existing PDF.js dependency load only when a document dialog
opens. Webpack emits the matching installed PDF.js worker as a same-origin
asset. Only one page renders at a time; rendering is canceled on
page/zoom/resize changes, and closing destroys the loading task, aborts
requests, and terminates its worker. Canvas backing stores are limited to 8
million pixels and at most 2x pixel density.

## GDELT slides

- Source: user-supplied `presentation-slides.pptx` from the GDELT term project.
- Original: `/slides/gdelt-conflict-forecasting.pptx`, copied without changes.
- Browser preview: `/slides/gdelt-conflict-forecasting.pdf`, a 20-page PDF
  export through LibreOffice. Every slide was rendered and visually inspected.
- The PDF is a static preview. Embedded video (slide 15) remains available in
  the original PowerPoint; the viewer explains this and offers the download.

To replace a deck, preserve the original presentation, regenerate its PDF with
an office PDF exporter, compare slide counts and inspect the rendered slides,
then update the registry paths. PowerPoint files are never sent to an external
preview service.

## Project actions

Actions appear in this order when available: Live Site, Demo, Code, Paper,
Slidedeck. Hosted links are labeled Live Site; Demo always denotes the local
video player. The shared action styles provide 44px minimum touch targets and a
filled accent for Live Site.
