---
"@neomorphic-react/ui": patch
---

Fix `Button` losing its accessible name while `isLoading`: the label under the spinner is now transparent instead of `visibility: hidden`, so screen readers still announce "Subscribe, busy" rather than an unnamed button. The button keeps its size and look.
