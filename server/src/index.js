import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sponsor-match-local-development-secret';
const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'store.json');
const uploadDir = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(uploadDir));

const id = (prefix) => `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
const seedStore = () => {
  const creators = [
    { _id: 'arjun', name: 'Arjun Menon', username: '@arjun.eats', email: 'arjun@sponsormatch.demo', contactEmail: 'arjun@sponsormatch.demo', phone: '+91 98765 43210', emailVerified: true, phoneVerified: true, socials: { instagram: 'https://instagram.com/arjun.eats', youtube: 'https://youtube.com/@arjuneats', x: 'https://x.com/arjuneats', facebook: '' }, category: 'Food', location: 'Coimbatore', followers: '2.1K', bio: 'Finding the small places worth crossing town for.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=85', platforms: ['Instagram', 'YouTube'], audience: 'College & young professionals', verifiedReceipts: 7, receiptCount: 12, vouches: 4 },
    { _id: 'priya', name: 'Priya Shah', username: '@priyamakes', email: 'priya@sponsormatch.demo', category: 'Lifestyle', location: 'Bengaluru', followers: '8.4K', bio: 'Everyday rituals, thoughtfully made.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=85', platforms: ['Instagram', 'TikTok'], audience: 'Young urban women', verifiedReceipts: 4, receiptCount: 9, vouches: 3 },
    { _id: 'rahul', name: 'Rahul Nair', username: '@rahulplays', email: 'rahul@sponsormatch.demo', category: 'Gaming', location: 'Chennai', followers: '12K', bio: 'Good games, great communities, no gatekeeping.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=85', platforms: ['YouTube', 'Twitch'], audience: '18–28 gaming audience', verifiedReceipts: 0, receiptCount: 3, vouches: 1 },
    { _id: 'meena', name: 'Meena Krishnan', username: '@meenasplate', email: 'meena@sponsormatch.demo', category: 'Local Food', location: 'Coimbatore', followers: '1.3K', bio: 'Home-style food and the people behind it.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85', platforms: ['Instagram'], audience: 'Local families & foodies', verifiedReceipts: 5, receiptCount: 8, vouches: 4 },
    { _id: 'karthik', name: 'Karthik Rao', username: '@roamswithk', email: 'karthik@sponsormatch.demo', category: 'Travel', location: 'Mysuru', followers: '5.7K', bio: 'Slow travel, useful maps, and stories from the road.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=85', platforms: ['Instagram', 'YouTube'], audience: 'Weekend travellers', verifiedReceipts: 2, receiptCount: 6, vouches: 2 }
  ];
  const brand = { _id: 'coffee-house', userId: 'brand-user', name: 'Coimbatore Coffee House', email: 'demo@coffeeco.in', contactEmail: 'demo@coffeeco.in', phone: '+91 422 245 0188', emailVerified: true, phoneVerified: true, socials: { instagram: 'https://instagram.com/coimbatorecoffeehouse', facebook: 'https://facebook.com/coimbatorecoffeehouse', x: '', website: 'https://coimbatorecoffeehouse.example' }, category: 'Food & beverage', location: 'Coimbatore', description: 'Independent coffee, good light and a table for your next idea.', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85', address: '12, Race Course Road, Coimbatore, Tamil Nadu 641018', latitude: 11.0168, longitude: 76.9558 };
  const receipts = [
    ['arjun', 'Restaurant Campaign — 32 Customer Visits', 'Footfall', 'My Instagram Reel helped generate 32 visits during the campaign week.', '32 verified visits', 'BRAND_VERIFIED'], ['arjun', 'Monsoon Bowl drop', 'Coupon Redemption', 'A simple coupon gave the audience a reason to act.', '21 redemptions', 'BRAND_VERIFIED'], ['arjun', 'Coffee Club launch', 'Customer Response', 'Four customers sent DMs after finding the cafe through the reel.', '4 customer DMs', 'BRAND_VERIFIED'], ['meena', 'Kongu breakfast trail', 'Footfall', 'A local breakfast route brought new faces into three partner kitchens.', '24 verified visits', 'BRAND_VERIFIED'], ['meena', 'Pickle pre-order', 'Purchase / Conversion', 'Story replies turned into pre-orders for a home kitchen.', '17 orders', 'BRAND_VERIFIED'], ['priya', 'Sustainable closet edit', 'Campaign Result', 'A styling story helped a small label understand what customers wanted.', '18 saves to store', 'BRAND_VERIFIED'], ['rahul', 'Launch stream', 'Campaign Result', 'A creator-led launch stream for a new game.', '4.2K views', 'CREATOR_SUBMITTED'], ['karthik', 'Staycation guide', 'Campaign Result', 'A practical local guide drove booking enquiries.', '9 booking enquiries', 'CREATOR_SUBMITTED']
  ].map(([creatorId, title, type, description, result, status]) => ({ _id: id('receipt'), creatorId, title, type, description, date: '2026-06-18', brand: brand.name, campaign: 'Local stories', result, status, visibility: 'Public', evidenceUrl: '' }));
  return {
    users: [{ _id: 'brand-user', email: 'demo@coffeeco.in', role: 'BRAND', profileId: brand._id, passwordHash: bcrypt.hashSync('demo123', 10), createdAt: new Date().toISOString() }, ...creators.map((creator) => ({ _id: `${creator._id}-user`, email: creator.email, role: 'CREATOR', profileId: creator._id, passwordHash: bcrypt.hashSync('demo123', 10), createdAt: new Date().toISOString() }))],
    brands: [brand], creators, receipts,
    announcements: [
      { _id: 'coffee-announcement', brandId: brand._id, title: 'The ₹100 College Food Challenge', brand: brand.name, category: 'Food', location: 'Coimbatore', description: 'Looking for an innovative food advertisement targeting college students. Make a small budget feel like a big story.', budget: '₹10,000', budgetType: 'PAID', duration: '14 days', deadline: '18 Sep 2026', slots: 5, objective: 'Drive weekday student visits', impact: ['Footfall', 'Coupon Redemption'], platform: 'Instagram Reel + Stories' },
      { _id: 'fitzone-announcement', brandId: brand._id, title: 'Move Your Way', brand: 'FitZone Gym', category: 'Lifestyle', location: 'Coimbatore', description: 'Show students and first-jobbers that a gym can feel welcoming, local and fun.', budget: '₹6,000 + membership', budgetType: 'PAID + BARTER', duration: '30 days', deadline: '25 Sep 2026', slots: 3, objective: 'Trial memberships', impact: ['Customer Response', 'Campaign Result'], platform: 'Reels + UGC' },
      { _id: 'threads-announcement', brandId: brand._id, title: 'Made for the everyday', brand: 'Local Threads', category: 'Fashion', location: 'Bengaluru', description: 'A capsule collection story from people who actually wear it.', budget: 'Barter', budgetType: 'BARTER', duration: '21 days', deadline: '02 Oct 2026', slots: 4, objective: 'Collect styling stories', impact: ['Customer Response', 'Word of Mouth'], platform: 'Instagram carousel' }
    ],
    pitches: [
      { _id: 'pitch-basic', announcementId: 'coffee-announcement', creatorId: 'rahul', title: 'A great cup, reviewed', concept: 'A clean 60-second review of the cafe menu with a strong visual hook.', expectedImpact: 'Reach students looking for a new study spot.', budget: '₹2,000', status: 'REJECTED', receipts: 1 },
      { _id: 'pitch-challenge', announcementId: 'coffee-announcement', creatorId: 'arjun', title: '₹100 College Food Challenge', concept: 'I take three students through a full coffee-house meal under ₹100, then let the audience choose the next combo. The coupon becomes the plot twist.', expectedImpact: '30+ verified visits, 50 coupon scans, and a repeatable UGC prompt for campus groups.', budget: '₹2,000', status: 'SHORTLISTED', receipts: 12 },
      { _id: 'pitch-meena', announcementId: 'coffee-announcement', creatorId: 'meena', title: 'The breakfast before class', concept: 'A warm, hyper-local morning route featuring the people, smells and two-minute rituals that make the cafe part of campus life.', expectedImpact: '25 local visits and 15 redemptions in week one.', budget: '₹2,000', status: 'SUBMITTED', receipts: 8 }
    ],
    verifications: [], shortlists: [], collaborations: [{ _id: 'collab-demo', brandId: brand._id, creatorId: 'arjun', campaign: 'Monsoon menu launch', status: 'ACTIVE', budget: '₹8,000', paymentType: 'PAID', progress: 66, milestones: [{ title: 'Concept approved', done: true }, { title: 'Content delivered', done: true }, { title: 'Campaign completed', done: false }] }], vouches: [], messages: [], milestones: []
  };
};

const readStore = () => { try { return JSON.parse(fs.readFileSync(dataFile, 'utf8')); } catch { const initial = seedStore(); fs.writeFileSync(dataFile, JSON.stringify(initial, null, 2)); return initial; } };
let store = readStore();
const saveStore = () => fs.writeFileSync(dataFile, JSON.stringify(store, null, 2));
const hydrateProfiles = () => {
  const before = JSON.stringify(store);
  const creatorSocials = {
    arjun: { instagram: 'https://instagram.com/arjun.eats', youtube: 'https://youtube.com/@arjuneats', x: 'https://x.com/arjuneats' },
    priya: { instagram: 'https://instagram.com/priyamakes', youtube: 'https://youtube.com/@priyamakes', facebook: 'https://facebook.com/priyamakes' },
    rahul: { youtube: 'https://youtube.com/@rahulplays', twitch: 'https://twitch.tv/rahulplays' },
    meena: { instagram: 'https://instagram.com/meenasplate' },
    karthik: { instagram: 'https://instagram.com/roamswithk', youtube: 'https://youtube.com/@roamswithk' }
  };
  const creatorPhones = { arjun: '+91 98765 43210', priya: '+91 98765 43211', rahul: '+91 98765 43212', meena: '+91 98765 43213', karthik: '+91 98765 43214' };
  store.creators.forEach((creator) => { creator.contactEmail ||= creator.email || store.users.find((user) => user.profileId === creator._id)?.email || ''; creator.phone ||= creatorPhones[creator._id] || '+91 90000 00000'; creator.socials ||= creatorSocials[creator._id] || {}; creator.emailVerified ??= Boolean(creator.contactEmail); creator.phoneVerified ??= Boolean(creator.phone); });
  store.brands.forEach((brand) => { brand.contactEmail ||= brand.email || store.users.find((user) => user.profileId === brand._id)?.email || ''; brand.phone ||= '+91 422 245 0188'; brand.socials ||= { instagram: 'https://instagram.com/coimbatorecoffeehouse', facebook: 'https://facebook.com/coimbatorecoffeehouse', website: 'https://coimbatorecoffeehouse.example' }; brand.emailVerified ??= Boolean(brand.contactEmail); brand.phoneVerified ??= Boolean(brand.phone); });
  if (before !== JSON.stringify(store)) saveStore();
};
hydrateProfiles();
const publicUser = (user) => ({ _id: user._id, email: user.email, role: user.role, profileId: user.profileId, createdAt: user.createdAt });
const tokenFor = (user) => jwt.sign({ id: user._id, role: user.role, profileId: user.profileId }, JWT_SECRET, { expiresIn: '7d' });
const findCreator = (key) => store.creators.find((creator) => creator._id === key || creator.userId === key || creator.username === key);
const findBrand = (key) => store.brands.find((brand) => brand._id === key || brand.userId === key);
const publicCreator = (creator) => { if (!creator) return creator; const { email, phone, contactEmail, emailVerified, phoneVerified, ...safe } = creator; return { ...safe, contactVerification: { emailVerified: Boolean(emailVerified), phoneVerified: Boolean(phoneVerified) } }; };
const publicBrand = (brand) => { if (!brand) return brand; const { email, phone, contactEmail, emailVerified, phoneVerified, ...safe } = brand; return { ...safe, contactVerification: { emailVerified: Boolean(emailVerified), phoneVerified: Boolean(phoneVerified) } }; };
const withCreator = (pitch) => ({ ...pitch, creator: findCreator(pitch.creatorId) });
const withCollaboration = (collaboration) => ({ ...collaboration, creator: findCreator(collaboration.creatorId), brand: findBrand(collaboration.brandId)?.name });
const profileForUser = (user) => user?.role === 'CREATOR' ? findCreator(user.profileId) : user?.role === 'BRAND' ? findBrand(user.profileId) : null;
const userForRecipient = (value) => {
  const key = String(value || '').trim().toLowerCase();
  if (!key) return null;
  return store.users.find((user) => [user._id, user.profileId, user.email].some((candidate) => String(candidate || '').toLowerCase() === key))
    || store.users.find((user) => {
      const profile = profileForUser(user);
      return profile && [profile.name, profile.username].some((candidate) => String(candidate || '').toLowerCase() === key);
    });
};
const messageView = (message, currentUserId) => {
  const otherId = message.senderId === currentUserId ? message.recipientId : message.senderId;
  const otherUser = store.users.find((user) => user._id === otherId);
  const profile = profileForUser(otherUser);
  return { ...message, threadId: otherId || message.recipient || 'unknown', direction: message.senderId === currentUserId ? 'sent' : 'received', name: profile?.name || message.recipient || otherUser?.email || 'Campaign partner', image: profile?.image || '', preview: message.text, time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), unread: 0 };
};
const auth = (req, res, next) => { const header = req.headers.authorization || ''; const token = header.startsWith('Bearer ') ? header.slice(7) : ''; if (!token) return res.status(401).json({ message: 'Authentication required.' }); try { const decoded = jwt.verify(token, JWT_SECRET); req.user = store.users.find((user) => user._id === decoded.id); if (!req.user) return res.status(401).json({ message: 'Session expired.' }); next(); } catch { res.status(401).json({ message: 'Invalid or expired session.' }); } };
const requireRole = (expected) => (req, res, next) => req.user?.role === expected ? next() : res.status(403).json({ message: `${expected.toLowerCase()} access required.` });
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

app.get('/api/health', (req, res) => res.json({ ok: true, database: 'json', file: 'server/data/store.json' }));
app.get('/api/notifications', auth, (req, res) => {
  const notifications = [];
  if (req.user.role === 'BRAND') {
    store.pitches.filter((pitch) => store.announcements.some((announcement) => announcement._id === pitch.announcementId && announcement.brandId === req.user.profileId)).slice(-5).forEach((pitch) => notifications.push({ _id: `pitch-${pitch._id}`, type: 'PITCH', title: 'New creative pitch', text: `${findCreator(pitch.creatorId)?.name || 'A creator'} submitted an idea.`, status: pitch.status, createdAt: pitch.createdAt || new Date().toISOString() }));
    store.receipts.filter((receipt) => receipt.status === 'VERIFICATION_REQUESTED' && (!receipt.brand || receipt.brand.toLowerCase() === findBrand(req.user.profileId)?.name?.toLowerCase())).slice(-5).forEach((receipt) => notifications.push({ _id: `receipt-${receipt._id}`, type: 'VERIFICATION', title: 'Receipt needs review', text: `${findCreator(receipt.creatorId)?.name || 'A creator'} requested verification for ${receipt.result}.`, status: receipt.status, createdAt: receipt.date || new Date().toISOString() }));
  } else {
    store.collaborations.filter((collaboration) => collaboration.creatorId === req.user.profileId && collaboration.status === 'REQUESTED').slice(-5).forEach((collaboration) => notifications.push({ _id: `collab-${collaboration._id}`, type: 'COLLABORATION', title: 'New collaboration request', text: `${findBrand(collaboration.brandId)?.name || 'A brand'} invited you to collaborate.`, status: collaboration.status, createdAt: collaboration.createdAt || new Date().toISOString() }));
    store.pitches.filter((pitch) => pitch.creatorId === req.user.profileId && ['SHORTLISTED', 'ACCEPTED', 'REJECTED'].includes(pitch.status)).slice(-5).forEach((pitch) => notifications.push({ _id: `pitch-${pitch._id}`, type: 'PITCH', title: 'Pitch status updated', text: `Your pitch is now ${pitch.status.toLowerCase()}.`, status: pitch.status, createdAt: pitch.updatedAt || pitch.createdAt || new Date().toISOString() }));
  }
  res.json({ notifications: notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10) });
});
app.post('/api/auth/register', asyncRoute(async (req, res) => { const { role, account = {}, profile = {} } = req.body; if (!['BRAND', 'CREATOR'].includes(role)) return res.status(400).json({ message: 'Choose a brand or creator account.' }); if (!account.email || !account.password) return res.status(400).json({ message: 'Email and password are required.' }); if (store.users.some((user) => user.email === account.email.toLowerCase())) return res.status(409).json({ message: 'An account with that email already exists.' }); const profileId = id(role === 'BRAND' ? 'brand' : 'creator'); const user = { _id: id('user'), email: account.email.toLowerCase(), role, profileId, passwordHash: await bcrypt.hash(account.password, 10), createdAt: new Date().toISOString() }; const record = { _id: profileId, userId: user._id, name: role === 'BRAND' ? profile.businessName || 'New business' : profile.creatorName || profile.name || 'New creator', username: profile.username || '', category: profile.category || (role === 'BRAND' ? 'Business' : 'Creator'), location: profile.location || profile.city || 'India', bio: profile.bio || profile.description || '', followers: profile.followers || '0', image: '', data: profile }; store.users.push(user); if (role === 'BRAND') store.brands.push(record); else store.creators.push({ ...record, platforms: [], audience: '', verifiedReceipts: 0, receiptCount: 0, vouches: 0 }); saveStore(); res.status(201).json({ token: tokenFor(user), user: publicUser(user) }); }));
app.post('/api/auth/login', asyncRoute(async (req, res) => { const user = store.users.find((entry) => entry.email === String(req.body.email || '').toLowerCase()); if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Email or password is not quite right.' }); if (req.body.role && user.role !== req.body.role) return res.status(403).json({ message: `This email belongs to a ${user.role === 'BRAND' ? 'brand' : 'creator'} account.` }); res.json({ token: tokenFor(user), user: publicUser(user) }); }));
app.get('/api/auth/me', auth, (req, res) => res.json({ user: publicUser(req.user) }));

app.get('/api/creators', asyncRoute(async (req, res) => { const { q = '', category = '', location = '', impact = '', verified = '' } = req.query; const creators = store.creators.filter((creator) => { const text = `${creator.name} ${creator.category} ${creator.location} ${creator.audience}`.toLowerCase(); const receipts = store.receipts.filter((receipt) => receipt.creatorId === creator._id); return (!q || text.includes(q.toLowerCase())) && (!category || creator.category.toLowerCase().includes(category.toLowerCase())) && (!location || creator.location.toLowerCase().includes(location.toLowerCase())) && (!impact || receipts.some((receipt) => receipt.type.toLowerCase().includes(impact.toLowerCase()))) && (verified !== 'true' || creator.verifiedReceipts > 0); }); res.json({ creators }); }));
app.get('/api/creators/profile', auth, requireRole('CREATOR'), (req, res) => { const creator = findCreator(req.user.profileId); res.json({ creator: { ...creator, receipts: store.receipts.filter((receipt) => receipt.creatorId === creator?._id) } }); });
app.put('/api/creators/profile', auth, requireRole('CREATOR'), (req, res) => { const creator = findCreator(req.user.profileId); if (!creator) return res.status(404).json({ message: 'Creator profile not found.' }); const oldEmail = creator.contactEmail || creator.email; const oldPhone = creator.phone; const allowed = ['name', 'username', 'category', 'location', 'bio', 'audience', 'followers', 'platforms', 'socials', 'contactEmail', 'phone']; Object.entries(req.body || {}).forEach(([key, value]) => { if (allowed.includes(key)) creator[key] = value; }); if (req.body.contactEmail && req.body.contactEmail !== oldEmail) creator.emailVerified = false; if (req.body.phone && req.body.phone !== oldPhone) creator.phoneVerified = false; saveStore(); res.json({ creator: { ...creator, receipts: store.receipts.filter((receipt) => receipt.creatorId === creator._id) } }); });
app.get('/api/creators/:id', asyncRoute(async (req, res) => { const creator = findCreator(req.params.id); if (!creator) return res.status(404).json({ message: 'Creator not found.' }); res.json({ creator: { ...creator, receipts: store.receipts.filter((receipt) => receipt.creatorId === creator._id) } }); }));
app.get('/api/creators/:id/receipts', asyncRoute(async (req, res) => { const creator = findCreator(req.params.id); if (!creator) return res.status(404).json({ message: 'Creator not found.' }); res.json({ receipts: store.receipts.filter((receipt) => receipt.creatorId === creator._id) }); }));
app.post('/api/receipts', auth, requireRole('CREATOR'), asyncRoute(async (req, res) => {
  const { title, type, description, date, brand, campaign, result, visibility = 'Public', evidenceUrl = '' } = req.body;
  if (!title || !type || !description || !result) return res.status(400).json({ message: 'Title, type, description and result are required.' });
  const receipt = { _id: id('receipt'), creatorId: req.user.profileId, title, type, description, date: date || new Date().toISOString().slice(0, 10), brand: brand || '', campaign: campaign || '', result, visibility, evidenceUrl, status: 'CREATOR_SUBMITTED' };
  store.receipts.unshift(receipt);
  const creator = findCreator(req.user.profileId);
  creator.receiptCount = (creator.receiptCount || 0) + 1;
  saveStore();
  res.status(201).json({ receipt });
}));
app.post('/api/receipts/:id/request-verification', auth, requireRole('CREATOR'), asyncRoute(async (req, res) => {
  const receipt = store.receipts.find((entry) => entry._id === req.params.id && entry.creatorId === req.user.profileId);
  if (!receipt) return res.status(404).json({ message: 'Receipt not found.' });
  if (receipt.status === 'BRAND_VERIFIED') return res.status(409).json({ message: 'This receipt is already verified.' });
  receipt.status = 'VERIFICATION_REQUESTED';
  if (!store.verifications.some((entry) => entry.receiptId === receipt._id && entry.decision === 'REQUESTED')) store.verifications.push({ _id: id('verification'), receiptId: receipt._id, creatorId: req.user.profileId, decision: 'REQUESTED', createdAt: new Date().toISOString() });
  saveStore();
  res.json({ receipt });
}));
app.post('/api/receipts/:id/verify', auth, requireRole('BRAND'), asyncRoute(async (req, res) => {
  const receipt = store.receipts.find((entry) => entry._id === req.params.id);
  const brand = findBrand(req.user.profileId);
  if (!receipt) return res.status(404).json({ message: 'Receipt not found.' });
  if (receipt.brand && brand?.name && receipt.brand.toLowerCase() !== brand.name.toLowerCase()) return res.status(403).json({ message: 'This receipt belongs to another business.' });
  const decision = req.body.decision === 'REJECTED' ? 'NOT_VERIFIED' : 'BRAND_VERIFIED';
  const wasVerified = receipt.status === 'BRAND_VERIFIED';
  receipt.status = decision;
  if (decision === 'BRAND_VERIFIED' && !wasVerified) {
    const creator = findCreator(receipt.creatorId);
    if (creator) creator.verifiedReceipts = (creator.verifiedReceipts || 0) + 1;
  }
  store.verifications.push({ _id: id('verification'), receiptId: receipt._id, brandId: req.user.profileId, decision, createdAt: new Date().toISOString() });
  saveStore();
  res.json({ receipt });
}));

app.get('/api/brands/profile', auth, requireRole('BRAND'), (req, res) => res.json({ brand: findBrand(req.user.profileId) }));
app.post('/api/brands/profile', auth, requireRole('BRAND'), (req, res) => res.status(201).json({ brand: findBrand(req.user.profileId) }));
app.put('/api/brands/profile', auth, requireRole('BRAND'), (req, res) => { const brand = findBrand(req.user.profileId); if (!brand) return res.status(404).json({ message: 'Brand profile not found.' }); const oldEmail = brand.contactEmail || brand.email; const oldPhone = brand.phone; const allowed = ['name', 'category', 'location', 'description', 'address', 'latitude', 'longitude', 'socials', 'contactEmail', 'phone', 'image']; Object.entries(req.body || {}).forEach(([key, value]) => { if (allowed.includes(key)) brand[key] = value; }); if (req.body.contactEmail && req.body.contactEmail !== oldEmail) brand.emailVerified = false; if (req.body.phone && req.body.phone !== oldPhone) brand.phoneVerified = false; saveStore(); res.json({ brand }); });
app.post('/api/profile/verify-contact', auth, (req, res) => { const type = req.body?.type; if (!['email', 'phone'].includes(type)) return res.status(400).json({ message: 'Choose email or phone verification.' }); const profile = profileForUser(req.user); if (!profile) return res.status(404).json({ message: 'Profile not found.' }); if (type === 'email' && !(profile.contactEmail || profile.email)) return res.status(400).json({ message: 'Add an email address first.' }); if (type === 'phone' && !profile.phone) return res.status(400).json({ message: 'Add a mobile number first.' }); profile[`${type}Verified`] = true; saveStore(); res.json({ verified: true, type, message: `${type === 'email' ? 'Email' : 'Mobile number'} verified for this prototype.` }); });
app.get('/api/verifications/requests', auth, requireRole('BRAND'), (req, res) => {
  const brand = findBrand(req.user.profileId);
  const receipts = store.receipts.filter((receipt) => receipt.status === 'VERIFICATION_REQUESTED' && (!receipt.brand || !brand?.name || receipt.brand.toLowerCase() === brand.name.toLowerCase())).map((receipt) => ({ ...receipt, creator: findCreator(receipt.creatorId) }));
  res.json({ receipts });
});
app.get('/api/announcements', asyncRoute(async (req, res) => res.json({ announcements: store.announcements })));
app.get('/api/announcements/:id', asyncRoute(async (req, res) => { const announcement = store.announcements.find((entry) => entry._id === req.params.id); if (!announcement) return res.status(404).json({ message: 'Announcement not found.' }); res.json({ announcement }); }));
app.post('/api/announcements', auth, requireRole('BRAND'), asyncRoute(async (req, res) => { const announcement = { _id: id('announcement'), brandId: req.user.profileId, brand: findBrand(req.user.profileId)?.name, ...req.body }; store.announcements.unshift(announcement); saveStore(); res.status(201).json({ announcement }); }));
app.put('/api/announcements/:id', auth, requireRole('BRAND'), (req, res) => { const announcement = store.announcements.find((entry) => entry._id === req.params.id && entry.brandId === req.user.profileId); if (!announcement) return res.status(404).json({ message: 'Announcement not found.' }); Object.assign(announcement, req.body); saveStore(); res.json({ announcement }); });

app.post('/api/announcements/:id/pitches', auth, requireRole('CREATOR'), asyncRoute(async (req, res) => {
  const announcement = store.announcements.find((entry) => entry._id === req.params.id);
  if (!announcement) return res.status(404).json({ message: 'Announcement not found.' });
  if (!req.body.title || !req.body.concept) return res.status(400).json({ message: 'Pitch title and concept are required.' });
  if (store.pitches.some((pitch) => pitch.announcementId === announcement._id && pitch.creatorId === req.user.profileId)) return res.status(409).json({ message: 'You already pitched this announcement.' });
  const pitch = { _id: id('pitch'), announcementId: announcement._id, creatorId: req.user.profileId, title: req.body.title, concept: req.body.concept, story: req.body.story || '', content: req.body.content || '', integration: req.body.integration || '', audience: req.body.audience || '', expectedImpact: req.body.impact || req.body.expectedImpact || '', timeline: req.body.timeline || '', budget: req.body.budget || '', status: 'SUBMITTED', createdAt: new Date().toISOString() };
  store.pitches.push(pitch);
  saveStore();
  res.status(201).json({ pitch: { ...withCreator(pitch), announcement } });
}));
app.get('/api/announcements/:id/pitches', auth, requireRole('BRAND'), (req, res) => {
  const announcement = store.announcements.find((entry) => entry._id === req.params.id);
  if (!announcement) return res.status(404).json({ message: 'Announcement not found.' });
  if (announcement.brandId && announcement.brandId !== req.user.profileId) return res.status(403).json({ message: 'This announcement belongs to another brand.' });
  res.json({ pitches: store.pitches.filter((pitch) => pitch.announcementId === announcement._id).map((pitch) => ({ ...withCreator(pitch), announcement })) });
});
app.put('/api/pitches/:id', auth, requireRole('BRAND'), (req, res) => {
  const pitch = store.pitches.find((entry) => entry._id === req.params.id);
  const announcement = pitch && store.announcements.find((entry) => entry._id === pitch.announcementId);
  const allowed = ['SUBMITTED', 'SHORTLISTED', 'ACCEPTED', 'REJECTED'];
  if (!pitch || !announcement) return res.status(404).json({ message: 'Pitch not found.' });
  if (announcement.brandId && announcement.brandId !== req.user.profileId) return res.status(403).json({ message: 'This pitch belongs to another brand.' });
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Unsupported pitch status.' });
  pitch.status = req.body.status;
  pitch.updatedAt = new Date().toISOString();
  saveStore();
  res.json({ pitch: { ...withCreator(pitch), announcement } });
});
app.get('/api/pitches/mine', auth, requireRole('CREATOR'), (req, res) => {
  res.json({ pitches: store.pitches.filter((pitch) => pitch.creatorId === req.user.profileId).map((pitch) => ({ ...withCreator(pitch), announcement: store.announcements.find((entry) => entry._id === pitch.announcementId) })) });
});
app.post('/api/pitches/:id/reuse', auth, requireRole('CREATOR'), (req, res) => { const pitch = store.pitches.find((entry) => entry._id === req.params.id && entry.creatorId === req.user.profileId); if (!pitch) return res.status(404).json({ message: 'Pitch not found.' }); const source = store.announcements.find((entry) => entry._id === pitch.announcementId); res.json({ pitch, opportunities: store.announcements.filter((entry) => entry._id !== pitch.announcementId && entry.category === source?.category) }); });

app.get('/api/shortlist', auth, requireRole('BRAND'), (req, res) => {
  const shortlist = store.shortlists.filter((entry) => entry.brandId === req.user.profileId).map((entry) => findCreator(entry.creatorId)).filter(Boolean);
  res.json({ shortlist });
});
app.post('/api/shortlist', auth, requireRole('BRAND'), (req, res) => {
  const creator = findCreator(req.body.creatorId);
  if (!creator) return res.status(404).json({ message: 'Creator not found.' });
  const existing = store.shortlists.find((entry) => entry.brandId === req.user.profileId && entry.creatorId === creator._id);
  if (existing) return res.json({ message: 'Creator already shortlisted.', shortlisted: true });
  store.shortlists.push({ _id: id('shortlist'), brandId: req.user.profileId, creatorId: creator._id, createdAt: new Date().toISOString() });
  saveStore();
  res.status(201).json({ message: 'Creator shortlisted.', shortlisted: true });
});

app.delete('/api/shortlist/:creatorId', auth, requireRole('BRAND'), (req, res) => {
  const before = store.shortlists.length;
  store.shortlists = store.shortlists.filter((entry) => !(entry.brandId === req.user.profileId && entry.creatorId === req.params.creatorId));
  if (store.shortlists.length === before) return res.status(404).json({ message: 'Creator is not on your shortlist.' });
  saveStore();
  res.json({ message: 'Creator removed from shortlist.' });
});
app.get('/api/collaborations', auth, asyncRoute(async (req, res) => res.json({ collaborations: store.collaborations.filter((entry) => req.user.role === 'BRAND' ? entry.brandId === req.user.profileId : entry.creatorId === req.user.profileId).map(withCollaboration) })));
app.post('/api/collaborations', auth, requireRole('BRAND'), asyncRoute(async (req, res) => {
  const creator = findCreator(req.body.creatorId);
  if (!creator) return res.status(404).json({ message: 'Creator not found.' });
  if (!req.body.campaign) return res.status(400).json({ message: 'Campaign is required.' });
  if (store.collaborations.some((entry) => entry.brandId === req.user.profileId && entry.creatorId === creator._id && entry.campaign === req.body.campaign && ['REQUESTED', 'ACTIVE'].includes(entry.status))) return res.status(409).json({ message: 'This collaboration request already exists.' });
  const collaboration = { _id: id('collaboration'), brandId: req.user.profileId, creatorId: creator._id, campaign: req.body.campaign, status: 'REQUESTED', budget: req.body.budget || '', paymentType: req.body.paymentType || 'PAID', deliverables: req.body.deliverables || '', deadline: req.body.deadline || '', message: req.body.message || '', progress: 0, milestones: req.body.milestones || [{ title: 'Brief accepted', done: false }, { title: 'Content delivered', done: false }, { title: 'Campaign completed', done: false }], createdAt: new Date().toISOString() };
  store.collaborations.push(collaboration);
  saveStore();
  res.status(201).json({ collaboration: withCollaboration(collaboration) });
}));
app.put('/api/collaborations/:id', auth, (req, res) => {
  const collaboration = store.collaborations.find((entry) => entry._id === req.params.id);
  if (!collaboration) return res.status(404).json({ message: 'Collaboration not found.' });
  const isBrand = req.user.role === 'BRAND' && collaboration.brandId === req.user.profileId;
  const isCreator = req.user.role === 'CREATOR' && collaboration.creatorId === req.user.profileId;
  if (!isBrand && !isCreator) return res.status(403).json({ message: 'You do not have access to this collaboration.' });
  const nextStatus = req.body.status;
  if (isCreator && !['ACCEPTED', 'DECLINED'].includes(nextStatus)) return res.status(400).json({ message: 'Creators can accept or decline a request.' });
  if (isCreator && collaboration.status !== 'REQUESTED') return res.status(409).json({ message: 'This request is no longer awaiting a response.' });
  if (isBrand && nextStatus && !['REQUESTED', 'ACTIVE', 'COMPLETED'].includes(nextStatus)) return res.status(400).json({ message: 'Unsupported collaboration status.' });
  if (nextStatus) collaboration.status = nextStatus;
  if (collaboration.status === 'ACCEPTED') { collaboration.status = 'ACTIVE'; collaboration.progress = 10; collaboration.milestones = collaboration.milestones.map((milestone, index) => ({ ...milestone, done: index === 0 })); }
  if (collaboration.status === 'DECLINED') collaboration.progress = 0;
  if (isBrand && Array.isArray(req.body.milestones)) collaboration.milestones = req.body.milestones;
  saveStore();
  res.json({ collaboration: withCollaboration(collaboration) });
});
app.post('/api/collaborations/:id/complete', auth, requireRole('BRAND'), (req, res) => {
  const collaboration = store.collaborations.find((entry) => entry._id === req.params.id && entry.brandId === req.user.profileId);
  if (!collaboration) return res.status(404).json({ message: 'Collaboration not found.' });
  if (collaboration.status !== 'ACTIVE') return res.status(409).json({ message: 'Only an active collaboration can be completed.' });
  collaboration.status = 'COMPLETED';
  collaboration.progress = 100;
  collaboration.milestones = collaboration.milestones.map((milestone) => ({ ...milestone, done: true }));
  collaboration.completedAt = new Date().toISOString();
  saveStore();
  res.json({ collaboration: withCollaboration(collaboration) });
});
app.post('/api/collaborations/:id/vouch', auth, (req, res) => {
  const collaboration = store.collaborations.find((entry) => entry._id === req.params.id);
  const isParticipant = collaboration && ((req.user.role === 'BRAND' && collaboration.brandId === req.user.profileId) || (req.user.role === 'CREATOR' && collaboration.creatorId === req.user.profileId));
  const text = String(req.body.text || '').trim();
  if (!collaboration) return res.status(404).json({ message: 'Collaboration not found.' });
  if (!isParticipant) return res.status(403).json({ message: 'You do not have access to this collaboration.' });
  if (collaboration.status !== 'COMPLETED') return res.status(400).json({ message: 'Complete the collaboration before leaving a vouch.' });
  if (!text) return res.status(400).json({ message: 'Write a short vouch before publishing.' });
  if (store.vouches.some((entry) => entry.collaborationId === collaboration._id && (entry.userId === req.user._id || (!entry.userId && req.user.role === 'BRAND')))) return res.status(409).json({ message: 'You have already published a vouch for this collaboration.' });
  const vouch = { _id: id('vouch'), userId: req.user._id, collaborationId: collaboration._id, brandId: collaboration.brandId, creatorId: collaboration.creatorId, text: text.slice(0, 1000), createdAt: new Date().toISOString() };
  store.vouches.push(vouch);
  const creator = findCreator(collaboration.creatorId);
  if (creator) creator.vouches = (creator.vouches || 0) + 1;
  saveStore();
  res.status(201).json({ vouch });
});

app.get('/api/messages', auth, (req, res) => {
  const messages = store.messages.filter((message) => message.senderId === req.user._id || message.recipientId === req.user._id).map((message) => messageView(message, req.user._id));
  res.json({ messages });
});
app.post('/api/messages', auth, (req, res) => {
  const recipient = userForRecipient(req.body.recipientId || req.body.recipient || req.body.name);
  const text = String(req.body.text || '').trim();
  if (!recipient) return res.status(400).json({ message: 'Choose a valid campaign partner.' });
  if (!text) return res.status(400).json({ message: 'Message cannot be empty.' });
  if (recipient._id === req.user._id) return res.status(400).json({ message: 'You cannot message your own account.' });
  const message = { _id: id('message'), senderId: req.user._id, recipientId: recipient._id, recipient: profileForUser(recipient)?.name || recipient.email, campaign: req.body.campaign || 'Campaign context', text: text.slice(0, 2000), createdAt: new Date().toISOString() };
  store.messages.push(message);
  saveStore();
  res.status(201).json({ message: messageView(message, req.user._id) });
});

const upload = multer({ storage: multer.diskStorage({ destination: uploadDir, filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-')}`) }), limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => cb(null, ['image/png', 'image/jpeg', 'application/pdf'].includes(file.mimetype)) });
app.post('/api/uploads', auth, upload.single('file'), (req, res) => { if (!req.file) return res.status(400).json({ message: 'Choose a PNG, JPG or PDF under 5MB.' }); res.status(201).json({ url: `/uploads/${req.file.filename}`, name: req.file.originalname, type: req.file.mimetype }); });
app.use((error, req, res, next) => { if (error instanceof multer.MulterError || error?.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'File is too large. Keep uploads under 5MB.' }); console.error(error); res.status(500).json({ message: error.message || 'The matchroom hit an unexpected issue.' }); });
app.listen(PORT, () => console.log(`Sponsor Match API listening on http://localhost:${PORT} · JSON data at ${dataFile}`));
