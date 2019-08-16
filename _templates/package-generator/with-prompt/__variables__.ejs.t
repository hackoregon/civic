---
# Blank template file to hold variables to be used in this generator
# NOTE: This file MUST come first in this folder alphabetically
#
# Full list of helpers to change case: https://github.com/blakeembrey/change-case
---
# 1969-package-name
# TODO

# Package Name
<%title = h.changeCase.title(packageTitle)%>

# PackageName
<%pascalTitle = h.changeCase.pascal(packageTitle)%>

# packageName
<%camelTitle = h.changeCase.camel(packageTitle)%>

# package-name
<%kababTitle = h.changeCase.param(packageTitle)%>
