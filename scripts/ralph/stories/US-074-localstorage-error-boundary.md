# US-074: Friendly error boundary for localStorage read failures

- **Epic:** Discovery
- **Priority:** 74
- **Status:** pending
- **Passes:** false
- **Branch:** 
- **PR:** 0
- **QA Attempts:** 0

## Description

If any localStorage key contains malformed JSON (from a browser extension, previous bug, or storage migration), JSON.parse() throws and the entire page can crash. Add try/catch around all localStorage reads with a friendly recovery UI.

## Acceptance Criteria

- [ ] All localStorage reads in the codebase are wrapped in try/catch
- [ ] If parsing fails, the key is reset to its default value (empty array/null) instead of crashing
- [ ] A React error boundary component wraps the main app content
- [ ] When the error boundary catches an unhandled error, it renders a friendly message: "Something went wrong. Please refresh the page."
- [ ] The error boundary includes a 'Refresh' button that calls window.location.reload()
- [ ] No existing tests break after the error boundary is added
