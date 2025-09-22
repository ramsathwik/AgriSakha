# AgriSakha
## Backend
### Added
- **[FEATURE]** Experts can now create, and the public can view, farming tips.
- **[API]** Added new endpoints: `POST /tips`, `GET /tips`, `GET /tags`, `GET /tips/tag/:tagId`.
- **[Models]** Added new `Tip` and `Tag` Mongoose models.
- **[Infra]** Integrated Cloudinary for robust image uploads, with `multer` for server-side handling.
- **[Utils]** Created a dedicated `cloudinary.js` utility for managing cloud uploads and cleanup.




### Added
- **[FEATURE]** Farmers can now submit tips, which enter a `pending` state for moderation.
- **[API]** Added endpoints for farmers to `POST /tips/submit`.
- **[API]** Added endpoints for experts to `GET /tips/pending`, `PATCH /tips/:tipId/approve`, and `PATCH /tips/:tipId/reject`.

### Changed
- **[Model]** Updated the `Tip` schema to support the approval workflow with `authorFarmer`, an optional `author` (approver), and `rejectionReason` fields.
- **[Controller]** The `createTip` logic was split into `createTipByExpert` (for direct publishing) and `submitTipByFarmer` (for moderation).