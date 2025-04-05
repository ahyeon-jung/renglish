# Changelog

All important changes are managed in this document.

## 2.0.0 - 03/22/2025 - 04/05/2025

### Added

- Google Analytics and console logging integration
- Admin-only navigation (NavAdmin)
- Admin token verification middleware and related API
- Admin script list and deletion features
- Movie and scene search functionality with category support
- Script file upload and download capabilities
- Email verification during signup using Redis
- Writing practice page with comparison modal and save function
- Visitor statistics tracking
- Custom error object and toast notification component
- Password encryption during signup
- Swagger password protection and downloadable docs
- Static data support for the main banner

### Changed

- Unified Prettier settings for both client and server; removed emojis
- Admin status managed with SWR-based token caching
- Movie list page pagination migrated to useSWRInfinite
- Applied common admin route middleware using pathname
- Refactored @components to \_components for consistency
- Cleaned up auto-generated PWA files and updated .gitignore

### Fixed

- Proper error handling for 401 responses in admin token validation
- Dialogue click issue showing incorrect language fixed
- Script page navigation bug when clicking recent scripts
- Allowed /common/\*\* as a valid image domain
- Fixed import issues in the inquiry module

## 1.1.0 - 03/17/2025 - 03/21/2025

### Deploy

- The client has been deployed on Vercel, while the database and server are hosted on CloudType(using free tier).

### Added

- Added the "Inside Out" script for practice.
- Added JWT Authorization in sever.
- Integrated login and logout API with middleware.
- Added tables for announcements and inquiries.
- Implemented script upload API functionality.
- Added static data for the main banner.

### Fixed

- Fixed whole page structure

## 1.0.0 - 03/11/2025 - 03/16/2025

### Added

- Added static-based scripts for both Korean and English versions.
- Added a dialogue practice page with a 5000ms interval for exercises.
- Added the "Me Before You" script for practice.
