# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
[Unreleased]: https://github.com/fylgja/alpinejs-dialog/compare/v2.2.1...HEAD

## [2.2.1] - 2025-10-09
[2.2.1]: https://github.com/fylgja/alpinejs-dialog/compare/v2.2.0...v2.2.1

### Fixed

- Missing closeby logic for escape key
- Missing submit logic from not triggering the close event

## [2.2.0] - 2025-10-09
[2.2.0]: https://github.com/fylgja/alpinejs-dialog/compare/v2.1.1...v2.2.0

### Added

- Support for native `closeby` attribute,
  This will replace the custom `closeby` Alpine modifier, in a later release
- Support for handling the evaluate action when the native dialog close event is triggered.
  This extending the first step we made for form submits, but now also for the backdrop and escape key

### Fixed

- Closing of all open dialogs when pressing the escape key

## [2.1.1] - 2025-05-08
[2.1.1]: https://github.com/fylgja/alpinejs-dialog/compare/v2.1.0...v2.1.1

### Fixed

- Return value for `closeby`

## [2.1.0] - 2025-04-15
[2.1.0]: https://github.com/fylgja/alpinejs-dialog/compare/v2.0.2...v2.1.0

### Added

- Implemented custom `closeby` Alpine modifier (native lacks sufficient browser support,
  to be tested for side effects).
  Backdrop closing is the current default (may be revisited; differs from standard dialog `closeby`).

### Fixed

- Backdrop still being triggered

## [2.0.2] - 2025-03-10
[2.0.2]: https://github.com/fylgja/alpinejs-dialog/compare/v2.0.0...v2.0.2

### Added

- Support for form method dialog

### Fixed

- Incorrect handeling of the backdrop click event, causing errors with the enter key inside a form

## [2.0.0] - 2024-02-21
[2.0.0]: https://github.com/fylgja/alpinejs-dialog/compare/v1.0.0...v2.0.0

### Changed

- Renamed name from `x-dialog` to `x-htmldialog` to not conflict with Alpine UI name

## 1.0.0 - 2022-09-15

Initial Release 🎉
