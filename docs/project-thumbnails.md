# Project thumbnail sources

Captured October 16, 2026. Previews are curated local assets, so portfolio
visitors do not wait for a cold hosted app, a repository crawl, or a screenshot
service. Existing videos remain unchanged; only still images are added here.

| Project                      | Preview source                                                                                                                                                                                                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Iris | User-supplied Iris brand image with the green leaf logo and Your day, simplified tagline, scaled without cropping to `/projects/thumbnails/iris-project-enterprise.webp`. |
| Boosted                      | The site's default `og:image`: [boosted.onrender.com/opengraph-image](https://boosted.onrender.com/opengraph-image). Captured after the Render app warmed up.                                                                                                                      |
| Graf                         | [Live homepage](https://graf-fawn.vercel.app/), which has no Open Graph image.                                                                                                                                                                                                     |
| UMLazy                       | [Live application](https://umlazy.vercel.app/), using its built-in Class diagram template. No Open Graph image is published.                                                                                                                                                       |
| Drone Path Planning          | [Live application](https://drone-path-planner.vercel.app/), showing the built-in Nominal survey mission after generation. No Open Graph image is published.                                                                                                                        |
| Breaking Dijkstra            | [Live application](https://breaking-dijkstra.vercel.app/), showing its Sparse Graph algorithm comparison. The preview opens the live app even though the primary project link is GitHub.                                                                                           |
| Wardrobe Copilot             | Still at 00:18 of the [README demo](https://github.com/devenshah2018/wardrobe-copilot#demo), showing the wardrobe and stylist interface.                                                                                                                                           |
| GDELT Conflict Forecasting   | Screenshot of the repository's actual Flask risk dashboard, run locally with its checked-in risk scores and metrics. The displayed results are dated July 20, 2026; no forecasts or UI were fabricated. [Repository](https://github.com/devenshah2018/gdelt-conflict-forecasting). |
| Image Retrieval | Native GitHub card with repository name and owner, matching Task Scheduling, as requested. |
| Kepler Exoplanets            | [Model comparison figure](https://github.com/devenshah2018/kepler-exoplanets/blob/main/figures/05_cv_comparison.png) in the README.                                                                                                                                                |
| Molecule Mutation Prediction | Native GitHub card with repository name and owner, matching Task Scheduling, as requested. |
| Task Scheduling              | [Repository](https://github.com/devenshah2018/task-scheduling) contains CLI research code, logs, and documentation, with no screenshot, demo video, or web interface. Uses the native GitHub card with the repository name.                                                        |

## Refreshing previews

Prefer a hosted site's `og:image`, then `twitter:image`. If neither is present,
capture the live application or a representative built-in example. For a
source-only repository, inspect its README and media files before selecting a
demo still or result figure. Use the GitHub card when explicitly requested or when there is no useful media;
do not substitute the generic GitHub social card when actual project media
exists.

Export to `public/projects/thumbnails/<project-id>.webp` at 640 × 400,
preserving the complete source image with contain sizing and a matching
background. The current files are each under 100 KB. Update the project's
`thumbnail` metadata in `database/content-registry.ts`, including meaningful alt
text, and record the source here. Do not store temporary signed GitHub asset
URLs in the registry.

`ProjectThumbnail` uses lazy loading and responsive sizes. Filtered-out rows
retain their descriptions and links for SEO, but do not mount a thumbnail or
request an image. Image failures fall back to a stable source card. No runtime
thumbnail API requests, autoplay videos, or external image dependencies are
added.
