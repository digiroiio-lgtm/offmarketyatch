import { canonical } from "@/lib/site";
import { GENERATED_TRANSLATIONS } from "@/i18n/catalog.generated";

export const SUPPORTED_LOCALES = ["it", "de", "fr", "ar"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export type Locale = "en" | SupportedLocale;

export const LOCALE_CONFIG: Record<Locale, {
  htmlLang: string;
  ogLocale: string;
  dir: "ltr" | "rtl";
  hreflang: string[];
}> = {
  en: { htmlLang: "en-US", ogLocale: "en_US", dir: "ltr", hreflang: ["en-US", "en-GB"] },
  it: { htmlLang: "it-IT", ogLocale: "it_IT", dir: "ltr", hreflang: ["it-IT"] },
  de: { htmlLang: "de-DE", ogLocale: "de_DE", dir: "ltr", hreflang: ["de-DE", "de-AT", "de-CH"] },
  fr: { htmlLang: "fr-FR", ogLocale: "fr_FR", dir: "ltr", hreflang: ["fr-FR", "fr-BE", "fr-CH", "fr-LU"] },
  ar: { htmlLang: "ar", ogLocale: "ar_AE", dir: "rtl", hreflang: ["ar-AE", "ar-SA", "ar-QA"] },
};

type Message = Partial<Record<SupportedLocale, string>>;

/**
 * Hand-reviewed core UI translations. The full editorial and landing-page
 * catalog is generated from source content by scripts/translate-content.mjs.
 * English remains the source of truth for form values and internal identifiers.
 */
const MESSAGES: Record<string, Message> = {
  "The Private Side of the Yacht Market": {
    it: "Il lato riservato del mercato degli yacht", de: "Die private Seite des Yachtmarkts",
    fr: "Le côté confidentiel du marché des yachts", ar: "الجانب الخاص من سوق اليخوت",
  },
  "Skip to content": { it: "Vai al contenuto", de: "Zum Inhalt springen", fr: "Aller au contenu", ar: "تخطي إلى المحتوى" },
  "Private Market": { it: "Mercato privato", de: "Privater Markt", fr: "Marché privé", ar: "السوق الخاص" },
  "Yachts": { it: "Yacht", de: "Yachten", fr: "Yachts", ar: "اليخوت" },
  "USA": { it: "Stati Uniti", de: "USA", fr: "États-Unis", ar: "الولايات المتحدة" },
  "Sell Privately": { it: "Vendere in privato", de: "Privat verkaufen", fr: "Vendre en privé", ar: "البيع بسرية" },
  "Intelligence": { it: "Approfondimenti", de: "Markteinblicke", fr: "Analyses", ar: "رؤى السوق" },
  "Private Access": { it: "Accesso privato", de: "Privater Zugang", fr: "Accès privé", ar: "الوصول الخاص" },
  "Motor Yachts": { it: "Yacht a motore", de: "Motoryachten", fr: "Yachts à moteur", ar: "يخوت بمحركات" },
  "Explorer Yachts": { it: "Yacht explorer", de: "Explorer-Yachten", fr: "Yachts d’exploration", ar: "يخوت الاستكشاف" },
  "Sailing Yachts": { it: "Yacht a vela", de: "Segelyachten", fr: "Voiliers", ar: "يخوت شراعية" },
  "Superyachts": { it: "Superyacht", de: "Superyachten", fr: "Superyachts", ar: "يخوت فائقة الفخامة" },
  "Mega Yachts": { it: "Mega yacht", de: "Megayachten", fr: "Mégayachts", ar: "يخوت عملاقة" },
  "Luxury Yachts": { it: "Yacht di lusso", de: "Luxusyachten", fr: "Yachts de luxe", ar: "يخوت فاخرة" },
  "All Yachts for Sale": { it: "Tutti gli yacht in vendita", de: "Alle Yachten zum Verkauf", fr: "Tous les yachts à vendre", ar: "جميع اليخوت المعروضة للبيع" },
  "Off-Market Yachts": { it: "Yacht off-market", de: "Off-Market-Yachten", fr: "Yachts hors marché", ar: "يخوت خارج السوق" },
  "Private Market — Active": { it: "Mercato privato — Attivo", de: "Privater Markt — Aktiv", fr: "Marché privé — Actif", ar: "السوق الخاص — نشط" },
  "Discover yachts": { it: "Scopri gli yacht", de: "Entdecken Sie Yachten", fr: "Découvrez des yachts", ar: "اكتشف اليخوت" },
  "before they reach the market.": { it: "prima che arrivino sul mercato.", de: "bevor sie auf den Markt kommen.", fr: "avant leur mise sur le marché.", ar: "قبل طرحها في السوق." },
  "Explore confidential, off-market and privately available yacht opportunities sourced through our international network.": {
    it: "Scopri opportunità riservate, off-market e disponibili privatamente, individuate attraverso la nostra rete internazionale.",
    de: "Entdecken Sie vertrauliche Off-Market-Yachtangebote aus unserem internationalen Netzwerk.",
    fr: "Découvrez des opportunités confidentielles, hors marché et disponibles en privé, identifiées grâce à notre réseau international.",
    ar: "استكشف فرص اليخوت السرية وخارج السوق والمتاحة بشكل خاص من خلال شبكتنا الدولية.",
  },
  "Explore Private Opportunities": { it: "Esplora le opportunità riservate", de: "Private Angebote entdecken", fr: "Explorer les opportunités privées", ar: "استكشف الفرص الخاصة" },
  "Tell Us What You’re Looking For": { it: "Raccontaci cosa stai cercando", de: "Teilen Sie uns Ihre Wünsche mit", fr: "Dites-nous ce que vous recherchez", ar: "أخبرنا عمّا تبحث عنه" },
  "Confidential inquiries · Private buyer matching · Global sourcing": {
    it: "Richieste riservate · Matching privato degli acquirenti · Ricerca globale",
    de: "Vertrauliche Anfragen · Privates Käufer-Matching · Globale Suche",
    fr: "Demandes confidentielles · Mise en relation privée · Recherche mondiale",
    ar: "استفسارات سرية · مطابقة خاصة للمشترين · بحث عالمي",
  },
  "Private Opportunities": { it: "Opportunità riservate", de: "Private Angebote", fr: "Opportunités privées", ar: "فرص خاصة" },
  "United States": { it: "Stati Uniti", de: "Vereinigte Staaten", fr: "États-Unis", ar: "الولايات المتحدة" },
  "Florida & Bahamas": { it: "Florida e Bahamas", de: "Florida und Bahamas", fr: "Floride et Bahamas", ar: "فلوريدا وجزر البهاما" },
  "Verified Off-Market": { it: "Off-market verificati", de: "Verifiziertes Off-Market", fr: "Hors marché vérifiés", ar: "فرص خارج السوق تم التحقق منها" },
  "Recently Added": { it: "Aggiunti di recente", de: "Kürzlich hinzugefügt", fr: "Ajouts récents", ar: "أضيفت مؤخراً" },
  "Private opportunities, newly published.": { it: "Nuove opportunità riservate, appena pubblicate.", de: "Neu veröffentlichte private Angebote.", fr: "De nouvelles opportunités privées, tout juste publiées.", ar: "فرص خاصة نُشرت حديثاً." },
  "Each entry is masked to the level the owner has authorised. Class, proportion, era and price band are published; identity and exact position are held back.": {
    it: "Ogni scheda è anonimizzata secondo il livello autorizzato dal proprietario. Sono pubblicati categoria, dimensioni indicative, periodo e fascia di prezzo; identità e posizione esatta restano riservate.",
    de: "Jeder Eintrag ist entsprechend der Freigabe des Eigentümers anonymisiert. Klasse, Größe, Bauzeitraum und Preisrahmen werden veröffentlicht; Identität und genauer Standort bleiben vertraulich.",
    fr: "Chaque fiche est masquée selon le niveau autorisé par le propriétaire. La catégorie, les dimensions, l’époque et la fourchette de prix sont publiées ; l’identité et la position exacte restent confidentielles.",
    ar: "يتم إخفاء بيانات كل فرصة وفقاً لما يسمح به المالك. تُعرض الفئة والحجم التقريبي والفترة ونطاق السعر، بينما تبقى الهوية والموقع الدقيق سريين.",
  },
  "View all opportunities": { it: "Vedi tutte le opportunità", de: "Alle Angebote ansehen", fr: "Voir toutes les opportunités", ar: "عرض جميع الفرص" },
  "Private Market Search": { it: "Ricerca nel mercato privato", de: "Suche im privaten Markt", fr: "Recherche sur le marché privé", ar: "البحث في السوق الخاص" },
  "Search the private market.": { it: "Cerca nel mercato privato.", de: "Den privaten Markt durchsuchen.", fr: "Rechercher sur le marché privé.", ar: "ابحث في السوق الخاص." },
  "Filter by price band, length, cruising area, class and build region. Every result is a masked opportunity — the detail is released after qualification.": {
    it: "Filtra per fascia di prezzo, lunghezza, area di navigazione, categoria e regione di costruzione. Ogni risultato è un’opportunità anonimizzata; i dettagli vengono comunicati dopo la qualifica.",
    de: "Filtern Sie nach Preisrahmen, Länge, Fahrtgebiet, Klasse und Bauregion. Jedes Ergebnis ist ein anonymisiertes Angebot; Details werden erst nach einer Qualifizierung offengelegt.",
    fr: "Filtrez par fourchette de prix, longueur, zone de navigation, catégorie et région de construction. Chaque résultat est une opportunité masquée ; les détails sont communiqués après qualification.",
    ar: "يمكنك التصفية حسب نطاق السعر والطول ومنطقة الإبحار والفئة ومنطقة البناء. كل نتيجة فرصة مخفية البيانات، ولا تُكشف التفاصيل إلا بعد التأهيل.",
  },
  "Why Off-Market": { it: "Perché off-market", de: "Warum Off-Market?", fr: "Pourquoi le hors marché ?", ar: "لماذا خارج السوق؟" },
  "The best opportunity may never hit the public market.": { it: "La migliore opportunità potrebbe non arrivare mai sul mercato pubblico.", de: "Die beste Gelegenheit erscheint möglicherweise nie auf dem öffentlichen Markt.", fr: "La meilleure opportunité ne sera peut-être jamais proposée sur le marché public.", ar: "قد لا تُطرح أفضل فرصة في السوق العام أبداً." },
  "A public listing is an event with consequences. It signals intent to charter clients, unsettles crew, invites brokers who have no buyer, and anchors a price the market will remember for as long as the yacht is on it.": {
    it: "Un annuncio pubblico è un evento con conseguenze. Segnala ai clienti charter l’intenzione di vendere, può destabilizzare l’equipaggio, attira broker senza un acquirente e fissa un prezzo che il mercato ricorderà finché lo yacht resterà online.",
    de: "Eine öffentliche Anzeige hat Folgen. Sie signalisiert Charterkunden Verkaufsabsichten, kann die Crew verunsichern, zieht Makler ohne konkreten Käufer an und verankert einen Preis, an den sich der Markt erinnert.",
    fr: "Une annonce publique a des conséquences. Elle signale une intention de vendre aux clients charter, déstabilise parfois l’équipage, attire des courtiers sans acheteur et ancre un prix dans la mémoire du marché.",
    ar: "للإعلان العام تبعات. فهو يشير إلى نية البيع لعملاء التأجير، وقد يربك الطاقم، ويجذب وسطاء بلا مشترٍ، ويرسّخ سعراً يتذكره السوق.",
  },
  "Read the full explanation of how off-market yacht sales work →": { it: "Leggi la guida completa alle vendite di yacht off-market →", de: "Lesen Sie die vollständige Erklärung zum Off-Market-Yachtverkauf →", fr: "Lire l’explication complète du fonctionnement des ventes de yachts hors marché →", ar: "اقرأ الشرح الكامل لكيفية بيع اليخوت خارج السوق ←" },
  "USA opportunities.": { it: "Opportunità negli Stati Uniti.", de: "Angebote in den USA.", fr: "Opportunités aux États-Unis.", ar: "فرص في الولايات المتحدة." },
  "Florida is the deepest private market in the world for yachts over 80 ft. These are the US-based opportunities currently published.": {
    it: "La Florida è il mercato privato più profondo al mondo per gli yacht oltre gli 80 piedi. Queste sono le opportunità attualmente pubblicate negli Stati Uniti.",
    de: "Florida ist der weltweit bedeutendste private Markt für Yachten über 80 Fuß. Hier finden Sie die derzeit veröffentlichten Angebote in den USA.",
    fr: "La Floride est le marché privé le plus profond au monde pour les yachts de plus de 80 pieds. Voici les opportunités actuellement publiées aux États-Unis.",
    ar: "تُعد فلوريدا أعمق سوق خاص في العالم لليخوت التي يزيد طولها عن 80 قدماً. هذه هي الفرص المنشورة حالياً في الولايات المتحدة.",
  },
  "All USA opportunities": { it: "Tutte le opportunità USA", de: "Alle US-Angebote", fr: "Toutes les opportunités aux États-Unis", ar: "جميع فرص الولايات المتحدة" },
  "Can’t find what you’re looking for?": { it: "Non trovi quello che cerchi?", de: "Nicht gefunden, wonach Sie suchen?", fr: "Vous ne trouvez pas ce que vous cherchez ?", ar: "لم تجد ما تبحث عنه؟" },
  "Tell us the yacht.": { it: "Dicci quale yacht cerchi.", de: "Sagen Sie uns, welche Yacht Sie suchen.", fr: "Dites-nous quel yacht vous recherchez.", ar: "أخبرنا عن اليخت الذي تبحث عنه." },
  "We’ll search the private market.": { it: "Cercheremo nel mercato privato.", de: "Wir durchsuchen den privaten Markt.", fr: "Nous chercherons sur le marché privé.", ar: "سنبحث في السوق الخاص." },
  "Not every yacht available for purchase appears online. Submit your acquisition criteria and let our network search beyond publicly advertised inventory.": {
    it: "Non tutti gli yacht disponibili vengono pubblicati online. Inviaci i tuoi criteri di acquisto e la nostra rete cercherà anche oltre gli annunci pubblici.",
    de: "Nicht jede zum Kauf verfügbare Yacht wird online angeboten. Teilen Sie uns Ihre Suchkriterien mit und unser Netzwerk sucht auch außerhalb öffentlich inserierter Angebote.",
    fr: "Tous les yachts disponibles à l’achat ne sont pas visibles en ligne. Transmettez-nous vos critères et notre réseau cherchera au-delà des annonces publiques.",
    ar: "لا تُعرض جميع اليخوت المتاحة للشراء عبر الإنترنت. أرسل معايير الشراء الخاصة بك ودع شبكتنا تبحث خارج المخزون المعلن للجمهور.",
  },
  "Targeted approaches to owners who have not listed": { it: "Contatti mirati con proprietari che non hanno pubblicato annunci", de: "Gezielte Ansprache von Eigentümern ohne öffentliche Anzeige", fr: "Approches ciblées auprès de propriétaires non annonceurs", ar: "التواصل المستهدف مع المالكين الذين لم يعلنوا عن يخوتهم" },
  "Cooperating brokers holding pocket listings": { it: "Broker partner con incarichi riservati", de: "Kooperierende Makler mit vertraulichen Angeboten", fr: "Courtiers partenaires détenant des mandats confidentiels", ar: "وسطاء متعاونون لديهم عروض غير معلنة" },
  "Captains and managers who know a boat is coming available": { it: "Comandanti e manager informati su yacht prossimi alla vendita", de: "Kapitäne und Manager, die von bevorstehenden Verkäufen wissen", fr: "Capitaines et gestionnaires informés des yachts bientôt disponibles", ar: "قباطنة ومديرون يعلمون باليخوت التي ستُتاح قريباً" },
  "How It Works": { it: "Come funziona", de: "So funktioniert es", fr: "Comment ça marche", ar: "كيف تعمل الخدمة" },
  "Four steps, one conversation.": { it: "Quattro passaggi, una conversazione.", de: "Vier Schritte, ein Gespräch.", fr: "Quatre étapes, une conversation.", ar: "أربع خطوات ومحادثة واحدة." },
  "Search": { it: "Cerca", de: "Suchen", fr: "Rechercher", ar: "بحث" },
  "Browse available private opportunities. Every listing is masked to the level its owner has authorised.": { it: "Esplora le opportunità private disponibili. Ogni scheda è anonimizzata secondo il livello autorizzato dal proprietario.", de: "Durchsuchen Sie verfügbare private Angebote. Jeder Eintrag ist entsprechend der Freigabe des Eigentümers anonymisiert.", fr: "Parcourez les opportunités privées disponibles. Chaque fiche est masquée selon le niveau autorisé par son propriétaire.", ar: "تصفح الفرص الخاصة المتاحة. يتم إخفاء بيانات كل عرض وفقاً لما يسمح به مالكه." },
  "Request Access": { it: "Richiedi accesso", de: "Zugang anfragen", fr: "Demander l’accès", ar: "طلب الوصول" },
  "Tell us what you are looking for, or request detail against a specific reference.": { it: "Dicci cosa stai cercando oppure richiedi informazioni indicando un riferimento specifico.", de: "Teilen Sie uns Ihre Wünsche mit oder fragen Sie unter Angabe einer Referenznummer Details an.", fr: "Indiquez ce que vous recherchez ou demandez des précisions à partir d’une référence.", ar: "أخبرنا عمّا تبحث عنه أو اطلب تفاصيل باستخدام رقم مرجعي محدد." },
  "Qualify": { it: "Qualifica", de: "Qualifizieren", fr: "Qualifier", ar: "التأهيل" },
  "We verify buyer requirements against the owner's terms. A person reviews every request.": { it: "Verifichiamo i requisiti dell’acquirente rispetto alle condizioni del proprietario. Ogni richiesta viene esaminata da una persona.", de: "Wir gleichen die Käuferanforderungen mit den Bedingungen des Eigentümers ab. Jede Anfrage wird persönlich geprüft.", fr: "Nous vérifions les critères de l’acheteur au regard des conditions du propriétaire. Chaque demande est examinée par une personne.", ar: "نتحقق من متطلبات المشتري وفق شروط المالك. تتم مراجعة كل طلب بواسطة أحد أعضاء الفريق." },
  "Connect": { it: "Entra in contatto", de: "Kontakt herstellen", fr: "Mettre en relation", ar: "التواصل" },
  "Relevant confidential information or introductions can be provided where authorized.": { it: "Le informazioni riservate pertinenti o le presentazioni vengono fornite solo se autorizzate.", de: "Relevante vertrauliche Informationen oder Kontakte werden nur mit entsprechender Genehmigung vermittelt.", fr: "Les informations confidentielles pertinentes ou les mises en relation sont fournies lorsque cela est autorisé.", ar: "يمكن تقديم المعلومات السرية ذات الصلة أو إجراء التعارف عند وجود تصريح بذلك." },
  "Considering Selling Your Yacht?": { it: "Stai pensando di vendere il tuo yacht?", de: "Möchten Sie Ihre Yacht verkaufen?", fr: "Vous envisagez de vendre votre yacht ?", ar: "هل تفكر في بيع يختك؟" },
  "Sell quietly.": { it: "Vendi con discrezione.", de: "Diskret verkaufen.", fr: "Vendez en toute discrétion.", ar: "بِع بسرية." },
  "Explore buyer demand without immediately placing your yacht on the public market.": { it: "Valuta la domanda degli acquirenti senza mettere subito il tuo yacht sul mercato pubblico.", de: "Prüfen Sie die Käufernachfrage, ohne Ihre Yacht sofort öffentlich anzubieten.", fr: "Évaluez la demande des acheteurs sans mettre immédiatement votre yacht sur le marché public.", ar: "استكشف طلب المشترين دون طرح يختك فوراً في السوق العام." },
  "Nothing is published, circulated or listed without your instruction. We will not value your yacht from a form, and we will not tell you a buyer exists unless one does.": { it: "Nulla viene pubblicato, diffuso o messo in vendita senza le tue istruzioni. Non stimiamo il valore dello yacht sulla base di un modulo e non dichiareremo l’esistenza di un acquirente se non è reale.", de: "Ohne Ihre Anweisung wird nichts veröffentlicht, verbreitet oder inseriert. Wir bewerten Ihre Yacht nicht anhand eines Formulars und behaupten keinen Käufer, wenn es keinen gibt.", fr: "Rien n’est publié, diffusé ou mis en vente sans votre accord. Nous n’estimons pas votre yacht à partir d’un formulaire et ne prétendons pas qu’un acheteur existe si ce n’est pas le cas.", ar: "لن يتم نشر أو تداول أو إدراج أي شيء دون تعليماتك. لن نقيّم يختك من خلال نموذج، ولن نخبرك بوجود مشترٍ ما لم يكن ذلك صحيحاً." },
  "Discuss a Private Sale": { it: "Parla di una vendita riservata", de: "Privatverkauf besprechen", fr: "Discuter d’une vente privée", ar: "ناقش البيع الخاص" },
  "Private sale exploration": { it: "Valutazione di una vendita privata", de: "Prüfung eines Privatverkaufs", fr: "Étude d’une vente privée", ar: "استكشاف البيع الخاص" },
  "Test the market before committing to a public listing.": { it: "Valuta il mercato prima di impegnarti in un annuncio pubblico.", de: "Testen Sie den Markt, bevor Sie öffentlich inserieren.", fr: "Testez le marché avant de vous engager dans une annonce publique.", ar: "اختبر السوق قبل الالتزام بإعلان عام." },
  "Confidential buyer matching": { it: "Matching riservato degli acquirenti", de: "Vertrauliches Käufer-Matching", fr: "Mise en relation confidentielle avec des acheteurs", ar: "مطابقة سرية مع المشترين" },
  "Your yacht is described to qualified buyers, not advertised.": { it: "Il tuo yacht viene presentato ad acquirenti qualificati, non pubblicizzato.", de: "Ihre Yacht wird qualifizierten Käufern vorgestellt, nicht öffentlich beworben.", fr: "Votre yacht est présenté à des acheteurs qualifiés, sans publicité publique.", ar: "يتم عرض يختك على مشترين مؤهلين دون الإعلان عنه للجمهور." },
  "No unnecessary public exposure": { it: "Nessuna esposizione pubblica superflua", de: "Keine unnötige öffentliche Präsenz", fr: "Aucune exposition publique inutile", ar: "لا داعي للتعرض العلني" },
  "No portal listing, no price history, no market memory.": { it: "Nessun annuncio sui portali, nessuna cronologia dei prezzi, nessuna traccia pubblica sul mercato.", de: "Kein Portal-Inserat, keine Preishistorie, kein öffentlicher Markteintrag.", fr: "Aucune annonce sur les portails, aucun historique de prix, aucune trace publique sur le marché.", ar: "لا إدراج على البوابات، ولا سجل للأسعار، ولا أثر علني في السوق." },
  "Private Market Intelligence": { it: "Analisi del mercato privato", de: "Einblicke in den privaten Markt", fr: "Analyses du marché privé", ar: "تحليلات السوق الخاص" },
  "How the private yacht market actually works.": { it: "Come funziona davvero il mercato privato degli yacht.", de: "Wie der private Yachtmarkt tatsächlich funktioniert.", fr: "Comment fonctionne réellement le marché privé des yachts.", ar: "كيف يعمل سوق اليخوت الخاص فعلياً." },
  "Written for buyers who want to understand the mechanics before they commit capital.": { it: "Pensato per gli acquirenti che vogliono comprendere il mercato prima di impegnare il proprio capitale.", de: "Für Käufer, die die Marktmechanismen verstehen möchten, bevor sie Kapital einsetzen.", fr: "Conçu pour les acheteurs qui souhaitent comprendre les mécanismes du marché avant d’engager des capitaux.", ar: "مخصص للمشترين الذين يرغبون في فهم آليات السوق قبل استثمار رأس المال." },
  "All intelligence": { it: "Tutti gli approfondimenti", de: "Alle Einblicke", fr: "Toutes les analyses", ar: "جميع التحليلات" },
  "Discretion by Design": { it: "Riservatezza integrata nel progetto", de: "Diskretion als Grundprinzip", fr: "La discrétion dès la conception", ar: "السرية جزء من التصميم" },
  "Confidentiality is the architecture, not a promise.": { it: "La riservatezza è parte dell’architettura, non una promessa.", de: "Vertraulichkeit ist Teil der Architektur, kein bloßes Versprechen.", fr: "La confidentialité est intégrée à l’architecture, ce n’est pas une simple promesse.", ar: "السرية جزء من بنية المنصة وليست مجرد وعد." },
  "Masking happens on the server. Withheld attributes are absent from the page source, the structured data, the sitemap and every API response — not hidden with CSS.": { it: "L’anonimizzazione avviene sul server. I dati riservati non sono presenti nel codice della pagina, nei dati strutturati, nella sitemap o nelle risposte API: non sono semplicemente nascosti con il CSS.", de: "Die Maskierung erfolgt auf dem Server. Zurückgehaltene Angaben fehlen im Quellcode, in strukturierten Daten, in der Sitemap und in API-Antworten; sie werden nicht nur per CSS verborgen.", fr: "Le masquage est effectué côté serveur. Les attributs confidentiels sont absents du code source, des données structurées, du sitemap et des réponses API ; ils ne sont pas simplement masqués par CSS.", ar: "يتم إخفاء البيانات على الخادم. لا تظهر المعلومات المحجوبة في مصدر الصفحة أو البيانات المنظمة أو خريطة الموقع أو استجابات API، ولا يتم إخفاؤها بواسطة CSS فقط." },
  "Server-side masking": { it: "Anonimizzazione lato server", de: "Serverseitige Maskierung", fr: "Masquage côté serveur", ar: "إخفاء البيانات على الخادم" },
  "Identity, shipyard, exact price and berth never enter the response. There is nothing to reveal in the page source because it was never sent.": { it: "Identità, cantiere, prezzo esatto e ormeggio non vengono mai inclusi nella risposta. Non c’è nulla da scoprire nel codice sorgente perché questi dati non vengono trasmessi.", de: "Identität, Werft, exakter Preis und Liegeplatz gelangen nie in die Antwort. Im Quellcode gibt es nichts offenzulegen, weil diese Angaben nie übertragen werden.", fr: "L’identité, le chantier, le prix exact et le poste d’amarrage ne figurent jamais dans la réponse. Rien n’est à révéler dans le code source puisque ces données ne sont jamais transmises.", ar: "لا يتم إرسال الهوية أو حوض البناء أو السعر الدقيق أو موقع الرسو ضمن الاستجابة. لا يوجد ما يمكن كشفه في مصدر الصفحة لأن هذه البيانات لم تُرسل أصلاً." },
  "Honest status labels": { it: "Etichette di stato trasparenti", de: "Ehrliche Statuskennzeichnungen", fr: "Des statuts transparents", ar: "تصنيفات حالة واضحة" },
  "No manufactured urgency": { it: "Nessuna urgenza artificiale", de: "Keine künstlich erzeugte Dringlichkeit", fr: "Aucune urgence artificielle", ar: "لا استعجال مصطنع" },
  "Qualification before disclosure": { it: "Qualifica prima della divulgazione", de: "Qualifizierung vor Offenlegung", fr: "Qualification avant divulgation", ar: "التأهيل قبل الإفصاح" },
  "Owner-controlled exposure": { it: "Esposizione controllata dal proprietario", de: "Vom Eigentümer kontrollierte Sichtbarkeit", fr: "Visibilité contrôlée par le propriétaire", ar: "تحكم المالك في مستوى الظهور" },
  "Labelled imagery": { it: "Immagini chiaramente etichettate", de: "Gekennzeichnete Bilddarstellung", fr: "Images clairement identifiées", ar: "صور تحمل توضيحاً" },
  "Featured": { it: "In evidenza", de: "Hervorgehoben", fr: "À la une", ar: "مميز" },
  "Currently under mandate.": { it: "Attualmente con mandato.", de: "Derzeit mit Verkaufsmandat.", fr: "Actuellement sous mandat.", ar: "متاح حالياً بموجب تفويض." },
  "Frequently Asked Questions": { it: "Domande frequenti", de: "Häufig gestellte Fragen", fr: "Questions fréquentes", ar: "الأسئلة الشائعة" },
  "Off-Market Yachts — Common Questions": { it: "Yacht off-market — domande frequenti", de: "Off-Market-Yachten — häufige Fragen", fr: "Yachts hors marché — questions fréquentes", ar: "اليخوت خارج السوق — أسئلة شائعة" },
  "Your next yacht may never be publicly listed.": { it: "Il tuo prossimo yacht potrebbe non essere mai pubblicato.", de: "Ihre nächste Yacht wird möglicherweise nie öffentlich angeboten.", fr: "Votre prochain yacht ne sera peut-être jamais proposé publiquement.", ar: "قد لا يُعرض يختك القادم للبيع علناً أبداً." },
  "Tell us what you are looking for. We will search the private market and come back to you with what is genuinely there.": { it: "Raccontaci cosa cerchi. Esploreremo il mercato privato e ti ricontatteremo con opportunità reali.", de: "Teilen Sie uns Ihre Wünsche mit. Wir durchsuchen den privaten Markt und melden uns mit tatsächlich verfügbaren Möglichkeiten.", fr: "Dites-nous ce que vous recherchez. Nous explorerons le marché privé et reviendrons vers vous avec des opportunités réelles.", ar: "أخبرنا عمّا تبحث عنه. سنبحث في السوق الخاص ونعود إليك بالفرص المتاحة فعلياً." },
  "Learn more": { it: "Scopri di più", de: "Mehr erfahren", fr: "En savoir plus", ar: "اعرف المزيد" },
  "Home": { it: "Home", de: "Startseite", fr: "Accueil", ar: "الرئيسية" },
  "Contact Us": { it: "Contattaci", de: "Kontakt", fr: "Nous contacter", ar: "اتصل بنا" },
  "Request Private Access": { it: "Richiedi accesso privato", de: "Privaten Zugang anfragen", fr: "Demander un accès privé", ar: "طلب الوصول الخاص" },
  "Browse the Private Market": { it: "Esplora il mercato privato", de: "Privaten Markt durchsuchen", fr: "Explorer le marché privé", ar: "تصفح السوق الخاص" },
  "Browse Market": { it: "Esplora il mercato", de: "Markt ansehen", fr: "Explorer le marché", ar: "تصفح السوق" },
  "Select language": { it: "Seleziona la lingua", de: "Sprache auswählen", fr: "Choisir la langue", ar: "اختر اللغة" },
  "Step": { it: "Passaggio", de: "Schritt", fr: "Étape", ar: "الخطوة" },
  "Select…": { it: "Seleziona…", de: "Auswählen…", fr: "Sélectionner…", ar: "اختر…" },
  "Your Role": { it: "Il tuo ruolo", de: "Ihre Rolle", fr: "Votre rôle", ar: "دورك" },
  "Brokerage": { it: "Società di intermediazione", de: "Maklerunternehmen", fr: "Agence de courtage", ar: "شركة الوساطة" },
  "Preferred Builders": { it: "Cantieri preferiti", de: "Bevorzugte Werften", fr: "Chantiers préférés", ar: "أحواض البناء المفضلة" },
  "Budget Ceiling": { it: "Budget massimo", de: "Obergrenze des Budgets", fr: "Budget maximal", ar: "الحد الأعلى للميزانية" },
  "Optional": { it: "Facoltativo", de: "Optional", fr: "Facultatif", ar: "اختياري" },
  "Please enter your full name.": { it: "Inserisci il tuo nome completo.", de: "Bitte geben Sie Ihren vollständigen Namen ein.", fr: "Veuillez saisir votre nom complet.", ar: "يرجى إدخال اسمك الكامل." },
  "Please enter a valid email address.": { it: "Inserisci un indirizzo email valido.", de: "Bitte geben Sie eine gültige E-Mail-Adresse ein.", fr: "Veuillez saisir une adresse e-mail valide.", ar: "يرجى إدخال عنوان بريد إلكتروني صالح." },
  "Please enter a contact number.": { it: "Inserisci un numero di telefono.", de: "Bitte geben Sie eine Telefonnummer ein.", fr: "Veuillez saisir un numéro de téléphone.", ar: "يرجى إدخال رقم هاتف للتواصل." },
  "Request received": { it: "Richiesta ricevuta", de: "Anfrage erhalten", fr: "Demande reçue", ar: "تم استلام الطلب" },
  "Start a Private Search": { it: "Avvia una ricerca privata", de: "Private Suche starten", fr: "Lancer une recherche privée", ar: "ابدأ بحثاً خاصاً" },
  "Search private yacht opportunities": { it: "Cerca opportunità private per yacht", de: "Private Yachtangebote suchen", fr: "Rechercher des opportunités privées de yachts", ar: "ابحث عن فرص اليخوت الخاصة" },
  "Search private yacht opportunities...": { it: "Cerca opportunità private per yacht...", de: "Private Yachtangebote suchen...", fr: "Rechercher des opportunités privées de yachts...", ar: "ابحث عن فرص اليخوت الخاصة..." },
  "Price": { it: "Prezzo", de: "Preis", fr: "Prix", ar: "السعر" },
  "Length": { it: "Lunghezza", de: "Länge", fr: "Longueur", ar: "الطول" },
  "Location": { it: "Località", de: "Standort", fr: "Lieu", ar: "الموقع" },
  "Type": { it: "Tipologia", de: "Typ", fr: "Type", ar: "النوع" },
  "Build Region": { it: "Regione di costruzione", de: "Bauregion", fr: "Région de construction", ar: "منطقة البناء" },
  "Availability": { it: "Disponibilità", de: "Verfügbarkeit", fr: "Disponibilité", ar: "التوفر" },
  "Clear filters": { it: "Azzera filtri", de: "Filter zurücksetzen", fr: "Effacer les filtres", ar: "مسح عوامل التصفية" },
  "No opportunities currently match this view. Tell us what you are looking for and we will search the private market directly.": { it: "Nessuna opportunità corrisponde attualmente a questa selezione. Raccontaci cosa cerchi e avvieremo una ricerca diretta nel mercato privato.", de: "Derzeit passen keine Angebote zu dieser Auswahl. Teilen Sie uns Ihre Wünsche mit und wir suchen direkt im privaten Markt.", fr: "Aucune opportunité ne correspond actuellement à cette sélection. Dites-nous ce que vous recherchez et nous lancerons une recherche directe sur le marché privé.", ar: "لا توجد فرص تطابق هذا العرض حالياً. أخبرنا عمّا تبحث عنه وسنبحث مباشرة في السوق الخاص." },
  "No results match these filters. Try widening the price, length or location.": { it: "Nessun risultato corrisponde a questi filtri. Prova ad ampliare prezzo, lunghezza o località.", de: "Keine Ergebnisse entsprechen diesen Filtern. Erweitern Sie Preis-, Längen- oder Standortbereich.", fr: "Aucun résultat ne correspond à ces filtres. Élargissez la fourchette de prix, la longueur ou la zone.", ar: "لا توجد نتائج تطابق عوامل التصفية. جرّب توسيع نطاق السعر أو الطول أو الموقع." },
  "Potential Opportunity": { it: "Opportunità potenziale", de: "Potenzielle Gelegenheit", fr: "Opportunité potentielle", ar: "فرصة محتملة" },
  "PRIVATE LISTING": { it: "INCARICO PRIVATO", de: "PRIVATES INSERAT", fr: "ANNONCE PRIVÉE", ar: "عرض خاص" },
  "VERIFIED OFF-MARKET": { it: "OFF-MARKET VERIFICATO", de: "VERIFIZIERTES OFF-MARKET", fr: "HORS MARCHÉ VÉRIFIÉ", ar: "خارج السوق موثّق" },
  "POTENTIAL OPPORTUNITY": { it: "OPPORTUNITÀ POTENZIALE", de: "POTENZIELLE GELEGENHEIT", fr: "OPPORTUNITÉ POTENTIELLE", ar: "فرصة محتملة" },
  "BROKER-SOURCED": { it: "SEGNALATO DA BROKER", de: "VOM MAKLERNETZWERK", fr: "PROPOSÉ PAR UN COURTIER", ar: "مقدم من وسيط" },
  "Off-Market": { it: "Off-market", de: "Off-Market", fr: "Hors marché", ar: "خارج السوق" },
  "Private Sale": { it: "Vendita privata", de: "Privatverkauf", fr: "Vente privée", ar: "بيع خاص" },
  "Under $5M": { it: "Meno di 5 M$", de: "Unter 5 Mio. $", fr: "Moins de 5 M$", ar: "أقل من 5 ملايين دولار" },
  "$5M–$10M": { it: "5–10 M$", de: "5–10 Mio. $", fr: "5–10 M$", ar: "5–10 ملايين دولار" },
  "$10M–$25M": { it: "10–25 M$", de: "10–25 Mio. $", fr: "10–25 M$", ar: "10–25 مليون دولار" },
  "$25M+": { it: "Oltre 25 M$", de: "Über 25 Mio. $", fr: "Plus de 25 M$", ar: "أكثر من 25 مليون دولار" },
  "Motor Yacht": { it: "Yacht a motore", de: "Motoryacht", fr: "Yacht à moteur", ar: "يخت بمحرك" },
  "Explorer Yacht": { it: "Yacht explorer", de: "Explorer-Yacht", fr: "Yacht d’exploration", ar: "يخت استكشاف" },
  "Sailing Yacht": { it: "Yacht a vela", de: "Segelyacht", fr: "Voilier", ar: "يخت شراعي" },
  "Sport Yacht": { it: "Yacht sportivo", de: "Sportyacht", fr: "Yacht sportif", ar: "يخت رياضي" },
  "Catamaran": { it: "Catamarano", de: "Katamaran", fr: "Catamaran", ar: "قارب كاتاماران" },
  "Trimaran": { it: "Trimarano", de: "Trimaran", fr: "Trimaran", ar: "قارب ثلاثي البدن" },
  "Italian Build": { it: "Costruzione italiana", de: "Italienischer Bau", fr: "Construction italienne", ar: "صناعة إيطالية" },
  "European Build": { it: "Costruzione europea", de: "Europäischer Bau", fr: "Construction européenne", ar: "صناعة أوروبية" },
  "North American Build": { it: "Costruzione nordamericana", de: "Nordamerikanischer Bau", fr: "Construction nord-américaine", ar: "صناعة أمريكية شمالية" },
  "British Build": { it: "Costruzione britannica", de: "Britischer Bau", fr: "Construction britannique", ar: "صناعة بريطانية" },
  "Dutch Build": { it: "Costruzione olandese", de: "Niederländischer Bau", fr: "Construction néerlandaise", ar: "صناعة هولندية" },
  "German Build": { it: "Costruzione tedesca", de: "Deutscher Bau", fr: "Construction allemande", ar: "صناعة ألمانية" },
  "Asian Build": { it: "Costruzione asiatica", de: "Asiatischer Bau", fr: "Construction asiatique", ar: "صناعة آسيوية" },
  "Mediterranean Build": { it: "Costruzione mediterranea", de: "Mediterraner Bau", fr: "Construction méditerranéenne", ar: "صناعة متوسطية" },
  "Northern European Build": { it: "Costruzione nord-europea", de: "Nordeuropäischer Bau", fr: "Construction nord-européenne", ar: "صناعة شمال أوروبا" },
  "Seller position confirmed": { it: "Posizione del venditore confermata", de: "Verkäuferposition bestätigt", fr: "Position du vendeur confirmée", ar: "تم تأكيد موقف البائع" },
  "Estimated asking range": { it: "Fascia di prezzo indicativa", de: "Geschätzte Angebotsspanne", fr: "Fourchette de prix indicative", ar: "نطاق السعر التقديري" },
  "Guests": { it: "Ospiti", de: "Gäste", fr: "Invités", ar: "الضيوف" },
  "Cabins": { it: "Cabine", de: "Kabinen", fr: "Cabines", ar: "الكبائن" },
  "Crew": { it: "Equipaggio", de: "Crew", fr: "Équipage", ar: "الطاقم" },
  "Hull": { it: "Scafo", de: "Rumpf", fr: "Coque", ar: "الهيكل" },
  "Availability not confirmed. Our acquisition team can investigate privately on behalf of qualified buyers.": {
    it: "La disponibilità non è confermata. Il nostro team acquisizioni può svolgere verifiche riservate per conto di acquirenti qualificati.",
    de: "Die Verfügbarkeit ist nicht bestätigt. Unser Akquisitionsteam kann im Auftrag qualifizierter Käufer vertrauliche Nachforschungen anstellen.",
    fr: "La disponibilité n’est pas confirmée. Notre équipe d’acquisition peut effectuer des vérifications confidentielles pour des acheteurs qualifiés.",
    ar: "لم يتم تأكيد التوفر. يمكن لفريق الاستحواذ لدينا إجراء بحث سري نيابةً عن المشترين المؤهلين.",
  },
  "Investigate Privately →": { it: "Verifica in privato →", de: "Vertraulich prüfen →", fr: "Vérifier en privé →", ar: "استفسر بسرية ←" },
  "Request Details →": { it: "Richiedi dettagli →", de: "Details anfragen →", fr: "Demander les détails →", ar: "اطلب التفاصيل ←" },
  "Profile study": { it: "Immagine illustrativa", de: "Profilstudie", fr: "Étude de profil", ar: "تصور توضيحي" },
  "Confidential Details": { it: "Dettagli riservati", de: "Vertrauliche Details", fr: "Détails confidentiels", ar: "تفاصيل سرية" },
  "The owner has authorised a limited public description only. The attributes below are held server-side and released to qualified buyers under appropriate terms.": {
    it: "Il proprietario ha autorizzato soltanto una descrizione pubblica limitata. I dati seguenti sono conservati sul server e comunicati agli acquirenti qualificati secondo condizioni appropriate.",
    de: "Der Eigentümer hat nur eine begrenzte öffentliche Beschreibung genehmigt. Die folgenden Angaben bleiben serverseitig geschützt und werden qualifizierten Käufern unter angemessenen Bedingungen offengelegt.",
    fr: "Le propriétaire n’a autorisé qu’une description publique limitée. Les informations ci-dessous sont conservées côté serveur et communiquées aux acheteurs qualifiés selon des conditions appropriées.",
    ar: "سمح المالك بوصف عام محدود فقط. تُحفظ البيانات التالية على الخادم ولا تُكشف للمشترين المؤهلين إلا وفق الشروط المناسبة.",
  },
  "Breadcrumb": { it: "Percorso di navigazione", de: "Brotkrumennavigation", fr: "Fil d’Ariane", ar: "مسار التنقل" },
  "Primary navigation": { it: "Navigazione principale", de: "Hauptnavigation", fr: "Navigation principale", ar: "التنقل الرئيسي" },
  "Mobile navigation": { it: "Navigazione mobile", de: "Mobile Navigation", fr: "Navigation mobile", ar: "التنقل على الهاتف" },
  "Toggle navigation menu": { it: "Apri o chiudi il menu", de: "Navigationsmenü öffnen oder schließen", fr: "Ouvrir ou fermer le menu", ar: "فتح أو إغلاق قائمة التنقل" },
  "Switch to light theme": { it: "Passa al tema chiaro", de: "Zum hellen Design wechseln", fr: "Passer au thème clair", ar: "التبديل إلى المظهر الفاتح" },
  "Switch to dark theme": { it: "Passa al tema scuro", de: "Zum dunklen Design wechseln", fr: "Passer au thème sombre", ar: "التبديل إلى المظهر الداكن" },
  "Dark theme": { it: "Tema scuro", de: "Dunkles Design", fr: "Thème sombre", ar: "المظهر الداكن" },
  "Light theme": { it: "Tema chiaro", de: "Helles Design", fr: "Thème clair", ar: "المظهر الفاتح" },
  "By Type & Builder": { it: "Per tipologia e cantiere", de: "Nach Typ und Werft", fr: "Par type et chantier", ar: "حسب النوع وحوض البناء" },
  "International Inventory": { it: "Inventario internazionale", de: "Internationales Angebot", fr: "Inventaire international", ar: "المخزون الدولي" },
  "Important:": { it: "Importante:", de: "Wichtig:", fr: "Important :", ar: "هام:" },
  "Confidential and privately available yacht opportunities, sourced through an international network of owners, captains and cooperating brokers. Access is by private inquiry.": {
    it: "Opportunità di yacht riservate e disponibili privatamente, individuate attraverso una rete internazionale di proprietari, comandanti e broker partner. L’accesso avviene tramite richiesta privata.",
    de: "Vertrauliche und privat verfügbare Yachtangebote aus einem internationalen Netzwerk von Eigentümern, Kapitänen und kooperierenden Maklern. Zugang nur auf private Anfrage.",
    fr: "Des opportunités de yachts confidentielles et disponibles en privé, identifiées grâce à un réseau international de propriétaires, capitaines et courtiers partenaires. Accès sur demande privée.",
    ar: "فرص يخوت سرية ومتاحة بشكل خاص، يتم الحصول عليها عبر شبكة دولية من المالكين والقباطنة والوسطاء المتعاونين. الوصول من خلال طلب خاص.",
  },
  "Confidential · Masked until qualification": { it: "Riservato · Anonimizzato fino alla qualifica", de: "Vertraulich · Bis zur Qualifizierung anonymisiert", fr: "Confidentiel · Masqué jusqu’à qualification", ar: "سري · البيانات مخفية حتى التأهيل" },
  "opportunity": { it: "opportunità", de: "Angebot", fr: "opportunité", ar: "فرصة" },
  "opportunities": { it: "opportunità", de: "Angebote", fr: "opportunités", ar: "فرص" },
  " matching": { it: " corrispondenti", de: " passend", fr: " correspondantes", ar: " مطابقة" },
  " published": { it: " pubblicate", de: " veröffentlicht", fr: " publiées", ar: " منشورة" },
  "Any": { it: "Qualsiasi", de: "Alle", fr: "Tous", ar: "الكل" },
  "Clear": { it: "Cancella", de: "Zurücksetzen", fr: "Effacer", ar: "مسح" },
  "Profile study of a motor yacht": { it: "Immagine illustrativa di uno yacht a motore", de: "Profilstudie einer Motoryacht", fr: "Étude de profil d’un yacht à moteur", ar: "تصور توضيحي ليخت بمحرك" },
  "Profile study of a superyacht": { it: "Immagine illustrativa di un superyacht", de: "Profilstudie einer Superyacht", fr: "Étude de profil d’un superyacht", ar: "تصور توضيحي ليخت فاخر" },
  "Profile study of an explorer yacht": { it: "Immagine illustrativa di uno yacht explorer", de: "Profilstudie einer Explorer-Yacht", fr: "Étude de profil d’un yacht d’exploration", ar: "تصور توضيحي ليخت استكشاف" },
  "Profile study of a sailing yacht": { it: "Immagine illustrativa di uno yacht a vela", de: "Profilstudie einer Segelyacht", fr: "Étude de profil d’un voilier", ar: "تصور توضيحي ليخت شراعي" },
  "Illustrative": { it: "Illustrativo", de: "Illustrativ", fr: "Illustratif", ar: "توضيحي" },
  "not the vessel": { it: "non rappresenta l’imbarcazione", de: "nicht die tatsächliche Yacht", fr: "ne représente pas le yacht", ar: "لا تمثل اليخت الفعلي" },
  "matching": { it: "corrispondenti", de: "passend", fr: "correspondantes", ar: "مطابقة" },
  "published": { it: "pubblicate", de: "veröffentlicht", fr: "publiées", ar: "منشورة" },
  "Florida": { it: "Florida", de: "Florida", fr: "Floride", ar: "فلوريدا" },
  "Bahamas": { it: "Bahamas", de: "Bahamas", fr: "Bahamas", ar: "جزر البهاما" },
  "Mediterranean": { it: "Mediterraneo", de: "Mittelmeer", fr: "Méditerranée", ar: "البحر الأبيض المتوسط" },
  "Explorer": { it: "Explorer", de: "Explorer", fr: "Exploration", ar: "استكشاف" },
  "100+ ft": { it: "Oltre 100 ft", de: "Über 100 ft", fr: "Plus de 100 ft", ar: "أكثر من 100 قدم" },
  "150+ ft": { it: "Oltre 150 ft", de: "Über 150 ft", fr: "Plus de 150 ft", ar: "أكثر من 150 قدم" },
  "All rights reserved.": { it: "Tutti i diritti riservati.", de: "Alle Rechte vorbehalten.", fr: "Tous droits réservés.", ar: "جميع الحقوق محفوظة." },
  "is a private acquisition and lead-generation platform. Opportunities are presented in masked form to protect owner confidentiality; identity, exact pricing and location are disclosed only to qualified buyers under appropriate terms. An entry marked": {
    it: "è una piattaforma privata di acquisizione e generazione di contatti. Le opportunità sono presentate in forma anonimizzata per proteggere la riservatezza del proprietario; identità, prezzo esatto e posizione vengono comunicati solo ad acquirenti qualificati secondo condizioni appropriate. Una scheda contrassegnata come",
    de: "ist eine private Plattform für Akquisition und Leadgenerierung. Angebote werden zum Schutz der Vertraulichkeit der Eigentümer anonymisiert dargestellt; Identität, genauer Preis und Standort werden nur qualifizierten Käufern unter angemessenen Bedingungen offengelegt. Ein Eintrag mit der Kennzeichnung",
    fr: "est une plateforme privée d’acquisition et de génération de prospects. Les opportunités sont présentées sous forme masquée afin de protéger la confidentialité du propriétaire ; l’identité, le prix exact et l’emplacement ne sont communiqués qu’aux acheteurs qualifiés, selon des conditions appropriées. Une fiche portant la mention",
    ar: "هي منصة خاصة للاستحواذ وتوليد العملاء المحتملين. تُعرض الفرص ببيانات مخفية لحماية سرية المالك؛ ولا يتم الكشف عن الهوية أو السعر الدقيق أو الموقع إلا للمشترين المؤهلين وفق الشروط المناسبة. ويعني إدراج يحمل علامة",
  },
  "means availability has not been confirmed and no seller mandate exists. Nothing on this site is an offer, a valuation, or a representation that a particular vessel is for sale.": {
    it: "che la disponibilità non è stata confermata e che non esiste un mandato del venditore. Nulla su questo sito costituisce un’offerta, una valutazione o una dichiarazione che una specifica imbarcazione sia in vendita.",
    de: "dass die Verfügbarkeit nicht bestätigt wurde und kein Verkaufsmandat besteht. Nichts auf dieser Website ist ein Angebot, eine Bewertung oder eine Zusicherung, dass ein bestimmtes Schiff zum Verkauf steht.",
    fr: "signifie que la disponibilité n’a pas été confirmée et qu’aucun mandat de vente n’existe. Rien sur ce site ne constitue une offre, une estimation ou une déclaration selon laquelle un navire particulier est à vendre.",
    ar: "تعني أن التوفر لم يتم تأكيده وأنه لا يوجد تفويض من البائع. لا يشكل أي محتوى على هذا الموقع عرضاً أو تقييماً أو تأكيداً بأن سفينة معينة معروضة للبيع.",
  },
  "of": { it: "di", de: "von", fr: "sur", ar: "من" },
  "Sending…": { it: "Invio…", de: "Wird gesendet…", fr: "Envoi…", ar: "جارٍ الإرسال…" },
  "Back": { it: "Indietro", de: "Zurück", fr: "Retour", ar: "رجوع" },
  "Direct": { it: "Contatto diretto", de: "Direktkontakt", fr: "Contact direct", ar: "تواصل مباشر" },
  "Email": { it: "Email", de: "E-Mail", fr: "E-mail", ar: "البريد الإلكتروني" },
  "Telephone": { it: "Telefono", de: "Telefon", fr: "Téléphone", ar: "الهاتف" },
  "Message": { it: "Messaggio", de: "Nachricht", fr: "Message", ar: "الرسالة" },
  "Send a message": { it: "Invia un messaggio", de: "Nachricht senden", fr: "Envoyer un message", ar: "أرسل رسالة" },
  "Send Message": { it: "Invia messaggio", de: "Nachricht senden", fr: "Envoyer le message", ar: "إرسال الرسالة" },
  "Website": { it: "Sito web", de: "Website", fr: "Site web", ar: "الموقع الإلكتروني" },
  "Full Name": { it: "Nome completo", de: "Vollständiger Name", fr: "Nom complet", ar: "الاسم الكامل" },
  "Phone": { it: "Telefono", de: "Telefon", fr: "Téléphone", ar: "الهاتف" },
  "Private Sale Enquiry": { it: "Richiesta di vendita privata", de: "Anfrage zum Privatverkauf", fr: "Demande de vente privée", ar: "استفسار عن البيع الخاص" },
  "Tell us about the yacht.": { it: "Raccontaci dello yacht.", de: "Erzählen Sie uns von der Yacht.", fr: "Parlez-nous du yacht.", ar: "أخبرنا عن اليخت." },
  "How should we reach you?": { it: "Come preferisci essere contattato?", de: "Wie sollen wir Sie erreichen?", fr: "Comment pouvons-nous vous joindre ?", ar: "كيف نصل إليك؟" },
  "Share a Yacht Privately": { it: "Condividi uno yacht in privato", de: "Eine Yacht vertraulich anbieten", fr: "Proposer un yacht en privé", ar: "اعرض يختاً بسرية" },
  "Client Requirement": { it: "Richiesta cliente", de: "Kundenanforderung", fr: "Recherche client", ar: "متطلبات العميل" },
  "Submit a client requirement.": { it: "Invia una richiesta per conto di un cliente.", de: "Übermitteln Sie eine Kundenanforderung.", fr: "Soumettez une demande pour un client.", ar: "أرسل متطلبات عميل." },
  "Your client is not named and not contacted. We match the brief privately and reply to you.": { it: "Il tuo cliente non viene nominato né contattato. Abbiniamo la richiesta in privato e rispondiamo a te.", de: "Ihr Kunde wird weder genannt noch kontaktiert. Wir gleichen das Suchprofil vertraulich ab und antworten Ihnen.", fr: "Votre client n’est ni nommé ni contacté. Nous traitons le besoin en privé et vous répondons directement.", ar: "لن يتم ذكر اسم عميلك أو التواصل معه. نطابق الطلب بسرية ونرد عليك." },
  "You and your brokerage": { it: "Tu e la tua società", de: "Sie und Ihr Maklerunternehmen", fr: "Vous et votre agence", ar: "أنت وشركة الوساطة" },
  "The requirement": { it: "La richiesta", de: "Die Anforderung", fr: "Le besoin", ar: "المتطلبات" },
  "The vessel": { it: "L’imbarcazione", de: "Die Yacht", fr: "Le navire", ar: "اليخت" },
  "Permissions you are requesting": { it: "Autorizzazioni richieste", de: "Angefragte Berechtigungen", fr: "Autorisations demandées", ar: "الأذونات المطلوبة" },
  "Submit Privately": { it: "Invia in privato", de: "Vertraulich übermitteln", fr: "Envoyer en privé", ar: "إرسال بسرية" },
  "Submit Requirement": { it: "Invia la richiesta", de: "Anforderung übermitteln", fr: "Soumettre la demande", ar: "إرسال المتطلبات" },
  "Where should we send matching opportunities?": { it: "Dove dobbiamo inviarti le opportunità corrispondenti?", de: "Wohin sollen wir passende Angebote senden?", fr: "Où devons-nous envoyer les opportunités correspondantes ?", ar: "إلى أين نرسل الفرص المطابقة؟" },
  "What are you looking for?": { it: "Cosa stai cercando?", de: "Wonach suchen Sie?", fr: "Que recherchez-vous ?", ar: "عمّا تبحث؟" },
  "Investigate {reference}": { it: "Verifica {reference}", de: "{reference} prüfen", fr: "Examiner {reference}", ar: "استفسر عن {reference}" },
  "Access {reference}": { it: "Accedi a {reference}", de: "Zugang zu {reference}", fr: "Accéder à {reference}", ar: "الوصول إلى {reference}" },
  "Your request against {reference} has been received.": { it: "La tua richiesta per {reference} è stata ricevuta.", de: "Ihre Anfrage zu {reference} ist eingegangen.", fr: "Votre demande concernant {reference} a bien été reçue.", ar: "تم استلام طلبك بخصوص {reference}." },
  "Private Investigation Request": { it: "Richiesta di verifica privata", de: "Anfrage zur vertraulichen Prüfung", fr: "Demande d’enquête privée", ar: "طلب تحقق خاص" },
  "Request Confidential Details": { it: "Richiedi dettagli riservati", de: "Vertrauliche Details anfragen", fr: "Demander des détails confidentiels", ar: "طلب تفاصيل سرية" },
  "OFF-MARKET": { it: "OFF-MARKET", de: "OFF-MARKET", fr: "HORS MARCHÉ", ar: "خارج السوق" },
  "PRIVATE SALE": { it: "VENDITA PRIVATA", de: "PRIVATVERKAUF", fr: "VENTE PRIVÉE", ar: "بيع خاص" },
  "POTENTIAL": { it: "POTENZIALE", de: "POTENZIELL", fr: "POTENTIEL", ar: "محتمل" },
  "Refit": { it: "Refit", de: "Überholung", fr: "Rénovation", ar: "تجديد" },
  "Representative profiles": { it: "Profili rappresentativi", de: "Beispielprofile", fr: "Profils représentatifs", ar: "نماذج توضيحية" },
  "These profiles illustrate the types of private opportunity we handle. They are not offers, and no vessel shown is represented as available; current opportunities are confirmed privately with qualified buyers.": {
    it: "Questi profili illustrano i tipi di opportunità riservate che gestiamo. Non sono offerte e nessuna imbarcazione mostrata è dichiarata disponibile; le opportunità attuali vengono confermate privatamente con acquirenti qualificati.",
    de: "Diese Profile veranschaulichen die Arten vertraulicher Angebote, die wir bearbeiten. Sie sind keine Angebote, und für keine gezeigte Yacht wird Verfügbarkeit zugesichert; aktuelle Möglichkeiten werden vertraulich mit qualifizierten Käufern bestätigt.",
    fr: "Ces profils illustrent les types d’opportunités privées que nous traitons. Ils ne constituent pas des offres et aucun navire présenté n’est déclaré disponible ; les opportunités actuelles sont confirmées en privé avec des acheteurs qualifiés.",
    ar: "توضح هذه النماذج أنواع الفرص الخاصة التي نتعامل معها. وهي ليست عروضاً، ولا يُذكر أن أي يخت معروض متاح للبيع؛ ويتم تأكيد الفرص الحالية بشكل خاص مع المشترين المؤهلين.",
  },

  "Confidential. Used to qualify your request and contact you directly — never published, never sold on.": {
    it: "Riservato. Utilizzato per qualificare la richiesta e contattarti direttamente: mai pubblicato né ceduto.",
    de: "Vertraulich. Zur Qualifizierung Ihrer Anfrage und zur direkten Kontaktaufnahme; wird niemals veröffentlicht oder weiterverkauft.",
    fr: "Confidentiel. Utilisé pour qualifier votre demande et vous contacter directement ; jamais publié ni revendu.",
    ar: "سري. يُستخدم لتأهيل طلبك والتواصل معك مباشرة، ولا يتم نشره أو بيعه مطلقاً.",
  },
  "All inquiries handled confidentially. Submitting this form does not release confidential listing information automatically.": {
    it: "Tutte le richieste sono gestite in modo riservato. L’invio del modulo non comporta la divulgazione automatica delle informazioni riservate dell’annuncio.",
    de: "Alle Anfragen werden vertraulich behandelt. Das Absenden dieses Formulars gibt keine vertraulichen Angebotsinformationen automatisch frei.",
    fr: "Toutes les demandes sont traitées de manière confidentielle. L’envoi de ce formulaire ne divulgue pas automatiquement les informations confidentielles d’une annonce.",
    ar: "تتم معالجة جميع الاستفسارات بسرية. لا يؤدي إرسال هذا النموذج إلى الكشف تلقائياً عن معلومات العرض السرية.",
  },
  "Confidential. No obligation. We will tell you what we find, including when the answer is that nothing suitable is currently available.": {
    it: "Riservato e senza impegno. Ti diremo cosa troviamo, anche se al momento non è disponibile nulla di adatto.",
    de: "Vertraulich und unverbindlich. Wir teilen Ihnen unsere Ergebnisse mit, auch wenn derzeit nichts Passendes verfügbar ist.",
    fr: "Confidentiel et sans engagement. Nous vous dirons ce que nous trouvons, même si aucune option adaptée n’est actuellement disponible.",
    ar: "سري ودون التزام. سنخبرك بما نعثر عليه، حتى إن لم تتوفر حالياً فرصة مناسبة.",
  },
  "Nothing is published, circulated or listed as a result of this form. It starts a private conversation about whether there is buyer demand worth exploring. Matching your yacht to buyers, any masked entry and any disclosure of its identity each need your separate authorisation later.": {
    it: "Questo modulo non comporta alcuna pubblicazione, diffusione o inserzione. Avvia una conversazione riservata per valutare se esiste una domanda di acquirenti da esplorare. L’abbinamento dello yacht agli acquirenti, ogni scheda anonimizzata e qualsiasi divulgazione dell’identità richiedono una tua autorizzazione separata.",
    de: "Dieses Formular führt zu keiner Veröffentlichung, Weitergabe oder Inserierung. Es eröffnet ein vertrauliches Gespräch darüber, ob eine relevante Käufernachfrage besteht. Ein Käufer-Matching, ein anonymisierter Eintrag und jede Offenlegung der Identität erfordern später jeweils Ihre gesonderte Zustimmung.",
    fr: "Ce formulaire n’entraîne aucune publication, diffusion ou mise en vente. Il ouvre une conversation privée pour déterminer s’il existe une demande d’acheteurs à explorer. La mise en relation, toute fiche masquée et toute divulgation de l’identité nécessiteront ensuite votre autorisation distincte.",
    ar: "لا ينتج عن هذا النموذج أي نشر أو تداول أو إدراج. بل يبدأ محادثة خاصة لتقييم وجود طلب من المشترين يستحق الاستكشاف. ويتطلب ربط يختك بالمشترين وأي إدراج مخفي وأي كشف عن هويته موافقتك المنفصلة لاحقاً.",
  },
  "Nothing is published, matched or shared as a result of this form. It opens a private record that we verify before any use is agreed in writing.": {
    it: "Questo modulo non comporta pubblicazione, abbinamento o condivisione. Apre una scheda privata che verifichiamo prima di concordare per iscritto qualsiasi utilizzo.",
    de: "Dieses Formular führt zu keiner Veröffentlichung, Zuordnung oder Weitergabe. Es eröffnet einen vertraulichen Datensatz, den wir prüfen, bevor eine Nutzung schriftlich vereinbart wird.",
    fr: "Ce formulaire n’entraîne aucune publication, mise en relation ou diffusion. Il ouvre un dossier privé que nous vérifions avant tout accord écrit sur son utilisation.",
    ar: "لا ينتج عن هذا النموذج أي نشر أو مطابقة أو مشاركة. بل ينشئ سجلاً خاصاً نتحقق منه قبل الاتفاق كتابياً على أي استخدام.",
  },

  "CONFIDENTIAL": { it: "RISERVATO", de: "VERTRAULICH", fr: "CONFIDENTIEL", ar: "سري" },
  "NEW OPPORTUNITY": { it: "NUOVA OPPORTUNITÀ", de: "NEUES ANGEBOT", fr: "NOUVELLE OPPORTUNITÉ", ar: "فرصة جديدة" },
  "PRICE OPPORTUNITY": { it: "OPPORTUNITÀ DI PREZZO", de: "PREISCHANCE", fr: "OPPORTUNITÉ DE PRIX", ar: "فرصة سعرية" },
  "FLORIDA": { it: "FLORIDA", de: "FLORIDA", fr: "FLORIDE", ar: "فلوريدا" },
  "BAHAMAS": { it: "BAHAMAS", de: "BAHAMAS", fr: "BAHAMAS", ar: "جزر البهاما" },
  "CARIBBEAN": { it: "CARAIBI", de: "KARIBIK", fr: "CARAÏBES", ar: "الكاريبي" },
  "MEDITERRANEAN": { it: "MEDITERRANEO", de: "MITTELMEER", fr: "MÉDITERRANÉE", ar: "البحر الأبيض المتوسط" },
  "EXPLORER": { it: "EXPLORER", de: "EXPLORER", fr: "EXPLORATION", ar: "استكشاف" },
  "SUPERYACHT": { it: "SUPERYACHT", de: "SUPERYACHT", fr: "SUPERYACHT", ar: "يخت فاخر" },
  "MOTOR YACHT": { it: "YACHT A MOTORE", de: "MOTORYACHT", fr: "YACHT À MOTEUR", ar: "يخت بمحرك" },
  "SAILING": { it: "A VELA", de: "SEGEL", fr: "À VOILE", ar: "شراعي" },
  "Antalya Freezone, TR": { it: "Zona Franca di Antalya, TR", de: "Freihandelszone Antalya, TR", fr: "Zone franche d’Antalya, TR", ar: "المنطقة الحرة في أنطاليا، تركيا" },
  "Mediterranean & Beyond": { it: "Mediterraneo e oltre", de: "Mittelmeer und darüber hinaus", fr: "Méditerranée et au-delà", ar: "البحر المتوسط وما وراءه" },
  "Superyacht & Luxury Segment": { it: "Superyacht e segmento lusso", de: "Superyacht- und Luxussegment", fr: "Segment des superyachts et du luxe", ar: "اليخوت الفاخرة والقطاع الفاخر" },
  "Florida / Bahamas": { it: "Florida / Bahamas", de: "Florida / Bahamas", fr: "Floride / Bahamas", ar: "فلوريدا / جزر البهاما" },
  "Florida / Caribbean": { it: "Florida / Caraibi", de: "Florida / Karibik", fr: "Floride / Caraïbes", ar: "فلوريدا / الكاريبي" },
  "Added today": { it: "Aggiunto oggi", de: "Heute hinzugefügt", fr: "Ajouté aujourd’hui", ar: "أُضيف اليوم" },
  "Added yesterday": { it: "Aggiunto ieri", de: "Gestern hinzugefügt", fr: "Ajouté hier", ar: "أُضيف أمس" },
  "Added {days} days ago": { it: "Aggiunto {days} giorni fa", de: "Vor {days} Tagen hinzugefügt", fr: "Ajouté il y a {days} jours", ar: "أُضيف قبل {days} أيام" },
  "Long-Range": { it: "A lungo raggio", de: "Langstrecken", fr: "Long-courrier", ar: "بعيد المدى" },
  "Flybridge": { it: "Flybridge", de: "Flybridge", fr: "Flybridge", ar: "فلاي بريدج" },
  "Pilothouse": { it: "Timoneria", de: "Steuerhaus", fr: "Timonerie", ar: "قمرة القيادة" },
  "Mega Yacht": { it: "Mega yacht", de: "Megayacht", fr: "Mégayacht", ar: "يخت ضخم" },
  "Added last week": { it: "Aggiunto la scorsa settimana", de: "Letzte Woche hinzugefügt", fr: "Ajouté la semaine dernière", ar: "أُضيف الأسبوع الماضي" },
  "Added {weeks} weeks ago": { it: "Aggiunto {weeks} settimane fa", de: "Vor {weeks} Wochen hinzugefügt", fr: "Ajouté il y a {weeks} semaines", ar: "أُضيف قبل {weeks} أسابيع" },
  "Added {months} months ago": { it: "Aggiunto {months} mesi fa", de: "Vor {months} Monaten hinzugefügt", fr: "Ajouté il y a {months} mois", ar: "أُضيف قبل {months} أشهر" },
  "VAT-exempt zone for international vessel work": {
    it: "Zona esente IVA per le attività internazionali sulle imbarcazioni",
    de: "Mehrwertsteuerfreie Zone für internationale Arbeiten an Schiffen",
    fr: "Zone exonérée de TVA pour les travaux maritimes internationaux",
    ar: "منطقة معفاة من ضريبة القيمة المضافة لأعمال السفن الدولية",
  },
  "Access to 20+ vetted specialist shipyards": {
    it: "Accesso a oltre 20 cantieri navali specializzati e verificati",
    de: "Zugang zu über 20 geprüften Spezialwerften",
    fr: "Accès à plus de 20 chantiers navals spécialisés et sélectionnés",
    ar: "إمكانية الوصول إلى أكثر من 20 حوضاً متخصصاً تم التحقق منه",
  },
  "Skilled workforce at competitive rates": {
    it: "Manodopera qualificata a tariffe competitive",
    de: "Qualifizierte Fachkräfte zu wettbewerbsfähigen Preisen",
    fr: "Main-d’œuvre qualifiée à des tarifs compétitifs",
    ar: "قوى عاملة ماهرة بأسعار تنافسية",
  },
  "Year-round Mediterranean climate": {
    it: "Clima mediterraneo tutto l’anno",
    de: "Ganzjähriges Mittelmeerklima",
    fr: "Climat méditerranéen toute l’année",
    ar: "مناخ متوسطي على مدار العام",
  },
  "Direct IALA maritime route access": {
    it: "Accesso diretto alle rotte marittime IALA",
    de: "Direkter Zugang zu IALA-Schifffahrtsrouten",
    fr: "Accès direct aux routes maritimes IALA",
    ar: "وصول مباشر إلى المسارات البحرية التابعة لـ IALA",
  },
  "Caribbean": { it: "Caraibi", de: "Karibik", fr: "Caraïbes", ar: "الكاريبي" },
  "Northern Europe": { it: "Europa settentrionale", de: "Nordeuropa", fr: "Europe du Nord", ar: "شمال أوروبا" },
  "Middle East": { it: "Medio Oriente", de: "Naher Osten", fr: "Moyen-Orient", ar: "الشرق الأوسط" },
  "US East Coast": { it: "Costa orientale degli Stati Uniti", de: "US-Ostküste", fr: "Côte est des États-Unis", ar: "الساحل الشرقي للولايات المتحدة" },
  "US West Coast": { it: "Costa occidentale degli Stati Uniti", de: "US-Westküste", fr: "Côte ouest des États-Unis", ar: "الساحل الغربي للولايات المتحدة" },
};

export function isLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function localeFromHeader(value: string | null): Locale {
  return value && isLocale(value) ? value : "en";
}

export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  return isLocale(first) ? first : "en";
}

const LOCALIZED_SLUGS: Record<SupportedLocale, Record<string, string>> = {
  it: {
    "/about": "/chi-siamo", "/contact": "/contatti", "/family-offices": "/family-office",
    "/owner-representation": "/rappresentanza-proprietari", "/privacy": "/privacy",
    "/request-private-access": "/richiedi-accesso-privato", "/sell-your-yacht-privately": "/vendere-yacht-in-privato",
    "/terms": "/termini", "/yacht-brokers": "/broker-yacht", "/yacht-shows": "/saloni-nautici",
    "/off-market-yachts": "/yacht-fuori-mercato", "/private-market-intelligence": "/analisi-mercato-privato",
  },
  de: {
    "/about": "/ueber-uns", "/contact": "/kontakt", "/family-offices": "/family-offices",
    "/owner-representation": "/eigentuemervertretung", "/privacy": "/datenschutz",
    "/request-private-access": "/privaten-zugang-anfragen", "/sell-your-yacht-privately": "/yacht-privat-verkaufen",
    "/terms": "/nutzungsbedingungen", "/yacht-brokers": "/yachtmakler", "/yacht-shows": "/yachtmessen",
    "/off-market-yachts": "/off-market-yachten", "/private-market-intelligence": "/private-marktanalysen",
  },
  fr: {
    "/about": "/a-propos", "/contact": "/contact", "/family-offices": "/family-offices",
    "/owner-representation": "/representation-proprietaire", "/privacy": "/confidentialite",
    "/request-private-access": "/demander-acces-prive", "/sell-your-yacht-privately": "/vendre-yacht-en-prive",
    "/terms": "/conditions", "/yacht-brokers": "/courtiers-yacht", "/yacht-shows": "/salons-nautiques",
    "/off-market-yachts": "/yachts-hors-marche", "/private-market-intelligence": "/analyses-marche-prive",
  },
  ar: {
    "/about": "/من-نحن", "/contact": "/اتصل-بنا", "/family-offices": "/مكاتب-عائلية",
    "/owner-representation": "/تمثيل-المالك", "/privacy": "/الخصوصية",
    "/request-private-access": "/طلب-الوصول-الخاص", "/sell-your-yacht-privately": "/بيع-اليخت-بسرية",
    "/terms": "/الشروط", "/yacht-brokers": "/وسطاء-اليخوت", "/yacht-shows": "/معارض-اليخوت",
    "/off-market-yachts": "/يخوت-خارج-السوق", "/private-market-intelligence": "/تحليلات-سوق-اليخوت",
  },
};

export function internalPath(locale: Locale, path: string): string {
  const clean = path.replace(/^\/(en|it|de|fr|ar)(?=\/|$)/, "") || "/";
  if (locale === "en" || clean === "/") return clean;
  const segments = clean.split("/").filter(Boolean);
  const reverse = Object.fromEntries(
    Object.entries(LOCALIZED_SLUGS[locale]).map(([english, localized]) => [localized.slice(1), english.slice(1)])
  ) as Record<string, string>;
  const first = segments[0] ?? "";
  if (reverse[first]) segments[0] = reverse[first];
  return segments.length ? "/" + segments.join("/") : "/";
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : "/" + path;
  const englishPath = internalPath(locale, clean);
  if (locale === "en" || englishPath === "/") return englishPath;
  const segments = englishPath.split("/").filter(Boolean);
  const localizedRoot = LOCALIZED_SLUGS[locale]["/" + (segments[0] ?? "")] ?? "/" + (segments[0] ?? "");
  const rest = segments.slice(1).join("/");
  return "/" + locale + localizedRoot + (rest ? "/" + rest : "");
}

export function isLocaleReady(locale: Locale): boolean {
  return locale === "en" || Object.keys(GENERATED_TRANSLATIONS[locale] ?? {}).length > 0;
}

export function languageAlternates(path: string): Record<string, string> {
  const basePath = localizedPath("en", path);
  const urlFor = (locale: Locale) => canonical(localizedPath(locale, basePath));
  const result: Record<string, string> = {
    "en-US": urlFor("en"),
    "en-GB": urlFor("en"),
  };
  for (const locale of SUPPORTED_LOCALES) {
    if (!isLocaleReady(locale)) continue;
    for (const languageTag of LOCALE_CONFIG[locale].hreflang) {
      result[languageTag] = urlFor(locale);
    }
  }
  result["x-default"] = urlFor("en");
  return result;
}

export function displayYachtText(locale: Locale, source: string): string {
  const terms = [
    "North American Build", "Northern European Build", "Mediterranean Build", "Long-Range", "Flybridge", "Pilothouse", "Mega Yacht",
    "European Build", "Italian Build", "British Build", "Dutch Build", "German Build",
    "Asian Build", "Explorer Yacht", "Motor Yacht", "Sailing Yacht", "Sport Yacht",
    "Superyacht", "Catamaran", "Trimaran",
  ];
  return terms.reduce((value, term) => value.split(term).join(t(locale, term)), source);
}


export function t(locale: Locale, source: string): string {
  if (locale === "en" || !source) return source;
  const normalized = source.replace(/\s+/g, " ").trim();
  const message = MESSAGES[normalized]?.[locale] ?? GENERATED_TRANSLATIONS[locale]?.[normalized];
  if (!message) return source;
  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  return leading + message + trailing;
}
