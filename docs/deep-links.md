# Item links

Each project, experience position, education institution, and organization has a
link icon. Activate it to update the address and scroll to that item, or use the
browser's Copy Link action to share it. Modified clicks retain native
open-in-new-tab behavior. Existing outbound title, code, site, and media actions
keep their destinations.

Public links use short, stable names, separate from the content registry's IDs:

- Iris: `https://deven-shah.com/#iris`
- GDELT: `https://deven-shah.com/#gdelt`
- Kepler exoplanets: `https://deven-shah.com/#kepler`
- Accenture: `https://deven-shah.com/#accenture`
- Boston University: `https://deven-shah.com/#bu`
- Voyagers: `https://deven-shah.com/#voyagers`

Names are defined in `lib/url-utils.ts`. Keep existing names stable when
changing titles or adding content; names must be unique across all items and
section IDs. Previously shared prefixed links (such as `#project-iris-project`)
still resolve and are replaced with their short form in the address bar without
adding history. Internal DOM IDs remain unchanged for compatibility.

Project links clear filters only when needed to reveal the target. Experience
links work in Compact and Detailed modes. Organization links target the
organization itself, while its existing primary button still jumps to the
related role or opens its website.

Hash navigation supports initial visits, reloads, hash changes, and browser
Back/Forward. It waits for initial page/font loading, respects reduced motion,
uses the existing fixed-header scroll padding, and focuses the target. Pending
scroll attempts are canceled when a newer navigation takes over. Malformed or
unknown fragments are ignored.
