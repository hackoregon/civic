---
to: packages/<%=package%>/src/components/App/index.js
inject: true
before: '</PageLayout>'
skip_if: <<%=StoryCardName%>
---
    <section className={sectionMarginMedium}>
      <<%=StoryCardName%> Layout={CivicCardLayoutClassic} />
    </section>
