You are the lead full-stack engineer, UI/UX designer, 3D web developer, and product architect for a 24-hour hackathon project called **Sponsor Match**.

Your task is to BUILD the complete working full-stack website, not just provide suggestions, wireframes, pseudocode, or a static mockup.

The application must be professional, colorful, interactive, polished, responsive, and visually impressive, with tasteful 3D animations throughout.

Do not ask me to manually design the pages. Make the design decisions yourself while following every requirement below.

==================================================

1. PRODUCT
   ==================================================

Product name:

# SPONSOR MATCH

Core concept:

Sponsor Match connects brands/businesses with content creators/influencers for sponsorship opportunities.

Our innovation is based on:

# PROVE. CREATE. COLLABORATE.

The system should allow creators to prove their previous impact, show brands what they can create, and make collaborations easier and safer.

Our main innovation is:

# RECEIPTS, NOT REACH

Instead of evaluating creators only through followers, likes, and views, creators can showcase evidence of real-world impact.

Examples:

* Customer DMs
* Coupon redemptions
* Footfall
* Business testimonials
* Purchase/conversion evidence
* Previous campaign results
* Screenshots
* Photos
* Other legitimate evidence

Followers still exist as secondary information. DO NOT completely remove follower count.

A creator with 2,000 followers and strong verified impact should be able to compete with a creator with 50,000 followers and little/no proof.

==================================================
2. TECHNOLOGY STACK
===================

Frontend:

* React.js
* Vite
* JavaScript or TypeScript
* React Router
* Tailwind CSS or another clean component styling system
* Three.js / React Three Fiber for 3D
* Framer Motion for UI animation where appropriate

Backend:

* Node.js
* Express.js

Database:

* MongoDB
* Mongoose

Authentication:

* JWT-based authentication
* Secure password hashing
* Role-based authentication

Roles:

1. BRAND
2. CREATOR / INFLUENCER

The architecture must clearly separate the two experiences.

Recommended project structure:

/client
/server

Keep frontend and backend modular and maintainable.

==================================================
3. IMPORTANT VISUAL DIRECTION
=============================

THIS IS EXTREMELY IMPORTANT.

Do NOT make this a generic dashboard.

Do NOT use:

* Dark theme
* Black neon UI
* Cyberpunk aesthetic
* Purple/blue neon gradients everywhere
* Hacker-style interface
* Excessive glassmorphism
* Cheap-looking template UI

The website must be:

* Professional
* Colorful
* Premium
* Bright
* Modern
* Friendly
* Interactive
* Creative
* 3D animated
* Business-ready

Think:

Modern startup website + premium creator platform + interactive 3D world.

Use a bright professional color system.

Possible palette direction:

* White / warm white backgrounds
* Soft blue
* Coral
* Orange
* Yellow
* Green
* Sky blue
* Subtle gradients

Do not overuse colors.

Animations should feel smooth and expensive, not distracting.

==================================================
4. 3D WORLD CONCEPT
===================

The website should feel like Sponsor Match is a living world where brands and creators exist together.

Use tasteful 3D assets/scenes such as:

* Shops
* Cafés
* Restaurants
* Small businesses
* Office buildings
* Creator studios
* Cameras
* Smartphones
* Vlogging equipment
* Influencers/creator characters
* Delivery/store elements
* Advertising boards
* Social-media-inspired visual objects

The 3D scene should communicate:

BRANDS ↔ CREATORS ↔ SPONSORSHIPS

Do NOT make the website look like a video game.

The 3D environment should be professional and illustrative.

Use:

* Slow camera movement
* Hover animations
* Floating objects
* Scroll-based movement
* Subtle parallax
* Object rotations
* Interactive hotspots
* Smooth transitions

Optimize 3D performance.

Lazy-load heavy 3D assets.

Use fallbacks if WebGL is unavailable.

==================================================
5. PAGE 1 — LANDING / HOME PAGE
===============================

This is the first page.

It must immediately impress judges.

Hero slogan:

# "Don't Just Show Your Reach. Show Your Impact."

Supporting statement:

"Where brands discover creators through proven impact and bold ideas."

Primary CTA:

# GET STARTED

Secondary CTA:

# EXPLORE HOW IT WORKS

The hero should contain a beautiful interactive 3D environment.

Visual idea:

A colorful miniature business district.

Include:

* Café
* Restaurant
* Clothing shop
* Gym
* Small business buildings
* Creator studio
* Creator/influencer character
* Camera
* Smartphone
* Social content floating around creators

Create a visual relationship between:

Brand building → campaign → creator → content → customers.

When the user moves the mouse:

* buildings respond subtly
* creator character moves
* floating campaign cards animate
* camera rotates
* small UI cards appear

When scrolling:

* camera transitions through the 3D world
* different parts of the Sponsor Match ecosystem are revealed

Sections below hero:

1. Problem
2. How Sponsor Match works
3. Receipts, Not Reach
4. Brand Announcements
5. Creative Pitches
6. Brand Verification
7. Community Vouching
8. Second-Chance Pitch
9. Creator Bundles
10. Barter Match
11. Milestone Collaboration
12. Final CTA

The landing page should feel like a product story rather than a boring corporate page.

==================================================
6. GET STARTED FLOW
===================

When the user presses:

GET STARTED

Navigate to:

/auth

The authentication page must NOT immediately look like a boring login form.

It should contain the same Sponsor Match 3D world.

Split the screen visually into two paths:

LEFT:

🏪 I'M A BRAND

RIGHT:

🎥 I'M A CREATOR

Both sides should have different animated 3D environments.

Brand side:

* Shop
* Café
* Restaurant
* Office
* Product boxes
* Storefront
* Campaign board

Creator side:

* Creator studio
* Camera
* Smartphone
* Ring light
* Vlogging equipment
* Creator character
* Content cards
* Camera movement

The user selects:

BRAND

or

CREATOR / INFLUENCER

Then the interface transitions smoothly into the appropriate login/register path.

==================================================
7. AUTHENTICATION
=================

Provide:

LOGIN

REGISTER

Forgot password UI

Role selection.

A user cannot accidentally enter the wrong dashboard.

After authentication:

BRAND → /brand/dashboard

CREATOR → /creator/dashboard

Implement real backend authentication.

Store:

* hashed password
* role
* profile
* timestamps

Use JWT.

Protect private routes.

==================================================
8. BRAND REGISTRATION — DETAILED
================================

When BRAND is selected, do NOT create a simple 3-field registration.

Create a professional multi-step business onboarding process.

Step 1 — Account

* Owner name
* Email
* Phone
* Password
* Confirm password

Step 2 — Business Identity

* Business name
* Business type
* Category
* Subcategory
* Description
* Business logo
* Cover image
* Website
* Social media links
* Business registration information if applicable

Step 3 — Location

Collect detailed location information.

Fields:

* Country
* State
* City
* Area
* Street
* Building/shop number
* Pincode
* Landmark

Include an interactive map.

The brand should be able to:

* Search location
* Select location
* Move a map marker
* Confirm exact business location

Store:

* latitude
* longitude
* formatted address

This location will later be used for creator discovery and local campaigns.

Step 4 — Business Details

Collect:

* Products/services
* Price range
* Target customers
* Target age group
* Target gender if relevant
* Target location
* Business size
* Operating hours
* Languages
* Delivery availability
* Online/offline
* Preferred social platforms

Step 5 — Sponsorship Preferences

Ask:

* Preferred creator categories
* Preferred creator size
* Preferred locations
* Campaign type
* Budget range
* Paid / barter / both
* Preferred content types
* Preferred campaign duration
* Preferred audience
* Preferred impact type

Step 6 — Brand Verification

Allow the brand to provide basic verification information.

Do NOT build a complicated legal verification system for the prototype.

Step 7 — Preview

Show:

"Your Brand Profile"

Allow the business owner to review before completing setup.

After completion:

"Welcome to Sponsor Match."

Animate the transition into the brand dashboard.

==================================================
9. CREATOR REGISTRATION — DETAILED
==================================

When CREATOR / INFLUENCER is selected, create a completely different onboarding experience.

The visual theme should feel like a premium creator studio.

Use:

* Creator character
* Camera
* Vlogging setup
* Content thumbnails
* Social media cards
* Studio lighting
* Photos/videos

Creator onboarding:

Step 1 — Account

* Name
* Email
* Phone
* Password
* Confirm password

Step 2 — Creator Identity

* Creator name
* Username
* Profile photo
* Bio
* Creator category
* Subcategories
* Location
* Languages
* Content platforms

Step 3 — Social Presence

Allow:

* Instagram
* YouTube
* TikTok
* Facebook
* X
* Other platforms

Collect:

* Profile URL
* Followers
* Average views
* Average engagement
* Content type

Follower count is secondary.

DO NOT make it the hero metric.

Step 4 — Audience

Collect:

* Audience location
* Audience age groups
* Audience interests
* Primary audience category
* Local/global audience
* Preferred campaign categories

Step 5 — Previous Work

Creator can add:

* Previous campaigns
* Content examples
* Portfolio links
* Images
* Video links
* Campaign descriptions

==================================================
10. RECEIPTS SYSTEM — MOST IMPORTANT CREATOR FEATURE
====================================================

This is the CORE DIFFERENTIATOR.

Create a major section:

# MY RECEIPTS

The creator should be able to add evidence of real-world impact.

Receipt types:

1. Footfall
2. Coupon Redemption
3. Customer Response
4. Purchase / Conversion
5. Business Testimonial
6. Campaign Result
7. Word of Mouth
8. Other

Each receipt should contain:

* Receipt title
* Receipt type
* Description
* Date
* Related brand/business
* Campaign name
* Result/value
* Screenshot
* Image
* Optional additional evidence
* Visibility
* Verification status

Example:

TITLE:
"Restaurant Campaign — 32 Customer Visits"

TYPE:
Footfall

DESCRIPTION:
"My Instagram Reel helped generate 32 visits during the campaign week."

EVIDENCE:
Uploaded image/screenshot

STATUS:
Creator Submitted

==================================================
11. RECEIPT VERIFICATION
========================

Every creator-submitted receipt starts as:

⚪ CREATOR SUBMITTED

The creator can request verification from the relevant brand/business.

The brand receives:

"Creator X claims this campaign generated 32 customer visits."

Buttons:

CONFIRM

REJECT

If confirmed:

🟢 BRAND VERIFIED

If rejected:

🔴 NOT VERIFIED

Display verification clearly on the creator profile.

Do NOT pretend screenshots are automatically authentic.

The prototype should demonstrate the verification workflow.

==================================================
12. CREATOR PROFILE
===================

The creator profile should feel like a premium creator portfolio.

Top section:

* Creator photo
* Creator name
* Category
* Location
* Followers
* Platforms
* Short bio

But immediately emphasize:

# IMPACT

Then:

### RECEIPTS

Cards showing:

* Result
* Evidence
* Type
* Verification badge

Then:

### VERIFIED VOUCHES

Show brand endorsements.

Then:

### PREVIOUS WORK

Visual content portfolio.

Then:

### PITCHES

Past successful pitches.

Make this page visually impressive.

==================================================
13. COMMUNITY VOUCHING
======================

After a successful collaboration, the brand can leave a vouch.

Example:

"Arjun delivered the campaign on time and generated excellent customer response."

Show:

🤝 VERIFIED COLLABORATION VOUCH

Brand name

Date

Campaign

Vouch text

A vouch must be tied to a real collaboration record in our system.

This answers:

"Can this creator actually be trusted to work professionally?"

Receipts answer:

"Can this creator create results?"

Vouches answer:

"Can this creator be trusted to deliver?"

==================================================
14. BRAND DASHBOARD
===================

The brand dashboard should have a premium business environment.

Use a 3D storefront/business scene in the background or as a hero visual.

Dashboard sections:

* Overview
* Find Creators
* Announcements
* Pitches
* Shortlist
* Collaboration Requests
* Messages
* Campaigns
* Verification Requests
* Brand Profile

Top metrics:

* Active Campaigns
* Pending Pitches
* Shortlisted Creators
* Collaborations
* Verified Creator Results

Do NOT create unnecessary analytics.

==================================================
15. BRAND ANNOUNCEMENTS
=======================

Brand can create:

# NEW SPONSORSHIP ANNOUNCEMENT

Fields:

* Campaign title
* Description
* Category
* Subcategory
* Location
* Target audience
* Campaign objective
* Content required
* Platform
* Campaign duration
* Deadline
* Budget
* Paid / Barter / Both
* Number of creators required
* Single creator / Multiple creators
* Desired impact
* Required receipt types
* Additional requirements

Example:

"Looking for an innovative food campaign targeting college students in Coimbatore."

Announcement becomes publicly discoverable to creators.

==================================================
16. CREATOR OPPORTUNITY DISCOVERY
=================================

Creators should have:

# OPPORTUNITIES FOR YOU

Show announcements relevant to their:

* Category
* Location
* Audience
* Previous work
* Impact/receipts
* Platform
* Campaign type

For the 24-hour prototype, this matching can be rule-based.

DO NOT waste time building advanced AI.

Do not falsely claim sophisticated AI matching.

The UI can still clearly explain why an opportunity is relevant.

Example:

"Relevant because:
✓ Food creator
✓ Coimbatore
✓ College audience
✓ Previous restaurant campaign
✓ Verified footfall receipt"

==================================================
17. CREATIVE PITCH SUBMISSION
=============================

Creators can open an announcement.

Show:

CAMPAIGN REQUIREMENT

Then:

# SUBMIT YOUR CREATIVE PITCH

Fields:

* Pitch title
* Concept
* Story
* What content will be created
* Brand integration
* Target audience
* Execution plan
* Expected impact
* Content format
* Timeline
* Price/request
* Relevant previous work
* Relevant receipts
* Optional moodboard/image
* Optional pitch presentation/PDF upload

The pitch should feel like a mini creative proposal.

Do not make it a boring text form.

Show a visual pitch preview.

==================================================
18. BRAND PITCH COMPARISON
==========================

This should be a major judge-demo screen.

Brand opens:

# CAMPAIGN PITCHES

Show creator pitches side by side.

Each pitch displays:

* Creator
* Followers
* Idea
* Expected impact
* Relevant receipts
* Verified receipts
* Vouches
* Previous work
* Proposed budget

The brand can:

SHORTLIST

REQUEST COLLABORATION

REJECT

SELECT

Make it visually clear that follower count is only one small piece of information.

==================================================
19. SECOND-CHANCE PITCH
=======================

If a pitch is rejected, show:

"Your pitch wasn't selected."

Then:

# ♻️ REUSE THIS PITCH

Find similar active announcements.

Show:

"Your pitch may fit these opportunities."

Creator can:

* Reuse
* Edit
* Submit

Flow:

Rejected Pitch
→ Reuse Pitch
→ Similar Brand Opportunities
→ Adapt
→ Resubmit

This helps prevent creators from wasting their creative effort.

==================================================
20. SPLIT / BUNDLE COLLABORATIONS
=================================

Brands can choose:

SINGLE CREATOR

or

MULTIPLE CREATORS

Example:

Campaign Budget:
₹10,000

5 creator slots

₹2,000 per creator

Show a visual bundle.

Possible creators:

* Food creator
* College creator
* Lifestyle creator
* Local creator
* Meme creator

Brand can select multiple creators.

This helps small creators participate in campaigns that would otherwise go to one large influencer.

==================================================
21. BARTER MATCH
================

Brand can select:

PAID

BARTER

PAID + BARTER

For barter:

Example:

"Café offers free meals for 30 days in exchange for promotional content."

Creators can filter opportunities by:

* Paid
* Barter
* Both

Make barter opportunities visually distinct.

==================================================
22. MILESTONE COLLABORATION
===========================

A collaboration can contain milestones.

Example:

Campaign:
₹10,000

Milestone 1:
Content Delivered

Milestone 2:
Campaign Completed

Show a visual progress tracker.

For the prototype:

DO NOT implement real payment escrow.

Only demonstrate the workflow/status.

==================================================
23. SEARCH BY RECEIPTS
======================

Brand must have a creator discovery page.

Search/filter:

* Category
* Location
* Platform
* Audience
* Followers
* Receipt type
* Verified receipts
* Vouches
* Availability if implemented
* Paid/barter preference

MOST IMPORTANT:

Include a filter:

# SEARCH BY IMPACT

Examples:

☐ Proven Footfall
☐ Coupon Conversions
☐ Customer Responses
☐ Business Testimonials
☐ Purchase/Conversion
☐ Campaign Results

This is the core of:

# RECEIPTS, NOT REACH

==================================================
24. CREATOR SEARCH RESULT CARD
==============================

Do NOT make a normal influencer card dominated by:

"50K FOLLOWERS"

Instead:

Creator Name

Category

Location

Followers: 2.1K

### IMPACT

🧾 12 Receipts

🟢 7 Brand Verified

🤝 4 Verified Vouches

Example:

"32 verified visits"

This should visually communicate:

PROOF > POPULARITY

==================================================
25. COLLABORATION REQUEST
=========================

Brand can click:

REQUEST COLLABORATION

Request contains:

* Campaign
* Creator
* Deliverables
* Budget
* Payment/barter
* Deadline
* Milestones
* Message

Creator can:

ACCEPT

DECLINE

After acceptance:

COLLABORATION ACTIVE

==================================================
26. COLLABORATION COMPLETION
============================

After campaign:

Brand marks:

CAMPAIGN COMPLETED

Then:

* Creator can add receipt
* Brand can verify receipt
* Brand can leave vouch

This creates:

Collaboration
→ Impact
→ Receipt
→ Verification
→ Vouch
→ Stronger Creator Profile

==================================================
27. MESSAGING
=============

Build only a simple messaging system.

Features:

* Conversation list
* Basic chat
* Send message
* Campaign context

Do NOT build a WhatsApp clone.

==================================================
28. BRAND PROFILE
=================

Brand profile should include:

* Business name
* Logo
* Cover image
* Category
* Description
* Location
* Map
* Products/services
* Target audience
* Social links
* Sponsorship preferences
* Active announcements
* Past collaborations
* Creator vouches if appropriate

Make location visually prominent.

==================================================
29. MAP
=======

Because brands provide detailed shop/business locations, integrate an interactive map.

Use a practical map solution appropriate for a prototype.

Brand profile should show:

📍 Exact business location

Creator discovery can optionally use:

"Creators near this business."

Do not build complicated geolocation infrastructure.

==================================================
30. DATABASE DESIGN
===================

Create Mongoose models for at least:

User
BrandProfile
CreatorProfile
Receipt
ReceiptVerification
Announcement
Pitch
Shortlist
Collaboration
Vouch
Message
Milestone

Relationships should be clean.

Every protected resource must verify the user's role/ownership.

==================================================
31. API DESIGN
==============

Create REST APIs.

Examples:

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

Brand:

POST /api/brands/profile
GET /api/brands/profile
PUT /api/brands/profile

Announcements:

POST /api/announcements
GET /api/announcements
GET /api/announcements/:id
PUT /api/announcements/:id

Creators:

GET /api/creators
GET /api/creators/:id
GET /api/creators/search

Receipts:

POST /api/receipts
GET /api/creators/:id/receipts
POST /api/receipts/:id/verify
POST /api/receipts/:id/request-verification

Pitches:

POST /api/announcements/:id/pitches
GET /api/announcements/:id/pitches
PUT /api/pitches/:id
POST /api/pitches/:id/reuse

Collaboration:

POST /api/collaborations
PUT /api/collaborations/:id
POST /api/collaborations/:id/complete

Vouches:

POST /api/collaborations/:id/vouch

Shortlist:

POST /api/shortlist
GET /api/shortlist

Messages:

GET /api/messages
POST /api/messages

==================================================
32. DEMO DATA
=============

Seed realistic demo data.

Create at least:

5 creators

Examples:

1. Arjun — Food Creator — 2.1K followers
2. Priya — Lifestyle Creator — 8.4K followers
3. Rahul — Gaming Creator — 12K followers
4. Meena — Local Food Creator — 1.3K followers
5. Karthik — Travel Creator — 5.7K followers

Give them realistic receipts.

Example:

Arjun:

* 32 verified restaurant visits
* 21 coupon redemptions
* 4 customer DMs
* 3 brand vouches

Also create larger creators with fewer/no verified receipts.

This is important for the judge demo.

Create brands:

* Coimbatore Coffee House
* Urban Bites
* FitZone Gym
* Local Threads
* TechNest

Create announcements.

Create multiple pitches.

Create collaborations.

Create verified/unverified receipts.

==================================================
33. JUDGE DEMO SCENARIO
=======================

The UI must support this exact demonstration.

Scenario:

A local café needs a creator.

First show:

Traditional discovery:

Creator A:
50K followers
No verified impact

Creator B:
2K followers
12 receipts
7 verified

Then activate:

# SEARCH BY IMPACT

Filter:

FOOTFALL

Creator B appears prominently.

Open Creator B.

Show:

🧾 32 verified visits

🟢 Brand Verified

🤝 4 verified vouches

Then go to:

Brand Announcement.

Show:

"Looking for an innovative food advertisement targeting college students."

Show creator pitches.

One creator proposes:

"Basic restaurant review."

Another proposes:

"₹100 College Food Challenge."

Show receipts and expected impact.

Brand selects the better pitch.

Then demonstrate:

Collaboration
→ Milestone
→ Completion
→ Vouch
→ New Receipt

This should be possible entirely through the UI.

==================================================
34. LANDING PAGE FINAL SLOGANS
==============================

Primary:

# "Don't Just Show Your Reach. Show Your Impact."

Secondary:

# "Prove What You've Done. Pitch What You Can Create."

Another supporting line:

# "Where brands discover creators through proof, ideas, and trust."

Final CTA:

# "Find Your Next Collaboration"

==================================================
35. UI/UX QUALITY REQUIREMENTS
==============================

Every page must have:

* Responsive design
* Smooth transitions
* Loading states
* Empty states
* Error states
* Success feedback
* Hover states
* Tooltips where useful
* Toast notifications
* Form validation
* Accessible buttons
* Keyboard-friendly navigation

No broken buttons.

No placeholder "Lorem ipsum."

No generic "Feature 1 / Feature 2."

Use realistic content.

==================================================
36. 3D PERFORMANCE
==================

Do NOT put huge 3D models everywhere.

Use 3D strategically:

Landing hero
Authentication
Brand dashboard hero
Creator dashboard hero
Important transitions

Use 2D images/cards elsewhere.

3D should improve storytelling, not destroy performance.

Use:

* lazy loading
* compressed assets
* optimized geometry
* reasonable polygon counts
* fallback illustrations

==================================================
37. FILE UPLOADS
================

Receipts must support image/screenshot upload.

Pitch should support optional:

* PDF
* image
* moodboard

For the hackathon prototype, local/server storage is acceptable.

Do not spend most of the 24 hours building production-grade cloud storage.

==================================================
38. SECURITY
============

Implement basic proper security:

* Password hashing
* JWT authentication
* Protected routes
* Role authorization
* Input validation
* File type validation
* File size limits
* Never return passwords
* Basic CORS configuration
* Environment variables

Use:

.env

for secrets.

Never hardcode secrets.

==================================================
39. RESPONSIVE DESIGN
=====================

Desktop must be the strongest experience because of the hackathon demo.

Also support:

* Tablet
* Mobile

The 3D scene should degrade gracefully on smaller devices.

==================================================
40. DEVELOPMENT PRIORITY
========================

If time becomes limited, prioritize in this exact order:

1. Authentication
2. Creator profile
3. Receipt system
4. Brand verification
5. Brand creator search by receipt
6. Brand announcement
7. Creator pitch
8. Pitch comparison
9. Collaboration
10. Community vouch
11. Second-Chance Pitch
12. Bundle collaboration
13. Barter
14. Milestones
15. Messaging
16. Extra animations

Do NOT sacrifice the core innovation for secondary features.

==================================================
41. WHAT NOT TO BUILD
=====================

Do NOT build:

* AI fake screenshot detection
* Blockchain
* Real payment escrow
* Complex recommendation AI
* Advanced analytics
* Follower growth analytics
* Full social network
* Full video editor
* Full chat application
* Complex contract management
* Complex payment gateway

These are not necessary for the hackathon.

==================================================
42. IMPORTANT PRODUCT PRINCIPLE
===============================

The website must NOT feel like:

"Another influencer marketplace."

The visual and functional identity must communicate:

Traditional:

Followers → Reach → Sponsorship

Sponsor Match:

Receipts → Trust
+
Pitches → Creativity
+
Vouches → Reliability
↓
Better Sponsorship

The creator is not valuable only because of audience size.

The creator is valuable because they can:

PROVE

CREATE

DELIVER

==================================================
43. FINAL TAGLINE
=================

Use this prominently:

# PROVE. CREATE. COLLABORATE.

And:

# "Don't Just Show Your Reach. Show Your Impact."

==================================================
44. IMPLEMENTATION INSTRUCTION
==============================

Now actually implement the application.

Start by:

1. Create the project structure.
2. Configure React/Vite.
3. Configure Express/Node.
4. Configure MongoDB/Mongoose.
5. Implement authentication.
6. Implement routing.
7. Build the landing page.
8. Build role selection.
9. Build brand onboarding.
10. Build creator onboarding.
11. Build creator receipts.
12. Build receipt verification.
13. Build brand creator discovery.
14. Build announcements.
15. Build pitches.
16. Build pitch comparison.
17. Build collaborations.
18. Build vouches.
19. Build second-chance pitches.
20. Build bundle collaborations.
21. Build barter.
22. Build milestones.
23. Add realistic seed data.
24. Add 3D scenes and animations.
25. Test every route.
26. Fix all console errors.
27. Ensure the application runs from a clean installation.

Do not stop after creating the landing page.

Do not give me only code snippets.

Build the complete application.

If an external API/key is required for maps or another service, create a clean environment-variable configuration and provide a graceful fallback so the application still works without the key.

At the end, provide:

* Project structure
* Setup commands
* Environment variables required
* Database setup
* How to run frontend
* How to run backend
* Demo accounts
* Main demo flow

Most importantly:

**Build a visually exceptional, professional, colorful, interactive 3D product—not a generic CRUD dashboard.**

The judge should understand the innovation within the first 30 seconds of interacting with the website.
   