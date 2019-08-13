---
to: packages/<%=package%>/package.json
inject: true
after: dependencies
skip_if: reduxful
---
    "reduxful": "^1.2.2",