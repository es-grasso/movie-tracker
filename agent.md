# AI AGENT RULES & CONSTRAINTS

- **Verification First**: Always run tests before and after applying code changes.
- **Minimal Surface Area**: Limit edits strictly to relevant files. Do not modify unrelated configurations.
- **Code Style**: Adhere to the existing repository architecture, naming conventions, and strict typing.
- **Safety Constraints**: Do not delete existing unit tests, silence linters, or ignore type errors to force a build to pass.
