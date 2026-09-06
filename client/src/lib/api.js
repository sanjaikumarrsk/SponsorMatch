const request = async (path, options = {}) => {
  const headers = { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) };
  const token = localStorage.getItem('sponsor_match_token');
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(path, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) throw new Error(data?.message || 'Something went wrong.');
  return data;
};

export const api = {
  request,
  me: () => request('/api/auth/me'),
  notifications: () => request('/api/notifications'),
  login: (body) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  creators: (query = '') => request(`/api/creators${query ? `?${query}` : ''}`),
  creator: (id) => request(`/api/creators/${id}`),
  creatorProfile: () => request('/api/creators/profile'),
  updateCreatorProfile: (body) => request('/api/creators/profile', { method: 'PUT', body: JSON.stringify(body) }),
  receipts: (id) => request(`/api/creators/${id}/receipts`),
  createReceipt: (body) => request('/api/receipts', { method: 'POST', body: JSON.stringify(body) }),
  requestVerification: (id) => request(`/api/receipts/${id}/request-verification`, { method: 'POST' }),
  verifyReceipt: (id, decision) => request(`/api/receipts/${id}/verify`, { method: 'POST', body: JSON.stringify({ decision }) }),
  announcements: () => request('/api/announcements'),
  brandProfile: () => request('/api/brands/profile'),
  updateBrandProfile: (body) => request('/api/brands/profile', { method: 'PUT', body: JSON.stringify(body) }),
  verifyContact: (type) => request('/api/profile/verify-contact', { method: 'POST', body: JSON.stringify({ type }) }),
  announcement: (id) => request(`/api/announcements/${id}`),
  createAnnouncement: (body) => request('/api/announcements', { method: 'POST', body: JSON.stringify(body) }),
  pitches: (announcementId) => request(`/api/announcements/${announcementId}/pitches`),
  myPitches: () => request('/api/pitches/mine'),
  createPitch: (announcementId, body) => request(`/api/announcements/${announcementId}/pitches`, { method: 'POST', body: JSON.stringify(body) }),
  updatePitch: (id, status) => request(`/api/pitches/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  reusePitch: (id) => request(`/api/pitches/${id}/reuse`, { method: 'POST' }),
  collaborations: () => request('/api/collaborations'),
  createCollaboration: (body) => request('/api/collaborations', { method: 'POST', body: JSON.stringify(body) }),
  updateCollaboration: (id, body) => request(`/api/collaborations/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  completeCollaboration: (id) => request(`/api/collaborations/${id}/complete`, { method: 'POST' }),
  leaveVouch: (id, body) => request(`/api/collaborations/${id}/vouch`, { method: 'POST', body: JSON.stringify(body) }),
  messages: () => request('/api/messages'),
  sendMessage: (body) => request('/api/messages', { method: 'POST', body: JSON.stringify(body) }),
  shortlist: () => request('/api/shortlist'),
  addShortlist: (creatorId) => request('/api/shortlist', { method: 'POST', body: JSON.stringify({ creatorId }) }),
  removeShortlist: (creatorId) => request(`/api/shortlist/${creatorId}`, { method: 'DELETE' }),
  verificationRequests: () => request('/api/verifications/requests'),
  upload: (file) => { const body = new FormData(); body.append('file', file); return request('/api/uploads', { method: 'POST', body }); }
};
