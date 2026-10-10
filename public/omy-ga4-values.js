/*!
 * OffMarketYacht — GA4 dynamic event values (model: ev_v1)
 * Property: G-ZMWNM9MYMQ  |  Requires the existing gtag.js snippet on the page.
 *
 * value = (listing price midpoint | segment average price) x 10% commission x P(close | event)
 * Segments: motor_yacht (< 100 ft), superyacht (>= 100 ft or midpoint >= $8M), unknown (blended).
 * All probabilities below are ASSUMPTIONS — replace them with real funnel data when you have it.
 *
 * Loaded site-wide by src/components/GoogleAnalytics.tsx. Test with:  window.OMY_DRY = true
 * (logs instead of sending).
 *
 * Lead events (generate_lead / generate_seller_lead) are NOT fired from a DOM submit listener:
 * the app calls window.omyLead('buyer'|'seller') from track() once the server accepted the lead.
 *
 * NOTE: once this script is live, delete the 5 GA4 "Create event" rules (view_*), otherwise events
 * are counted twice (the rule fires on page_view without a value, this script fires with a value).
 */
(function () {
  'use strict';
  if (window.__omyValues) return;
  window.__omyValues = true;

  var COMMISSION = 0.10;
  var AVG_PRICE = { motor_yacht: 2000000, superyacht: 8500000 };
  // unknown segment = blended 70% motor / 30% superyacht commission pool = $395,000
  var BLENDED_POOL = 395000;
  var P = {
    generate_lead: 0.01,
    generate_seller_lead: 0.01,
    click_phone: 0.005,
    click_email: 0.004,
    view_request_access: 0.002,
    view_contact: 0.001,
    view_sell_private: 0.0005,
    select_item: 0.0005,
    view_listing: 0.0003,
    view_market_intel: 0.00005
  };

  function gt() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === 'function') return window.gtag.apply(null, arguments);
    window.dataLayer.push(arguments);
  }
  function send(name, params) {
    if (window.OMY_DRY) { console.log('[OMY]', name, params); return; }
    gt('event', name, params);
  }

  function parseMoney(s) { // "2.4M" -> 2400000, "850K" -> 850000
    var m = /([\d.,]+)\s*([MK])?/i.exec(s || '');
    if (!m) return null;
    var n = parseFloat(m[1].replace(/,/g, ''));
    if (m[2]) n *= m[2].toUpperCase() === 'M' ? 1e6 : 1e3;
    return n;
  }

  function readListing() {
    var path = location.pathname.replace(/\/+$/, '');
    var idm = /\/off-market-yachts\/(omy-\d+)/i.exec(path);
    if (!idm) return null;
    var txt = (document.querySelector('main') || document.body).innerText;
    var len = /(\d{2,3})\s*ft\b/i.exec(document.title + ' ' + txt);
    var pr = /\$\s*([\d.,]+\s*[MK]?)\s*[–—-]\s*\$?\s*([\d.,]+\s*[MK]?)/i.exec(txt);
    var lo = pr ? parseMoney(pr[1]) : null, hi = pr ? parseMoney(pr[2]) : null;
    if (lo && hi && hi < lo && /M/i.test(pr[2]) && !/[MK]/i.test(pr[1])) lo = lo * 1e6; // "2.4–2.9M"
    var mid = lo && hi ? (lo + hi) / 2 : null;
    var ft = len ? parseInt(len[1], 10) : null;
    return { id: idm[1].toLowerCase(), ft: ft, lo: lo, hi: hi, mid: mid };
  }

  function segmentOf(l) {
    if (!l) return null;
    if ((l.ft && l.ft >= 100) || (l.mid && l.mid >= 8e6)) return 'superyacht';
    if (l.ft || l.mid) return 'motor_yacht';
    return null;
  }

  function remember(seg, mid, id) {
    try { sessionStorage.setItem('omy_ctx', JSON.stringify({ seg: seg, mid: mid, id: id })); } catch (e) {}
  }
  function recall() {
    try { return JSON.parse(sessionStorage.getItem('omy_ctx') || 'null'); } catch (e) { return null; }
  }

  // Build the value + params for an event, using page context, then session context, then blended.
  function build(name, ctx) {
    var seg = 'unknown', pool = BLENDED_POOL, extra = {};
    if (ctx && ctx.seg) {
      seg = ctx.seg;
      var price = ctx.mid || AVG_PRICE[seg];
      pool = price * COMMISSION;
      if (ctx.id) extra.listing_id = ctx.id;
      if (ctx.mid) extra.price_mid = Math.round(ctx.mid);
    }
    var p = P[name] || 0;
    extra.value = Math.max(1, Math.round(pool * p));
    extra.currency = 'USD';
    extra.yacht_segment = seg;
    extra.value_model = 'ev_v1';
    return extra;
  }

  function ctxNow() {
    var l = readListing();
    var seg = segmentOf(l);
    if (seg) {
      var c = { seg: seg, mid: l.mid, id: l.id };
      remember(seg, l.mid, l.id);
      return c;
    }
    return recall();
  }

  var firedPath = null;
  function onPage() {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    if (path === firedPath) return;
    firedPath = path;
    // wait for client-rendered content (price/length) before reading it
    var tries = 0;
    (function wait() {
      var isListing = /^\/off-market-yachts\/omy-\d+/i.test(path);
      var ready = !isListing || readListing() && readListing().ft;
      if (!ready && tries++ < 20) return setTimeout(wait, 150);
      var c = ctxNow();
      if (isListing) send('view_listing', build('view_listing', c));
      else if (path === '/request-private-access') send('view_request_access', build('view_request_access', c));
      // Seller-side events never inherit a buyer's listing context.
      else if (path === '/sell-your-yacht-privately') send('view_sell_private', build('view_sell_private', null));
      else if (path === '/contact') send('view_contact', build('view_contact', c));
      else if (/^\/private-market-intelligence\/.+/.test(path)) send('view_market_intel', build('view_market_intel', c));
    })();
  }

  // SPA route changes
  ['pushState', 'replaceState'].forEach(function (fn) {
    var orig = history[fn];
    history[fn] = function () { var r = orig.apply(this, arguments); setTimeout(onPage, 0); return r; };
  });
  window.addEventListener('popstate', function () { setTimeout(onPage, 0); });

  // Clicks: phone, email, listing cards
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var c = ctxNow();
    if (/^tel:/i.test(href)) send('click_phone', build('click_phone', c));
    else if (/^mailto:/i.test(href)) send('click_email', build('click_email', c));
    else {
      var m = /\/off-market-yachts\/(omy-\d+)/i.exec(href);
      if (m) {
        // derive the card's own segment from its link text, e.g. "OMY-1145: 72 ft Sport Yacht, Florida, $2.4M–$2.9M"
        var t = a.innerText || '';
        var len = /(\d{2,3})\s*ft\b/i.exec(t);
        var pr = /\$\s*([\d.,]+\s*[MK]?)\s*[–—-]\s*\$?\s*([\d.,]+\s*[MK]?)/i.exec(t);
        var lo = pr && parseMoney(pr[1]), hi = pr && parseMoney(pr[2]);
        var l = { id: m[1].toLowerCase(), ft: len ? +len[1] : null, mid: lo && hi ? (lo + hi) / 2 : null };
        var seg = segmentOf(l);
        send('select_item', build('select_item', seg ? { seg: seg, mid: l.mid, id: l.id } : c));
      }
    }
  }, true);

  // Leads: called by the app (track() in src/lib/analytics.ts) only after the server has
  // accepted the submission, so invalid or rejected submits are not counted.
  window.omyLead = function (kind) {
    var name = kind === 'seller' ? 'generate_seller_lead' : 'generate_lead';
    send(name, build(name, kind === 'seller' ? null : ctxNow()));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onPage);
  else onPage();
})();
