# AgriSakha
## Backend
### Added
- **[FEATURE]** Experts can now create, and the public can view, farming tips.
- **[API]** Added new endpoints: `POST /tips`, `GET /tips`, `GET /tags`, `GET /tips/tag/:tagId`.
- **[Models]** Added new `Tip` and `Tag` Mongoose models.
- **[Infra]** Integrated Cloudinary for robust image uploads, with `multer` for server-side handling.
- **[Utils]** Created a dedicated `cloudinary.js` utility for managing cloud uploads and cleanup.