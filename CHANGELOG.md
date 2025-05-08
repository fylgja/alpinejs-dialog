# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Return value for `closeby`

## [2.1.0] - 2025-04-15
### Added
- Implemented custom `closeby` Alpine modifier (native lacks sufficient browser support,
  to be tested for side effects).
  Backdrop closing is the current default (may be revisited; differs from standard dialog `closeby`).

### Fixed
- Backdrop still being triggered

## [2.0.2] - 2025-03-10
### Added
- Support for form method dialog

### Fixed
- Incorrect handeling of the backdrop click event, causing errors with the enter key inside a form

## [2.0.0] - 2024-02-21
### Changed
- renamed name from `x-dialog` to `x-htmldialog` to not conflict with Alpine UI name

## [1.0.0] - 2022-09-15
Initial Release 🎉
