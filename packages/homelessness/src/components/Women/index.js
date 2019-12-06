/* eslint-disable react/jsx-boolean-value, react/no-unused-prop-types */
import React from "react";

import { CivicStoryCard } from "@hackoregon/component-library";
import shared from "../shared.styles";
import { HalfDonutChart, ListBarChart } from "../Reuseable";

const propsData2 = [
  {
    name: "Domestic Violence",
    value: 45
  },
  {
    name: "Reported Disability",
    value: 67
  }
];

const pieData = [
  {
    data: [{ name: "Women", value: 35 }, { name: "Men", value: 65 }],
    name: 2015
  }
];

const COLORS = ["#75568D", "#e3dde8"];
const valueLabel = options => (
  <Text {...options} fill="#201024">{`${options.value}%`}</Text>
);
const axisLabel = options => (
  <Text
    {...options}
    fill="#201024"
    y={options.y - 25}
    width={300}
    style={{ fontWeight: "bold" }}
  >
    {options.payload.value}
  </Text>
);

class HomelessPopulation extends React.Component {
  componentDidMount() {
    // this.props.loadData();
  }

  render() {
    return (
      <CivicStoryCard
        footer={false}
        watermark={<div />}
        title="Does Domestic Violence Drive Homelessness?"
      >
        <div
          className="Women"
          style={{ marginLeft: "10px", marginRight: "10px", marginTop: "50px" }}
        >
          <p style={shared.text}>
            Yes. Domestic violence is a primary cause of homelessness for women*
            (and their children) nationally, in Oregon, and in Multnomah County.
            The causal relationship can be direct—as when a woman leaves her
            home with no place to go out of concern for her immediate safety.
            But it can also be indirect—a woman may miss work because of an
            injury inflicted by a family member, for example, which reduces her
            financial independence, compromises her mental health, and increases
            the risk of housing instability or homelessness if she does leave.
          </p>
          <div>
            <HalfDonutChart dataSets={pieData[0].data} />
            <p style={shared.footnote}>
              The 2015 Count revealed that 45% of homeless women in Multnomah
              County are affected by domestic violence—nearly one in two women
              who participated. *National Center on Family Homelessness (2013),
              “Pressing Issues Facing Families Who Are Homeless”
            </p>
            <ListBarChart
              data={propsData2}
              title="Homeless Women Affected By"
            />
          </div>
        </div>
      </CivicStoryCard>
    );
  }
}

export default HomelessPopulation;
