---
# Blank template file to hold variables to be used in this generator
# NOTE: This file MUST come first in this folder alphabetically
# 
# Full list of helpers to change case: https://github.com/blakeembrey/change-case
---

# STORY_CARD_NAME
<%STORY_CARD_NAME = h.changeCase.constant(card)%>

# StoryCardName
<%StoryCardName = h.changeCase.pascal(card)%>

# storyCardName
<%storyCardName = h.changeCase.camel(card)%>

# story-card-name
<%slug = h.changeCase.param(card)%> 

# Story Card Name
<%title = h.changeCase.title(card)%> 

