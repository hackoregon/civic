---
to: packages/2018/card-registry.js
inject: true
# This regex will inject this after the the last occurrence of a new line that begins with "import" (i.e. right after the other import statements)
after: \nimport(?![\s\S]*\nimport).*
# Skip if the story card is already imported OR if the hygen:skip directive is found
skip_if: "(import { CardRegistry as <%=pascalTitle%><%=year%>|hygen:skip)"
---
import { CardRegistry as <%=pascalTitle%><%=year%> } from '@hackoregon/<%=year%>-<%=packageTitle%>'
