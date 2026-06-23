(function () {
  'use strict';

  const AD_CLIENT = 'ca-pub-3538565638908023';
  /* Paste ad unit slot IDs from AdSense → Ads → By ad unit */
  const AD_SLOTS = {
    leaderboard: '',
    rectangle: '',
    banner: '',
  };
  const SITE_URL = 'https://fortune_cookies.pathluno.com';
  const CONTACT_EMAIL = 'contact@pathluno.com';
  const STORAGE_HISTORY = 'fc_history';
  const STORAGE_DAILY = 'fc_daily';
  const MAX_HISTORY = 5;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Fortunes (original 35 + new 35) ── */
  const FORTUNES = [
    { text: 'The river does not hurry, yet it reaches the sea. Neither should you.', numbers: [7, 14, 21] },
    { text: 'A door closes so you stop knocking and find the window.', numbers: [3, 9, 27] },
    { text: 'What you seek is also seeking you — probably in the junk drawer.', numbers: [2, 11, 22] },
    { text: 'Patience is not waiting; it is tending the garden while the seed decides.', numbers: [5, 15, 25] },
    { text: 'The moon waxes and wanes, but your worth is constant.', numbers: [8, 18, 28] },
    { text: 'Your aura is giving "I remembered the oven mid-shower."', numbers: [4, 12, 44] },
    { text: 'Someone is thinking about you. It is your dentist. It is always your dentist.', numbers: [6, 16, 26] },
    { text: 'You will find love. Or a really good sandwich. Both are valid.', numbers: [1, 10, 100] },
    { text: 'Avoid anyone who claps when the plane lands. Trust nothing else today.', numbers: [9, 19, 29] },
    { text: 'Your future holds great success and also losing one sock forever.', numbers: [7, 17, 27] },
    { text: 'The universe says: touch grass. Just a little. For legal reasons.', numbers: [2, 20, 200] },
    { text: 'You are the main character. Unfortunately it is a slow-burn indie film.', numbers: [13, 31, 42] },
    { text: 'A stranger will compliment your shoes. They will be wrong about the brand.', numbers: [5, 55, 555] },
    { text: 'Your villain era is cancelled. New era: confused but well-rested.', numbers: [11, 22, 33] },
    { text: 'If you can read this, you are not a cat. Congratulations.', numbers: [0, 1, 9] },
    { text: 'Your cache will be cleared. Emotionally and digitally.', numbers: [3, 30, 300] },
    { text: '404: Future not found. Try refreshing in six months.', numbers: [4, 4, 4] },
    { text: 'You will go viral for something embarrassing. Frame it.', numbers: [6, 66, 666] },
    { text: 'Your Wi-Fi password contains the answer. It is "password123."', numbers: [1, 2, 3] },
    { text: 'An update is available for your life. Estimated time: unknown.', numbers: [12, 24, 48] },
    { text: 'The alignment of circumstances favors your next bold move.', numbers: [7, 14, 23] },
    { text: 'Energy flows where intention goes — yours is going somewhere interesting.', numbers: [9, 27, 81] },
    { text: 'A convergence of paths awaits at the intersection of courage and Tuesday.', numbers: [2, 8, 32] },
    { text: 'The cosmos whispers: the thing you almost did was the right thing.', numbers: [5, 10, 15] },
    { text: 'Transformation is not a destination. It is a vibe you are already carrying.', numbers: [4, 14, 24] },
    { text: 'Fortune favors the bold. Lucky numbers: 7, 14, 23.', numbers: [7, 14, 23] },
    { text: 'A windfall approaches on wings of possibility. Lucky numbers: 3, 18, 42.', numbers: [3, 18, 42] },
    { text: 'Serendipity is your co-pilot today. Lucky numbers: 9, 27, 51.', numbers: [9, 27, 51] },
    { text: 'The stars align in your favor this evening. Lucky numbers: 2, 11, 33.', numbers: [2, 11, 33] },
    { text: 'Abundance knocks softly. Answer the door. Lucky numbers: 5, 16, 88.', numbers: [5, 16, 88] },
    { text: 'You cracked a digital cookie. The real treasure was the localStorage all along.', numbers: [1, 4, 9] },
    { text: 'This fortune was randomly generated. So was your sense of purpose. Embrace it.', numbers: [8, 16, 32] },
    { text: 'You are reading text on a screen pretending to be paper. We are all pretending.', numbers: [6, 12, 18] },
    { text: 'Refresh the page and I will forget we ever met. I am okay with that.', numbers: [0, 0, 1] },
    { text: 'Share this fortune. The cookie gets commission. Just kidding. Cookies cannot sign contracts.', numbers: [42, 69, 420] },
    { text: "Bro you're literally built different. The algorithm agrees.", numbers: [7, 11, 33] },
    { text: 'The WiFi of life is loading. Stand by.', numbers: [2, 4, 404] },
    { text: 'Your vibe is immaculate. Proceed with chaos.', numbers: [1, 69, 99] },
    { text: "That thing you've been putting off? Still there. Still waiting. Still judging you.", numbers: [3, 13, 41] },
    { text: "Plot twist incoming. You're the main character now.", numbers: [8, 17, 42] },
    { text: 'Do not eat the mystery leftovers. This is your only warning.', numbers: [0, 5, 55] },
    { text: 'Your enemies are manifesting your downfall. Manifest harder.', numbers: [6, 16, 26] },
    { text: '404 destiny not found. Generating backup destiny...', numbers: [3, 14, 15] },
    { text: 'Debugging life: have you tried turning it off and going to sleep?', numbers: [1, 0, 1] },
    { text: 'Stack Overflow cannot help you with this problem.', numbers: [2, 5, 11] },
    { text: 'This fortune brought to you by a random number generator and vibes.', numbers: [42, 69, 420] },
    { text: "The cookie itself has no idea what it's talking about.", numbers: [7, 7, 7] },
    { text: 'You clicked a cookie for wisdom. Respect.', numbers: [1, 2, 3] },
    { text: 'I am a cookie. I cannot see your future. Please eat me.', numbers: [0, 0, 0] },
    { text: 'Your aura is giving main character energy with supporting character anxiety.', numbers: [14, 28, 56] },
    { text: 'Someone is thinking about you. Probably your landlord.', numbers: [4, 8, 15] },
    { text: 'This is a sign. You have been looking for a sign. This is it. Hi.', numbers: [16, 23, 42] },
    { text: "The stars are aligned for you. Mostly Scorpio's fault though.", numbers: [6, 66, 666] },
    { text: "Every expert was once a disaster. You're on schedule.", numbers: [1, 10, 100] },
    { text: 'She believed she could so she did but first she doomscrolled for 45 mins.', numbers: [45, 90, 180] },
    { text: 'Not all who wander are lost. Some are just bad at Google Maps.', numbers: [19, 38, 57] },
    { text: 'Fortune favors the bold. Also the person who actually sends the email.', numbers: [12, 24, 48] },
    { text: "You are exactly where you need to be. Unless you're reading this at 3am. Then sleep.", numbers: [3, 30, 300] },
    { text: 'Growth requires discomfort. So does wearing new shoes. Persevere.', numbers: [7, 14, 28] },
    { text: 'The answer is yes. The question you should be asking is different.', numbers: [5, 55, 555] },
    { text: 'Big things come in small packages. Mediocre things come in medium.', numbers: [50, 75, 100] },
    { text: "Your README is incomplete. So is everyone else's. Ship it.", numbers: [8, 16, 32] },
    { text: 'Still water runs deep. So does your sleep schedule apparently.', numbers: [8, 888, 8888] },
    { text: 'Patience is a virtue. Also annoying. But mostly a virtue.', numbers: [5, 10, 15] },
    { text: 'What you seek is also seeking you. Spooky.', numbers: [3, 33, 333] },
    { text: "The path of least resistance is someone else's path. Be original.", numbers: [11, 22, 44] },
    { text: 'Begin where you stand. The rest will reveal itself.', numbers: [9, 27, 81] },
    { text: 'A great opportunity is nearby. Unfortunately so is your comfort zone.', numbers: [9, 18, 27] },
    { text: 'The universe has receipts. Act accordingly.', numbers: [4, 44, 444] },
    { text: 'Your future self will thank you. Your present self is unaware.', numbers: [20, 40, 80] },
  ];

  const ZODIAC = [
    { id: 'aries', emoji: '♈', name: 'Aries', dates: 'Mar 21 – Apr 19',
      fortune: 'Mars fuels your fire today — act before doubt catches up. Your instinct is sharper than your second-guessing.',
      detail: 'Channel that restless energy into one concrete move you have been circling for weeks. Aries thrives on initiation, not perfection. Send the message, start the draft, book the appointment. The cosmos rewards momentum over rumination, but watch your tone with people who move slower than you.' },
    { id: 'taurus', emoji: '♉', name: 'Taurus', dates: 'Apr 20 – May 20',
      fortune: 'Stability is not stagnation — it is the soil where real growth happens. Invest in what lasts.',
      detail: 'Today favors slow, deliberate choices over flashy pivots. Taurus energy asks you to honor your body, your budget, and your boundaries. A small luxury that genuinely restores you is not indulgence; it is maintenance. Say no to something that drains your peace without offering real return.' },
    { id: 'gemini', emoji: '♊', name: 'Gemini', dates: 'May 21 – Jun 20',
      fortune: 'Two conversations will change your perspective this week. Listen more than you perform.',
      detail: 'Mercury sharpens your wit but scatters your focus. Pick one thread and follow it to the end instead of opening twelve tabs — literal or metaphorical. Gemini gifts you adaptability; use it to bridge a gap between people who are not speaking the same language. Your curiosity is the connective tissue.' },
    { id: 'cancer', emoji: '♋', name: 'Cancer', dates: 'Jun 21 – Jul 22',
      fortune: 'Your intuition is not paranoia — it is pattern recognition with feelings. Trust the quiet signal.',
      detail: 'Cancer season energy reminds you that protecting your inner world is not selfish. Create a pocket of safety today: a meal cooked with care, a call to someone who feels like home, an hour without notifications. Emotional honesty with one trusted person will lighten a weight you have been carrying alone.' },
    { id: 'leo', emoji: '♌', name: 'Leo', dates: 'Jul 23 – Aug 22',
      fortune: 'The spotlight finds those who stop waiting for permission. Create something only you would make.',
      detail: 'Leo radiance is not about being the loudest person in the room — it is about expressing yourself without apology. Share the project, the opinion, the outfit. Generosity of spirit returns to you multiplied. Just remember: admiration is not the same as connection. Let someone else shine too.' },
    { id: 'virgo', emoji: '♍', name: 'Virgo', dates: 'Aug 23 – Sep 22',
      fortune: 'Done is a constellation. Perfect is a mirage. Ship the version that exists today.',
      detail: 'Virgo precision serves you when it reduces chaos, not when it becomes procrastination dressed as standards. Organize one corner of your life — inbox, calendar, kitchen counter — and feel the mental clearance. Your analytical mind spots what others miss; offer that gift without making people feel audited.' },
    { id: 'libra', emoji: '♎', name: 'Libra', dates: 'Sep 23 – Oct 22',
      fortune: 'Balance does not mean splitting everything 50/50. It means knowing what you actually need.',
      detail: 'Libra seeks harmony, but peace purchased at the cost of your truth is expensive. Name a preference you have been softening to keep others comfortable. Relationships deepen when authenticity replaces performance. Beauty, art, and aesthetic pleasure are legitimate fuel today — let them restore you.' },
    { id: 'scorpio', emoji: '♏', name: 'Scorpio', dates: 'Oct 23 – Nov 21',
      fortune: 'What you release makes room for what transforms you. Let the dead weight go.',
      detail: 'Scorpio power lies in depth, not drama. Investigate the feeling beneath the feeling instead of acting on the surface reaction. A honest conversation you have been avoiding could reset an entire dynamic. Protect your energy from people who want access without reciprocity. Transformation is uncomfortable and worth it.' },
    { id: 'sagittarius', emoji: '♐', name: 'Sagittarius', dates: 'Nov 22 – Dec 21',
      fortune: 'The horizon is calling, but adventure also lives in the next question you dare to ask.',
      detail: 'Sagittarius expands everything it touches — including problems if you are not grounded. Learn something new today, even something small. Optimism is your superpower when paired with follow-through. A plan without a destination is still wandering; pick a direction and take the first step.' },
    { id: 'capricorn', emoji: '♑', name: 'Capricorn', dates: 'Dec 22 – Jan 19',
      fortune: 'Ambition without rest is a machine without oil. Schedule recovery like you schedule success.',
      detail: 'Capricorn builds empires brick by brick, but even mountains need erosion to become valleys people can live in. Acknowledge a win you skipped over while chasing the next one. Authority comes from consistency, not exhaustion. Someone younger is watching how you handle pressure — model sustainability.' },
    { id: 'aquarius', emoji: '♒', name: 'Aquarius', dates: 'Jan 20 – Feb 18',
      fortune: 'Your weird idea is not too early — the world is just catching up. Keep building.',
      detail: 'Aquarius sees systems others accept as fixed. Use that vision to improve something local and tangible, not only theoretical. Community matters: find your people instead of broadcasting into the void. Detachment is a tool, not a lifestyle. Let someone in closer than your default allows.' },
    { id: 'pisces', emoji: '♓', name: 'Pisces', dates: 'Feb 19 – Mar 20',
      fortune: 'Dreams are data. Write one down before the world convinces you it was nonsense.',
      detail: 'Pisces swims in emotional currents most signs wade through. That sensitivity is intelligence, not weakness. Create today — music, words, color, movement. Boundaries are how you keep your gift from becoming a leak. Compassion for others starts with not abandoning yourself.' },
  ];

  const ARTICLES = [
    {
      id: 1,
      slug: 'american-origin',
      emoji: '🏯',
      title: 'Fortune Cookies Are Not Chinese — The Surprising American Origin Story',
      excerpt: 'The cookie in your takeout bag was born in California, popularized by Japanese immigrants, and only later adopted by Chinese restaurants across America.',
      readTime: '6 min',
      date: '2026-01-12',
      meta: 'Discover the true American origin of fortune cookies — from San Francisco tea gardens to Brooklyn factories producing millions per day.',
      body: `
        <p>Every year, Americans crack open roughly three billion fortune cookies. Most of us assume they arrived on cargo ships from China, ancient wisdom folded into golden dough. The truth is stranger, more American, and far more interesting.</p>
        <h2>The Japanese Tea Garden Theory</h2>
        <p>The strongest historical case points to <strong>Makoto Hagiwara</strong>, a Japanese immigrant who managed the Japanese Tea Garden in San Francisco's Golden Gate Park in the early 1900s. Hagiwara reportedly served thin, folded cookies containing thank-you notes to visitors. These <em>tsujiura senbei</em> — fortune crackers — were a Japanese tradition, not a Chinese one.</p>
        <p>Meanwhile in Los Angeles, a competing origin story credits <strong>David Jung</strong>, founder of the Hong Kong Noodle Company, who claimed he invented fortune cookies in 1918 to feed homeless people with inspirational messages inside. The rivalry between San Francisco and Los Angeles over cookie paternity became so heated that in 1983, the Court of Historical Review — yes, really — held a mock trial and ruled in San Francisco's favor.</p>
        <h2>World War II and the Great Handoff</h2>
        <p>The fortune cookie's path to Chinese restaurant ubiquity runs through one of America's darkest chapters. During World War II, Japanese Americans were forcibly interned. Japanese-owned bakeries and restaurants across the West Coast closed overnight. Chinese American entrepreneurs, unaffected by the same policies, expanded into the vacuum. They adopted the fortune cookie because customers already loved it — and because it fit perfectly at the end of a meal.</p>
        <p>By the 1950s, fortune cookies were synonymous with Chinese food in the American imagination, despite having almost no historical connection to Chinese cuisine. It was marketing, migration, and circumstance — not ancient tradition.</p>
        <h2>Exporting America Back to China</h2>
        <p>In 1992, Wonton Food Inc. — the largest fortune cookie manufacturer in the United States, producing over four million cookies per day from its Brooklyn factory — attempted to introduce fortune cookies to China as "genuine American fortune cookies." Chinese diners were reportedly confused and unimpressed. The cookie had completed a full cultural orbit: born in Japan, Americanized in California, claimed by Chinese restaurants, and rejected by China as a foreign novelty.</p>
        <h2>Why We Still Believe Them</h2>
        <p>Psychologists call it the <strong>Barnum effect</strong>: we accept vague, positive statements as personally meaningful. Fortune cookies are engineered for this. "You will soon receive unexpected good news" applies to nearly everyone, eventually. The ritual matters more than the randomness — the pause, the crack, the tiny paper prophecy.</p>
        <p>Today, Wonton Food and competitors employ writers — some poets, some comedians — to craft fortunes by the thousands. Your cookie might contain lottery numbers (in 2005, 110 Powerball winners used fortune cookie numbers), a Confucius misquote, or a genuinely thoughtful line. The cookie does not know your future. But it knows human nature remarkably well.</p>
        <blockquote>The fortune cookie is not Chinese. It is not Japanese. It is American — a small, crispy monument to immigration, adaptation, and the human need to believe something pleasant might be waiting inside.</blockquote>
      `,
    },
    {
      id: 2,
      slug: 'why-you-believe',
      emoji: '🧠',
      title: 'Why You Actually Believe Your Fortune Cookie',
      excerpt: 'Bertram Forer proved in 1949 that we rate generic personality descriptions as uniquely accurate. Your cookie exploits the same psychology.',
      readTime: '5 min',
      date: '2026-02-03',
      meta: 'The psychology behind fortune cookies: Forer effect, confirmation bias, and why randomness still changes how we think.',
      body: `
        <p>You know it is random. You watched the website generate the text. And yet — something in you leaned forward. Maybe smiled. Maybe screenshot it. Why?</p>
        <h2>The Forer Experiment</h2>
        <p>In 1949, psychologist <strong>Bertram Forer</strong> gave his students a personality assessment. A week later, he returned individualized results. Students rated the accuracy an average of <strong>4.3 out of 5</strong>. The catch: every student received the exact same paragraph.</p>
        <p>The text included lines like "You have a great need for other people to like and admire you" and "You have a tendency to be critical of yourself." Broad enough to apply to almost anyone. Specific enough to feel personal. This became known as the <strong>Forer effect</strong>, or Barnum effect — named after P.T. Barnum's famous quote about suckers.</p>
        <h2>Confirmation Bias at the Table</h2>
        <p>Once you read a fortune, your brain hunts for evidence. Got a compliment that afternoon? The cookie knew. Had a rough morning? You forget the fortune by lunch. We remember hits and discard misses — the same mechanism that makes horoscopes feel accurate and psychics profitable.</p>
        <h2>Ritual Creates Meaning</h2>
        <p>Anthropologists have long noted that rituals transform ordinary objects into meaningful ones. Breaking the cookie, unfolding the paper, reading aloud to friends — these acts create a <em>frame</em> around the message. A sentence that would scroll past on Twitter becomes prophecy when delivered by crispy dough.</p>
        <h2>Strategic Vagueness as Feature</h2>
        <p>Professional fortune writers deliberately balance specificity and ambiguity. "A door will open" works. "You will meet a tall man named Gerald on Thursday" does not — unless Gerald appears, in which case you tell everyone for decades. Good fortunes feel actionable without being falsifiable.</p>
        <h2>Does Randomness Matter?</h2>
        <p>Philosophically, perhaps not. If a randomly generated sentence prompts genuine reflection — about a relationship, a career move, a habit — the outcome is real even if the mechanism is not. The cookie is a <strong>randomness machine for self-reflection</strong>. You supply the meaning. It supplies the excuse to think.</p>
        <p>So believe your fortune, or do not. Share it ironically, or sincerely. The psychology will work either way. Forer knew that in 1949. You proved it again tonight.</p>
      `,
    },
    {
      id: 3,
      slug: 'spit-out-tea',
      emoji: '😂',
      title: '50 Fortune Cookie Messages That Actually Made People Spit Out Their Tea',
      excerpt: 'From absurdist classics to accidentally profound gut-punches — plus the 2005 Powerball fortune cookie incident.',
      readTime: '6 min',
      date: '2026-02-18',
      meta: 'The funniest, weirdest, and most surprisingly profound fortune cookie messages ever printed — including lottery history.',
      body: `
        <p>Fortune cookie writers walk a line between mystic and comedian. Sometimes they fall off the line entirely. Here are messages that made real humans pause mid-chew.</p>
        <h2>Absurdist Classics</h2>
        <ul>
          <li>"You will be hungry again in one hour."</li>
          <li>"The fortune you seek is in another cookie."</li>
          <li>"Help! I am being held prisoner in a fortune cookie factory."</li>
          <li>"Ignore previous cookie."</li>
          <li>"This cookie contains no fortune. That is your fortune."</li>
          <li>"You love Chinese food."</li>
          <li>"Pass this fortune to a friend. Anxiety is contagious."</li>
        </ul>
        <h2>Accidentally Profound</h2>
        <ul>
          <li>"A closed mouth gathers no feet."</li>
          <li>"The road to knowledge begins with the turn of the page."</li>
          <li>"You will die, but most of your organs will outlive you."</li>
          <li>"Now is the winter of your discontent — but spring is loading."</li>
          <li>"Stop searching forever. You have enough."</li>
        </ul>
        <h2>Suspiciously Specific</h2>
        <ul>
          <li>"That thing you did last Tuesday? We know."</li>
          <li>"Your car warranty is about to expire."</li>
          <li>"Avoid men in hats named Steve."</li>
          <li>"The password is not your birthday. Stop trying."</li>
        </ul>
        <h2>Philosophical Gut-Punch</h2>
        <ul>
          <li>"You are not late. You are exactly on your own schedule, which is also late."</li>
          <li>"Everything will be okay. Not today. But eventually."</li>
          <li>"You cannot control the wind. You can adjust your sails. Or stay inside."</li>
        </ul>
        <h2>Written By An Intern On Their Last Day</h2>
        <ul>
          <li>"I quit. Good luck with everything."</li>
          <li>"Your boss is reading your texts."</li>
          <li>"This job is not your passion. Leave."</li>
          <li>"Error 404: Fortune not found."</li>
        </ul>
        <h2>The 2005 Powerball Incident</h2>
        <p>In March 2005, a fortune cookie company printed a series of "lucky numbers" that happened to match — almost — the Powerball drawing. <strong>110 people</strong> won second-prize payouts of $100,000 to $500,000. Lottery officials initially suspected fraud. The truth was simpler: millions of cookies, same numbers, one wild Tuesday.</p>
        <p>The incident became legend in both lottery history and fortune cookie lore. It proved that randomness scales in ways nobody expects — and that Americans will absolutely play numbers they found inside dessert.</p>
        <blockquote>The best fortunes do not predict the future. They interrupt the present — a laugh, a wince, a moment of unexpected truth between bites of lo mein.</blockquote>
      `,
    },
    {
      id: 4,
      slug: 'homemade-recipe',
      emoji: '👨‍🍳',
      title: 'How to Make Fortune Cookies at Home (The Real Recipe)',
      excerpt: 'Egg whites, butter, flour, and speed. The secret is folding within seconds of leaving the oven.',
      readTime: '5 min',
      date: '2026-03-01',
      meta: 'Step-by-step homemade fortune cookie recipe with custom fortune ideas and pro tips for perfect folds.',
      body: `
        <p>Store-bought fortune cookies are fine. Homemade ones are magic — warm, buttery, and carrying whatever message you choose. Fair warning: the first batch will look like abstract art. By batch three, you will feel like a god.</p>
        <h2>Ingredients</h2>
        <ul>
          <li>3 large egg whites</li>
          <li>3/4 cup granulated sugar</li>
          <li>1/2 cup butter, melted and cooled</li>
          <li>1/2 teaspoon vanilla extract</li>
          <li>1/4 teaspoon almond extract</li>
          <li>1 cup all-purpose flour</li>
          <li>2 tablespoons water</li>
        </ul>
        <h2>Equipment You Actually Need</h2>
        <p>A <strong>silicone baking mat</strong> or parchment paper. A muffin tin to hold folded shape. Paper fortunes cut to 3×1/2 inches. Thin cotton gloves or tolerance for hot cookies — you will fold with your fingers.</p>
        <h2>Method</h2>
        <ol>
          <li>Preheat oven to <strong>375°F (190°C)</strong>. Write fortunes first. You will not have time later.</li>
          <li>Beat egg whites and sugar until frothy — not stiff peaks. Stir in butter and extracts.</li>
          <li>Fold in flour and water until smooth. Batter should be thin, like pancake batter.</li>
          <li>Spread 1 tablespoon batter into a 3-inch circle on silicone mat. Only bake <strong>2–3 cookies per batch</strong>. They harden in seconds.</li>
          <li>Bake 7–9 minutes until edges turn golden. Centers should look set but pale.</li>
          <li>Working fast: flip cookie with spatula, place fortune in center, fold in half, then bend over mug edge or muffin tin rim to create the classic shape. Hold 10 seconds until set.</li>
        </ol>
        <h2>Why Timing Is Everything</h2>
        <p>Fortune cookie batter is a race against physics. Too long in the oven and it shatters. Too slow folding and it cracks. Bake small batches. Accept that your first six cookies will be practice. Embrace the chaos.</p>
        <h2>Custom Fortune Ideas</h2>
        <ul>
          <li>Inside jokes for dinner guests</li>
          <li>Marriage proposals (yes, people do this)</li>
          <li>Apologies too awkward to say aloud</li>
          <li>Fake lottery numbers for chaos</li>
          <li>"You will do the dishes tonight" — assign chores democratically</li>
        </ul>
        <p>Homemade fortune cookies taste like butter and effort. They crackle when you break them. And the message inside? That one is yours. No algorithm required.</p>
      `,
    },
  ];

  const ROUTES = {
    '/': { render: renderHome, title: 'Fortune Cookie — Crack Your Destiny', meta: 'Crack digital fortune cookies, get your daily fortune, and explore zodiac wisdom.' },
    '/zodiac': { render: renderZodiac, title: 'Zodiac Fortunes', meta: 'Click your sign for a cosmic fortune and grounded advice for all 12 zodiac signs.' },
    '/blog': { render: renderBlog, title: 'Blog', meta: 'Stories about fortune cookie history, psychology, funny messages, and homemade recipes.' },
    '/about': { render: renderAbout, title: 'About Us', meta: 'Learn about Fortune Cookie — digital fortunes, zodiac wisdom, and stories worth procrastinating over.' },
    '/privacy': { render: renderPrivacy, title: 'Privacy Policy', meta: 'Privacy policy for Fortune Cookie including GDPR, cookies, and Google AdSense disclosure.' },
  };

  const main = document.getElementById('main');
  const toast = document.getElementById('toast');
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const leaderboard = document.querySelector('.ad-leaderboard');

  let lastFortuneIdx = -1;
  let cookieAnimating = false;

  /* ── Utilities ── */
  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function adSlot(size, label) {
    const slotId = AD_SLOTS[size] || '';
    const styles = {
      leaderboard: 'display:inline-block;width:728px;height:90px',
      rectangle: 'display:inline-block;width:300px;height:250px',
      banner: 'display:inline-block;width:468px;height:60px',
    };
    const ins = slotId
      ? `<ins class="adsbygoogle" style="${styles[size] || 'display:block'}"
          data-ad-client="${AD_CLIENT}" data-ad-slot="${slotId}"></ins>`
      : '';
    const live = ins ? ' ad-slot--live' : '';
    const labelAttr = ins ? '' : ` data-label="${label}"`;
    return `<div class="ad-slot ad-${size}${live}" data-ad-size="${label.replace('Ad · ', '')}"${labelAttr} role="complementary" aria-label="Advertisement">${ins}</div>`;
  }

  function loadAds() {
    if (typeof window.adsbygoogle === 'undefined') return;
    document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])').forEach((el) => {
      if (!el.getAttribute('data-ad-slot')) return;
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ad block */ }
    });
  }

  function setupLeaderboardAd() {
    if (!leaderboard) return;
    const ins = leaderboard.querySelector('.adsbygoogle');
    const slotId = AD_SLOTS.leaderboard;
    if (!ins) return;
    if (slotId) {
      ins.setAttribute('data-ad-slot', slotId);
      leaderboard.classList.add('ad-slot--live');
      leaderboard.removeAttribute('data-label');
    }
  }

  function formatNumbers(nums) {
    return `Lucky numbers: ${nums.join(', ')}`;
  }

  function pickFortune() {
    let idx;
    do { idx = Math.floor(Math.random() * FORTUNES.length); }
    while (idx === lastFortuneIdx && FORTUNES.length > 1);
    lastFortuneIdx = idx;
    return FORTUNES[idx];
  }

  function dailyFortune() {
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem(STORAGE_DAILY) || 'null');
    if (stored && stored.date === today) return stored.fortune;
    const idx = hashCode(today) % FORTUNES.length;
    const fortune = FORTUNES[Math.abs(idx)];
    localStorage.setItem(STORAGE_DAILY, JSON.stringify({ date: today, fortune }));
    return fortune;
  }

  function hashCode(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i) | 0;
    return h;
  }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || []; } catch { return []; }
  }

  function saveHistory(fortune) {
    const h = getHistory();
    h.unshift(fortune);
    localStorage.setItem(STORAGE_HISTORY, JSON.stringify(h.slice(0, MAX_HISTORY)));
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function setMeta(title, desc) {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', desc);
  }

  function setActiveNav(path) {
    document.querySelectorAll('.site-nav a').forEach((a) => {
      const href = a.getAttribute('href').replace('#', '') || '/';
      a.classList.toggle('active', href === path || (path === '/' && href === '/'));
    });
  }

  function closeNav() {
    siteNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  /* ── Cookie SVG ── */
  function cookieSVG() {
    return `<div class="cookie-zone">
      <p class="cookie-hint" id="cookie-hint">Tap the cookie to crack it open</p>
      <div class="cookie-stage" id="cookie-stage" role="button" tabindex="0" aria-label="Crack fortune cookie">
        <div class="cookie-shadow"></div>
        <div class="cookie-halves">
          <div class="cookie-half cookie-half--left">${halfSVG('L')}</div>
          <div class="cookie-half cookie-half--right">${halfSVG('R')}</div>
        </div>
      </div>
      <div class="fortune-card" id="fortune-card" aria-live="polite">
        <p class="fortune-text" id="fortune-text"></p>
        <p class="fortune-numbers" id="fortune-numbers"></p>
        <div class="fortune-actions">
          <button class="btn btn-gold" id="btn-share" type="button">Share</button>
          <button class="btn btn-outline" id="btn-copy" type="button">Copy</button>
        </div>
      </div>
      <button class="btn btn-outline btn-reset" id="btn-reset" type="button">Crack Another</button>
    </div>`;
  }

  function halfSVG(side) {
    const g = side === 'L' ? 'gradL' : 'gradR';
    const x = side === 'L' ? '100%' : '0%';
    const path = side === 'L'
      ? 'M 105 115 C 105 115, 108 85, 100 62 C 94 48, 80 28, 55 18 C 30 8, 10 22, 5 48 C 0 72, 12 100, 38 118 C 58 130, 82 128, 105 115 Z'
      : 'M 5 115 C 5 115, 2 85, 10 62 C 16 48, 30 28, 55 18 C 80 8, 100 22, 105 48 C 110 72, 98 100, 72 118 C 52 130, 28 128, 5 115 Z';
    return `<svg viewBox="0 0 110 130" width="100" height="118" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="${g}" x1="${x}" y1="0%" x2="${side === 'L' ? '0%' : '100%'}" y2="100%">
        <stop offset="0%" stop-color="#FFE08A"/><stop offset="50%" stop-color="#F0C050"/><stop offset="100%" stop-color="#D4954A"/>
      </linearGradient></defs>
      <path d="${path}" fill="url(#${g})"/>
    </svg>`;
  }

  function bindCookie() {
    const stage = document.getElementById('cookie-stage');
    const card = document.getElementById('fortune-card');
    const textEl = document.getElementById('fortune-text');
    const numsEl = document.getElementById('fortune-numbers');
    const hint = document.getElementById('cookie-hint');
    const resetBtn = document.getElementById('btn-reset');
    if (!stage) return;

    function reveal(f) {
      textEl.textContent = f.text;
      numsEl.textContent = formatNumbers(f.numbers);
      card.classList.add('visible');
      resetBtn.classList.add('visible');
      hint.style.opacity = '0';
      saveHistory(f);
      setMeta(f.text.slice(0, 55), document.querySelector('meta[name="description"]').content);
    }

    function crack() {
      if (cookieAnimating || stage.classList.contains('cracking')) return;
      cookieAnimating = true;
      stage.classList.add('disabled');
      card.classList.remove('visible');
      resetBtn.classList.remove('visible');
      const f = pickFortune();

      if (prefersReducedMotion) {
        stage.classList.add('cracking');
        reveal(f);
        cookieAnimating = false;
        return;
      }
      stage.classList.add('shaking');
      setTimeout(() => {
        stage.classList.remove('shaking');
        stage.classList.add('cracking');
        reveal(f);
      }, 300);
      setTimeout(() => { cookieAnimating = false; }, 900);
    }

    function reset() {
      if (cookieAnimating) return;
      cookieAnimating = true;
      card.classList.remove('visible');
      resetBtn.classList.remove('visible');
      stage.classList.add('resetting');
      stage.classList.remove('cracking');
      setTimeout(() => {
        stage.classList.remove('resetting', 'disabled');
        hint.style.opacity = '1';
        cookieAnimating = false;
      }, 400);
    }

    stage.addEventListener('click', crack);
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); crack(); }
    });
    resetBtn.addEventListener('click', reset);

    document.getElementById('btn-share').addEventListener('click', async () => {
      const t = textEl.textContent + '\n' + numsEl.textContent;
      if (navigator.share) {
        try { await navigator.share({ title: 'My Fortune', text: t }); return; } catch { /* */ }
      }
      try { await navigator.clipboard.writeText(t); showToast('Copied!'); } catch { showToast('Could not copy'); }
    });
    document.getElementById('btn-copy').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(textEl.textContent + '\n' + numsEl.textContent); showToast('Copied!'); } catch { showToast('Could not copy'); }
    });
  }

  /* ── Page: Home ── */
  function renderHome() {
    const daily = dailyFortune();
    const preview = ARTICLES.slice(0, 2);
    const history = getHistory();

    main.innerHTML = `<div class="page-enter home-layout">
      <div class="home-main">
        <div class="home-hero">
          <h1>Your Fortune Awaits</h1>
          <p>Crack open your destiny (responsibly)</p>
        </div>
        ${cookieSVG()}
        <section class="daily-fortune" aria-label="Daily fortune">
          <h2>✦ Today's Fortune</h2>
          <p class="fortune-text">${esc(daily.text)}</p>
          <p class="fortune-numbers">${esc(formatNumbers(daily.numbers))}</p>
        </section>
        ${history.length ? `<section><h2 class="section-heading">Recent Cracks</h2><div class="history-list">${history.map((f) => `<div class="history-item">${esc(f.text)}</div>`).join('')}</div></section>` : ''}
        <section>
          <h2 class="section-heading">From the Blog</h2>
          <div class="card-grid">${preview.map(blogCardHTML).join('')}</div>
          <p style="text-align:center;margin-top:1rem"><a href="#/blog" class="btn btn-outline" data-nav>All Articles</a></p>
        </section>
      </div>
      <aside>${adSlot('rectangle', 'Ad · 300x250')}</aside>
    </div>`;
    bindCookie();
    bindNavLinks();
  }

  /* ── Page: Zodiac ── */
  function renderZodiac() {
    main.innerHTML = `<div class="page-enter">
      <h1 class="page-title">Zodiac Fortunes</h1>
      <p class="page-subtitle">Choose your sign. The cosmos has notes.</p>
      <div class="zodiac-grid" id="zodiac-grid">
        ${ZODIAC.map((z) => `<button class="zodiac-card" type="button" data-sign="${z.id}" aria-label="${z.name} fortune">
          <span class="emoji">${z.emoji}</span>
          <span class="name">${z.name}</span>
          <span class="dates">${z.dates}</span>
        </button>`).join('')}
      </div>
      <div class="zodiac-panel" id="zodiac-panel" aria-live="polite"></div>
      ${adSlot('rectangle', 'Ad · 300x250')}
    </div>`;

    const panel = document.getElementById('zodiac-panel');
    document.getElementById('zodiac-grid').addEventListener('click', (e) => {
      const card = e.target.closest('.zodiac-card');
      if (!card) return;
      const sign = ZODIAC.find((z) => z.id === card.dataset.sign);
      document.querySelectorAll('.zodiac-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      panel.innerHTML = `<div class="zodiac-panel-header">
        <span class="emoji">${sign.emoji}</span>
        <div><h2>${sign.name}</h2><p class="dates">${sign.dates}</p></div>
      </div>
      <p class="fortune-line">${esc(sign.fortune)}</p>
      <p class="detail">${esc(sign.detail)}</p>`;
      panel.classList.add('visible');
      panel.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    });
    bindNavLinks();
  }

  /* ── Page: Blog ── */
  function blogCardHTML(a) {
    return `<a href="#/article/${a.id}" class="blog-card" data-nav>
      <div class="blog-card-emoji">${a.emoji}</div>
      <div class="blog-card-body">
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.excerpt)}</p>
        <p class="blog-card-meta">${a.readTime} · ${a.date}</p>
      </div>
    </a>`;
  }

  function renderBlog() {
    main.innerHTML = `<div class="page-enter">
      <h1 class="page-title">Blog</h1>
      <p class="page-subtitle">History, psychology, chaos, and recipes.</p>
      <div class="card-grid">${ARTICLES.map(blogCardHTML).join('')}</div>
    </div>`;
    bindNavLinks();
  }

  /* ── Page: Article ── */
  function renderArticle(id) {
    const article = ARTICLES.find((a) => a.id === Number(id));
    if (!article) { navigate('/blog'); return; }
    const others = ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

    main.innerHTML = `<article class="page-enter">
      <header class="article-header">
        <p class="article-meta">${article.emoji} ${article.readTime} · ${article.date}</p>
        <h1>${esc(article.title)}</h1>
      </header>
      <div class="article-body">${article.body}</div>
      ${adSlot('banner', 'Ad · 468x60')}
      <h2 class="section-heading">More Articles</h2>
      <div class="card-grid">${others.map(blogCardHTML).join('')}</div>
    </article>`;
    setMeta(article.title + ' | Fortune Cookie', article.meta);
    bindNavLinks();
  }

  /* ── Page: About ── */
  function renderAbout() {
    main.innerHTML = `<div class="page-enter prose">
      <h1 class="page-title">About Fortune Cookie</h1>
      <p>Fortune Cookie is part of <strong>Pathluno</strong> — a small project for people who crack a cookie, laugh at the fortune, screenshot it for the group chat, and come back tomorrow for another.</p>
      <p>Here you will find digital fortune cookies with 70 unique messages, a daily fortune that resets at midnight, zodiac readings that mix cosmic poetry with practical advice, and a blog full of real articles about where fortune cookies actually came from and why we believe them anyway.</p>
      <p>We are not psychics. We are not astrologers with certificates. We are enthusiasts of randomness, ritual, and the strange comfort of a good line at the right moment. Questions, feedback, or fortune submissions? Email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
    </div>`;
    bindNavLinks();
  }

  /* ── Page: Privacy ── */
  function renderPrivacy() {
    main.innerHTML = `<div class="page-enter prose">
      <h1 class="page-title">Privacy Policy</h1>
      <p><em>Last updated: June 24, 2026</em></p>
      <p>Pathluno ("we", "us", "our") operates Fortune Cookie at <a href="${SITE_URL}">fortune_cookies.pathluno.com</a>. This Privacy Policy explains how we collect, use, and protect your information when you use our site, in compliance with GDPR and requirements for Google AdSense publishers.</p>
      <h2>Information We Collect</h2>
      <p><strong>Local storage:</strong> We store your recent fortune cookie results and daily fortune date in your browser's localStorage. This data never leaves your device and is not transmitted to our servers.</p>
      <p><strong>Automatically collected data:</strong> When you visit our site, third-party services (including Google AdSense) may collect information such as your IP address, browser type, device information, pages visited, and cookies. We do not directly collect personal identification information unless you contact us by email.</p>
      <h2>Cookies and Advertising</h2>
      <p>We use cookies and similar technologies to serve advertisements through <strong>Google AdSense</strong>. Google and its partners may use cookies to serve ads based on your prior visits to this website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">aboutads.info</a>.</p>
      <p>Third-party vendors, including Google, use cookies to serve ads. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.</p>
      <h2>Legal Basis for Processing (GDPR)</h2>
      <p>If you are in the European Economic Area, we process data based on: (1) your consent, where required for cookies and advertising; (2) legitimate interests in operating and improving our website; and (3) compliance with legal obligations.</p>
      <h2>Your Rights</h2>
      <p>Under GDPR, you have the right to access, rectify, erase, restrict processing, object to processing, and data portability. To clear locally stored fortunes, clear your browser's site data for this domain. For other requests, contact <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
      <h2>Children's Privacy</h2>
      <p>Our site is not directed at children under 13. We do not knowingly collect personal information from children.</p>
      <h2>Changes</h2>
      <p>We may update this policy periodically. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
      <h2>Contact</h2>
      <p>Website: <a href="${SITE_URL}">fortune_cookies.pathluno.com</a><br>Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
    </div>`;
    bindNavLinks();
  }

  /* ── Router ── */
  function parseRoute() {
    const hash = location.hash.replace('#', '') || '/';
    const articleMatch = hash.match(/^\/article\/(\d+)/);
    if (articleMatch) return { path: '/article', id: articleMatch[1] };
    return { path: hash.split('?')[0] || '/', id: null };
  }

  function navigate(path) {
    location.hash = path;
  }

  function handleRoute() {
    const { path, id } = parseRoute();
    closeNav();

    if (path.startsWith('/article') && id) {
      renderArticle(id);
      setActiveNav('/blog');
      loadAds();
      return;
    }

    const route = ROUTES[path] || ROUTES['/'];
    route.render();
    setMeta(route.title, route.meta);
    setActiveNav(path === '/' ? '/' : path);
    loadAds();
  }

  function bindNavLinks() {
    main.querySelectorAll('[data-nav]').forEach((el) => {
      el.addEventListener('click', closeNav);
    });
  }

  /* ── Init ── */
  document.getElementById('year').textContent = new Date().getFullYear();
  setupLeaderboardAd();

  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.site-nav a, .logo[data-nav], .footer-links a[data-nav]').forEach((a) => {
    a.addEventListener('click', closeNav);
  });

  window.addEventListener('hashchange', handleRoute);
  if (!location.hash) location.hash = '/';
  else handleRoute();
  loadAds();
})();
