# Farway: the "before" version

This branch is the deliberately slow starting point of a web performance case study.
It is kept exactly as it was measured, and it is deployed at
https://farway-perf-before.vercel.app so the numbers can be checked.

Everything slow here is a pattern found on real sites: a client-rendered home page that
fetches its content from an API route, full-size 2400px JPEGs, render-blocking web fonts
and CDN stylesheets, a YouTube player and a map loaded on page load, and heavy libraries
(moment, lodash, react-slick, framer-motion) in the bundle.

The optimised version, the case study write-up and the measurements are on the
[`main` branch](https://github.com/datomaluta/farway-perf), one commit per fix.
