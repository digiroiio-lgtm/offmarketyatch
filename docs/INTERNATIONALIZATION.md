# Internationalisation and regional SEO

## First-wave locales

| Locale | Target markets | hreflang |
|---|---|---|
| English | United States, United Kingdom, global default | en-US, en-GB, x-default |
| Italian | Italy | it-IT |
| German | Germany, Austria, German-speaking Switzerland | de-DE, de-AT, de-CH |
| French | France, Belgium, French-speaking Switzerland, Luxembourg | fr-FR, fr-BE, fr-CH, fr-LU |
| Arabic | UAE, Saudi Arabia, Qatar | ar-AE, ar-SA, ar-QA |

German, French and Arabic regional variants share one language edition initially. Create country-specific variants only when search demand, local terminology, legal requirements or conversion data justify a distinct edition.

## Architecture

- English remains the canonical source language.
- Locale prefixes are /it, /de, /fr and /ar.
- Core commercial routes use localized slugs. Listing reference IDs and article identifiers remain stable.
- LocaleLink localizes internal links. LanguageSwitcher preserves the current page when switching languages.
- The root layout sets the document language and direction. Arabic uses RTL.
- The server translation tree translates page copy and display props without changing identifiers, query values, confidential inventory records or external URLs.
- localizedPageMetadata emits localized canonical URLs, Open Graph metadata and reciprocal hreflang alternates.
- Sitemap entries are emitted for all five editions with xhtml:link alternates.
- Organization structured data lists the first-wave service markets and available languages.

## Generate the complete translation catalog

The repository contains hand-reviewed translations for core commercial UI. The full source-copy catalog is generated from JSX text, editorial data and explicit t() calls.

1. Enable Google Cloud Translation API v2 for the project.
2. Create a restricted API key with access limited to the Translation API.
3. Set GOOGLE_TRANSLATE_API_KEY in the local shell or CI secret store.
4. Run: npm run i18n:translate
5. Review src/i18n/catalog.generated.ts, especially legal, finance, privacy, brokerage and yacht-technical terminology.
6. Run lint, typecheck, build and the locale QA checklist before deployment.

The translation API key is used only by the local/CI script and must never be exposed to the browser or committed to the repository. Generated translations are a first pass; native-speaker review is required before treating each locale as fully production-ready.

## Release QA by locale

- **Italian:** native terminology for yacht brokerage, private mandates, shipyards, refits and buyer qualification; test Italy and Italian-speaking Switzerland.
- **German:** verify formal address (Sie), compound nouns, yacht brokerage terms and regional spelling for DE/AT/CH.
- **French:** verify formal address (vous), nautical vocabulary and FR/BE/CH/LU terminology.
- **Arabic:** verify RTL navigation, form layout, numerals, punctuation, email/phone usability and Gulf-market wording for UAE/SA/QA.

For every locale, verify:
- Every public route loads and every internal navigation link remains in the same locale.
- Canonical URL, hreflang, Open Graph locale and document lang are correct.
- Sitemap contains each localized route and reciprocal alternates.
- Titles and descriptions are unique and fit search snippets.
- Forms preserve English internal enum values while showing localized labels.
- Search/filter behavior, validation, success states and email notifications remain unchanged.
- Confidential inventory fields remain masked and no private identifiers leak into page HTML, JSON-LD or metadata.
- No untranslated English remains in key conversion paths unless it is a proper noun, technical term or deliberate brand wording.
