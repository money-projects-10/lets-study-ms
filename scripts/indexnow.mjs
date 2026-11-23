// Tell Bing (and other IndexNow engines) that every page changed, so they recrawl soon.
// Run after a deploy is live: `npm run indexnow`. The key file /<INDEXNOW_KEY>.txt must already be online.
import { pages, INDEXNOW_KEY, SITE_URL } from '../src/data/site.js';

const host = new URL(SITE_URL).host;
const keyLocation = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const check = await fetch(keyLocation);
if (!check.ok || (await check.text()).trim() !== INDEXNOW_KEY) {
  console.error(`Key file ${keyLocation} is not live yet (HTTP ${check.status}). Deploy first, then run this again.`);
  process.exit(1);
}

const urlList = pages.map((p) => `${SITE_URL}${p.path}`);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation, urlList }),
});
// 200 = accepted, 202 = accepted, key validation pending.
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}
