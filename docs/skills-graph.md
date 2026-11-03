# Skills graph

The About section offers List and Graph views. List remains the default, with
its existing categories and related-work popups. Graph mounts a lazy Codon
iframe only while selected; returning to List releases the embedded graph. The
curated Codon skill identifiers and title are passed in the URL fragment.

The view picker uses accessible tabs with arrow-key and Home/End navigation. Its
selection indicator slides between views, content height adjusts smoothly, and
the graph fades in after its iframe loads. Reduced-motion preferences disable
these transitions. The selected List category survives view changes.

The List view uses compact, flat skill items that fill the available width
before wrapping. It deliberately avoids balanced text wrapping, which can
shorten rows prematurely. Category filters have a small selection underline;
skill hover and keyboard focus indicate access to related work. Skill controls
have consistent 14px type and a 44px minimum touch target, with no decorative
markers, row dividers, or repeated action arrows.

Both the local portfolio and deployed portfolio use hosted Codon at
`https://codon-omega.vercel.app` by default. Start the portfolio with:

```sh
npm run dev -- -p 3101
```

Open `http://localhost:3101/#about` and choose Graph beside Tools of the trade.
The public `NEXT_PUBLIC_CODON_BASE_URL` environment variable is an optional
override for testing a different Codon server; leave it unset for normal use.
