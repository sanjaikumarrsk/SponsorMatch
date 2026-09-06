# Sponsor Match visual assets

The product uses real, royalty-free photography from Unsplash. Images are loaded from stable `images.unsplash.com` URLs in the prototype so the repository stays lightweight; for a production deployment, download them into `public/assets/images/` and preserve this attribution record.

| Asset | Source | URL | License / attribution |
| --- | --- | --- | --- |
| Coffee shop interior | Unsplash | https://unsplash.com/photos/coffee-shop-interior | Unsplash License; photographer attribution appreciated |
| Creator portrait 1 | Unsplash | https://unsplash.com/photos/woman-in-yellow-shirt | Unsplash License; photographer attribution appreciated |
| Creator portrait 2 | Unsplash | https://unsplash.com/photos/man-wearing-glasses | Unsplash License; photographer attribution appreciated |
| Local storefront | Unsplash | https://unsplash.com/photos/storefront | Unsplash License; photographer attribution appreciated |
| Product / workspace | Unsplash | https://unsplash.com/photos/workspace-with-camera | Unsplash License; photographer attribution appreciated |

## Editorial image map

The refreshed 2D visual system uses a dedicated photo role for each major storytelling section. These are kept as remote Unsplash image URLs in `client/src/App.jsx` under `PHOTO` so the demo stays lightweight.

| UI role | Code key | Visual context |
| --- | --- | --- |
| Landing hero | `hero` | Creator / work environment |
| Hero supporting card | `heroCard` | Creator portrait / point of view |
| Impact story | `receiptDetail` | Team reviewing campaign work |
| Receipt portfolio | `receipt` | Business / transaction result |
| Pitch comparison | `pitch`, `pitchDesk` | Creative team and proposal context |
| Brand workspace | `brandStore`, `brandCafe`, `brandProduct` | Store, cafe and product environments |
| Collaboration | `collaboration` | Team working together |
| Vouch testimonials | `vouch1`, `vouch2`, `vouch3` | Three separate people |

No 3D, GLB/GLTF, Three.js or React Three Fiber assets are used by the current frontend.

The images are used as contextual editorial photography, not as claims of identity for the demo creators. Demo profile names are fictional.
