# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML/CSS/JS — confirmed by the user. Single self-contained page, no build step, no dependencies. Chosen so the site can be hosted anywhere (GitHub Pages, Cloudflare Pages, Netlify) and so the apex domain stays free for later subdomains (internal apps, webmail).

## Users

Primary: homeowners and small-business owners in Cervães, Vila Verde, and neighbouring municipalities who have a plumbing or electrical problem right now — a leak, a blocked drain, no hot water, a tripped board, a socket that stopped working. They are frequently stressed, often on a phone, and deciding in under a minute whether to trust this company enough to call.

Secondary: people planning non-urgent work — a bathroom renovation, rewiring an older house, installing a water heater or solar thermal panels — who are comparing two or three local tradespeople before requesting a quote.

## Product Purpose

A one-page website that makes Tecnomicer findable, legible, and immediately contactable. Success is a phone call, a WhatsApp message, or a submitted quote request. It is not a catalogue or a portfolio; it is the shortest path from "I have a problem" to "someone competent is coming".

Later phases (not this surface): the domain hosts subdomains for internal apps and company email. The site must not occupy paths or assumptions that would block that.

## Positioning

A single local firm covering both trades — plumbing *and* electrical. The customer calls one number instead of coordinating two tradespeople, which matters most in exactly the jobs where the two trades meet: bathrooms, kitchens, water heaters, boiler rooms.

The name encodes the locality: Tecnomicer = **Tecno**logias **Mi**nho **Cer**vães. Being *from here* is the credibility argument, not a slogan.

## Operating Context

Two distinct scenes the site must serve at once:

- **Urgent:** the visitor is standing in water, or in the dark, on a phone, one-handed. They need a tappable phone number above everything else. Speed of comprehension beats persuasion.
- **Planned:** the visitor is on a sofa, comparing options, wanting to know scope, competence, and whether the firm handles the whole job. They will read.

Work happens in customers' homes — kitchens, bathrooms, garages, electrical boards, crawl spaces. Quoting is typically a site visit.

## Capabilities and Constraints

Confirmed:
- Two service lines: plumbing (pichelaria) and electrical (eletricidade).
- Service area: Vila Verde and neighbouring municipalities (Cervães, Vila Verde, Braga and surroundings).
- Primary action: phone call / WhatsApp, prominent. Secondary action: quote-request form.
- Static hosting; no server-side runtime available at launch.

Constraints:
- The quote form has no backend yet. It must degrade to something that works with no server (mailto / WhatsApp deep link) and be swappable for a real endpoint later.
- Portuguese (pt-PT) is the site language.

**Undecided — must not be invented:**
- Real phone number, WhatsApp number, and email address.
- Street address, and whether the firm wants one published at all.
- Legal identifiers (NIF, alvará / registration numbers), insurance details.
- Years in business, team size, number of jobs completed.
- Business hours, and whether a genuine out-of-hours emergency service exists.
- Prices, call-out fees, and whether quotes are free.
- Existing logo, brand colours, or typefaces.

## Brand Commitments

- Name: **Tecnomicer**. Expansion: Tecnologias Minho Cervães. The expansion is real and usable as supporting copy.
- No existing logo, palette, or typography was supplied; none is binding.
- Voice: plain, competent, local. Not corporate, not jokey.

## Evidence on Hand

None. There are no photographs of real work, no customer testimonials, no certifications, no case studies, and no completed-job counts available.

Consequences for any surface built now:
- No testimonials, review scores, client logos, or job statistics may be fabricated — not even as placeholder-looking text, because visitors read them as claims.
- Imagery must be authored (drawn/SVG) rather than presented as photographs of this firm's actual work.
- Every contact detail and legal identifier ships as a clearly marked placeholder on the user's replacement list.

## Product Principles

1. **The call is the product.** Every scroll position keeps a way to reach a human within one tap.
2. **Both trades, one firm.** The dual competence is the differentiator and should be structural, not a bullet point.
3. **Local is the proof.** Absent testimonials and certifications, specific geography is the strongest honest credibility signal available.
4. **Honest until filled in.** No invented numbers, reviews, credentials, or prices. Placeholders are marked as placeholders.
5. **Don't mortgage the domain.** The site is one artifact at the root; later subdomains for apps and mail must remain unconstrained.

## Accessibility & Inclusion

The urgent scene sets the floor: one-handed phone use, possibly poor light, possibly a cracked screen, possibly an older visitor. Large tap targets, real text (not text baked into images), strong contrast, and full function without JavaScript for the contact paths.
