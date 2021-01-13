import React from "react";
import { mount } from "enzyme";
import CardList from "./CardList";
import { CivicCard } from "..";
import sampleCardMeta from "../../stories/CivicCardSample/sampleCardMeta";
import sampleCardData from "../../stories/CivicCardSample/sampleCardData";

describe("Card List", () => {
  const projectsMock = [
    {
      type: "application",
      title: "CIVIC Sandbox",
      description:
        "A common resource that can power ethical data exploration through interactive maps",
      link: "/sandbox"
    },
    {
      type: "collection",
      title: "The Changing Complexion of Housing in Portland",
      description:
        "Examining the demographic shifts of populations and disparities in homeownership",
      link: "/2019/housing"
    },
    {
      type: "collection",
      title: "Transit Operations Analytics Data (TOAD)",
      description: "Visualizing transit operations data",
      link: "/2019/transportation"
    },
    {
      type: "collection",
      title: "Disaster Resilience",
      description:
        "Assessing Risk and Prioritizing Action to Strengthen Resilience in the Face of a Natural Disaster",
      link: "/cities/portland/disaster"
    }
  ];

  const masterTagsList = {
    topics: ["top1", "top2", "top3"],
    locations: ["loc1", "loc2", "loc3"],
    visualizations: ["vis1", "vis2", "vis3"]
  };

  function createMockCardRegistry(tagsList) {
    const sampleCardsWithTags = tagsList.map(({ tags, title }) => {
      const sampleCardMetaWithTags = data => {
        return {
          ...sampleCardMeta(data),
          tags,
          title
        };
      };

      // eslint-disable-next-line react/prop-types
      const SampleCard = ({ isLoading, Layout }) => (
        <CivicCard
          cardMeta={sampleCardMetaWithTags}
          data={sampleCardData}
          isLoading={isLoading}
          Layout={Layout}
        />
      );

      SampleCard.tags = tags;
      return SampleCard;
    });

    const cardRegistryMock = {
      tags: {
        Transportation: 2,
        Bus: 1,
        Rail: 1,
        Portland: 2,
        Housing: 1,
        Gentrification: 1,
        Transit: 1,
        Demo: 1
      },
      entries: sampleCardsWithTags.map(sampleCard => {
        return {
          slug: "template-file-card",
          project: "@hackoregon/2019-template",
          component: sampleCard
        };
      })
    };

    return cardRegistryMock;
  }

  const cardWithAllTags = {
    tags: [
      "top1",
      "top2",
      "top3",
      "vis1",
      "vis2",
      "vis3",
      "loc1",
      "loc2",
      "loc3"
    ],
    title: "card with all tags"
  };
  const cardTopic1 = { tags: ["top1"], title: "card topic 1" };
  const cardLocation1 = { tags: ["loc1"], title: "card location 1" };
  const cardVisualization1 = { tags: ["viz1"], title: "card visualization 1" };
  const cardWithOneTagFromEachCategory = {
    tags: ["top1", "loc1", "vis1"],
    title: "card with one tag from each category"
  };
  const cardWithAnotherTagFromEachCategory = {
    tags: ["top2", "loc2", "vis2"],
    title: "card with another tag from each category"
  };
  const cardWith2TagsFromOneCategoryAnd1TagFromAnother = {
    tags: ["top1", "top2", "loc1"],
    title: "card with 2 tags from one category and one card from another"
  };
  const tagConstructor = [
    cardWithAllTags,
    cardTopic1,
    cardLocation1,
    cardVisualization1,
    cardWithOneTagFromEachCategory,
    cardWithAnotherTagFromEachCategory,
    cardWith2TagsFromOneCategoryAnd1TagFromAnother
  ];

  const mockRegistry = createMockCardRegistry(tagConstructor);
  it("Recieves the proper tag information for each card from the card registry", () => {
    const wrapper = mount(
      <CardList
        CardRegistry={mockRegistry}
        projects={projectsMock}
        tagsList={masterTagsList}
      />
    );
    const cardlist = wrapper.find("CardList");

    expect(cardlist.props().CardRegistry.entries[0].component.tags).to.equal(
      cardWithAllTags.tags
    );
    expect(cardlist.props().CardRegistry.entries[1].component.tags).to.equal(
      cardTopic1.tags
    );
    expect(cardlist.props().CardRegistry.entries[2].component.tags).to.equal(
      cardLocation1.tags
    );
    expect(cardlist.props().CardRegistry.entries[3].component.tags).to.equal(
      cardVisualization1.tags
    );
    expect(cardlist.props().CardRegistry.entries[4].component.tags).to.equal(
      cardWithOneTagFromEachCategory.tags
    );
    expect(cardlist.props().CardRegistry.entries[5].component.tags).to.equal(
      cardWithAnotherTagFromEachCategory.tags
    );
    expect(cardlist.props().CardRegistry.entries[6].component.tags).to.equal(
      cardWith2TagsFromOneCategoryAnd1TagFromAnother.tags
    );
  });
  it("State Experiment", () => {
    const wrapper = mount(
      <CardList
        CardRegistry={mockRegistry}
        projects={projectsMock}
        tagsList={masterTagsList}
      />
    );

    console.log(
      "STATE STATE STATE",
      wrapper
        .find("Checkbox")
        .filter({ label: "top1" })
        .first()
        .debug()
    );

    // const top1Checkbox = wrapper
    //   .find("Checkbox")
    //   .filter({ label: "top1" })
    //   .first();

    // <Checkbox value={false} label="top1" onChange={[Function: onChange]} labelPlacement="end" variant="contained" disabled={false}>
  });
});
