---
to: packages/<%=package%>/package.json
inject: true
after: dependencies
skip_if: cross-fetch
---
    "cross-fetch": "^3.0.4",