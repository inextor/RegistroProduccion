## Git Revert Policy

When undoing changes in Git, always create a new commit that reverts the previous changes. Never attempt to rewrite or alter Git history (e.g., using `git rebase` or `git reset --hard` on shared branches) unless explicitly instructed by the user and after confirming the implications.

This policy ensures a clear and traceable history of all modifications, even those that are later undone.