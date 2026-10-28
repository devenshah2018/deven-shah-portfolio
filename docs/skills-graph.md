# Skills graph

The About section offers List and Graph views. List remains the default, with
its existing categories and related-work popups. Graph mounts a lazy Codon
iframe only while selected; returning to List releases the embedded graph. The
curated Codon skill identifiers and title are passed in the URL fragment.

The view picker uses accessible tabs with arrow-key and Home/End navigation. Its
selection indicator slides between views, content height adjusts smoothly, and
the graph fades in after its iframe loads. Reduced-motion preferences disable
these transitions. The selected List category survives view changes.

The List view uses naturally sized, wrapping skill items with quiet markers and
borderless spacing. Category filters have a small selection underline; skill
hover and keyboard focus indicate access to related work without permanent row
dividers, cards, or repeated action arrows.

Both the local portfolio and deployed portfolio use hosted Codon at
`https://codon-omega.vercel.app` by default. Start the portfolio with:

```sh
npm run dev -- -p 3101
```

Open `http://localhost:3101/#about` and choose Graph beside Tools of the trade.
The public `NEXT_PUBLIC_CODON_BASE_URL` environment variable is an optional
override for testing a different Codon server; leave it unset for normal use.
