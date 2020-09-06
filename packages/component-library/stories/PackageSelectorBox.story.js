/* eslint-disable no-console */
/** @jsx jsx */
import { jsx } from "@emotion/core";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { checkA11y } from "@storybook/addon-a11y";
import { storybookStyles } from "./storyStyles";
import { PackageSelectorBox } from "../src";

const PackageSelectorDemo = () => {
  const packageSelectorList = object("Data", [
    {
      displayName: "Nevada: Computers in Household",
      defaultLayers: ["Total - Has Computing Devices"],
      layers: [
        {
          name: "Total - Has Computing Devices",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/2ec7cddfc30e374d85e8b47cef58f624/raw/d4b3f98d9c92762673b0b6745fec595d65f90b44/NV-total-has-computing-devices.json"
        },
        {
          name: "Total Smartphone and No Desktop",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/2ec7cddfc30e374d85e8b47cef58f624/raw/d4b3f98d9c92762673b0b6745fec595d65f90b44/NV-total-smartphone-no-desktop.json"
        },
        {
          name: "Total No Computer",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/2ec7cddfc30e374d85e8b47cef58f624/raw/d4b3f98d9c92762673b0b6745fec595d65f90b44/NV-total-no-computer.json"
        }
      ]
    },
    {
      displayName:
        "Nevada: Presence and Types of Internet Subscriptions in Household",
      defaultLayers: ["Total - Subscriptions Any Broadband"],
      layers: [
        {
          name: "Total - Subscriptions Dial Up Only",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9ddce3080cbbca85145458ce1ba6dc81/raw/81f9cec444754f066448a7dbbb7321c3e300e467/NV-total-subscriptions-dialup-only.json"
        },
        {
          name: "Total - Subscriptions Any Broadband",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9ddce3080cbbca85145458ce1ba6dc81/raw/81f9cec444754f066448a7dbbb7321c3e300e467/NV-total-subscriptions-any-broadband.json"
        },
        {
          name: "Total - Subscriptions Cellular Data Only",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9ddce3080cbbca85145458ce1ba6dc81/raw/81f9cec444754f066448a7dbbb7321c3e300e467/NV-total-subscriptions-cellular-data-only.json"
        },
        {
          name: "Total - Subscriptions Satellite Only",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9ddce3080cbbca85145458ce1ba6dc81/raw/81f9cec444754f066448a7dbbb7321c3e300e467/NV-total-subscriptions-satellite-only.json"
        },
        {
          name: "Total - Access without Subscriptions",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9ddce3080cbbca85145458ce1ba6dc81/raw/81f9cec444754f066448a7dbbb7321c3e300e467/NV-total-access-without-subscriptions.json"
        },
        {
          name: "Total - No Access",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9ddce3080cbbca85145458ce1ba6dc81/raw/81f9cec444754f066448a7dbbb7321c3e300e467/NV-total-no-access.json"
        }
      ]
    },
    {
      displayName: "Georgia: Computers in Household",
      defaultLayers: ["Total - Has Computing Devices"],
      layers: [
        {
          name: "Total - Has Computing Devices",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/cf77cde75f7c5a9e4cdad9fc7d8ec4fd/raw/aa3de6f25c68f00a5f2ada0487a3ca27bd18e47e/GA-total-has-computing-devices.json"
        },
        {
          name: "Total - Smartphone and No Desktop",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/cf77cde75f7c5a9e4cdad9fc7d8ec4fd/raw/aa3de6f25c68f00a5f2ada0487a3ca27bd18e47e/GA-total-smartphone-no-desktop.json"
        },
        {
          name: "Total - No Computer",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/cf77cde75f7c5a9e4cdad9fc7d8ec4fd/raw/aa3de6f25c68f00a5f2ada0487a3ca27bd18e47e/GA-total-no-computer.json"
        }
      ]
    },
    {
      displayName:
        "Georgia: Presence and Types of Internet Subscriptions in Household",
      defaultLayers: ["Total - Subscriptions Any Broadband"],
      layers: [
        {
          name: "Total - Subscriptions Any Broadband",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/608995791c02547f046db35d461f6654/raw/bc389472ba324768445f6e8114dedce02afe0fae/GA-total-subscriptions-any-broadband.json"
        },
        {
          name: "Total - Subscriptions Dial Up Only",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/608995791c02547f046db35d461f6654/raw/bc389472ba324768445f6e8114dedce02afe0fae/GA-total-subscriptions-dialup-only.json"
        },
        {
          name: "Total - Subscriptions Cellular Data Only",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/608995791c02547f046db35d461f6654/raw/bc389472ba324768445f6e8114dedce02afe0fae/GA-total-subscriptions-cellular-data-only.json"
        },
        {
          name: "Total - Subscriptions Satellite Only",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/608995791c02547f046db35d461f6654/raw/bc389472ba324768445f6e8114dedce02afe0fae/GA-total-subscriptions-satellite-only.json"
        },
        {
          name: "Total - Access without Subscriptions",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/608995791c02547f046db35d461f6654/raw/bc389472ba324768445f6e8114dedce02afe0fae/GA-total-access-without-subscriptions.json"
        },
        {
          name: "Total - No Access",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/608995791c02547f046db35d461f6654/raw/bc389472ba324768445f6e8114dedce02afe0fae/GA-total_no_access.json"
        }
      ]
    },
    {
      displayName: "Portland: Gentrifying Neighborhoods",
      description: "",
      defaultLayers: ["Median Rent"],
      tags: [
        "gentrification",
        "housing",
        "opportunity zones",
        "Portland",
        "Oregon"
      ],
      layers: [
        {
          name: "Median Rent",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_med_rent_val.json"
        },
        {
          name: "Change in Rent",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_change_in_rent.json"
        },
        {
          name: "Change in People who have Bachelor's Degree",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_change_bach_share.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Portland: Affluence and Income Inequality",
      defaultLayers: ["Median Income"],
      description: "",
      tags: [
        "income",
        "income inequality",
        "opportunity zones",
        "Portland",
        "Oregon"
      ],
      layers: [
        {
          name: "Median Income",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_med_inc.json"
        },
        {
          name: "Change in Median Income",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_change_inc.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Portland: Cost-burdened Renters",
      defaultLayers: ["Median Income"],
      description: "",
      tags: ["housing", "rent", "opportunity zones", "Portland", "Oregon"],
      layers: [
        {
          name: "Median Income",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_med_inc.json"
        },
        {
          name: "Share of Cost-Burdened Renters",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_rent_cb_share_17.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Portland: Home Values",
      defaultLayers: ["Median Income"],
      description: "",
      tags: ["housing", "opportunity zones", "Portland", "Oregon"],
      layers: [
        {
          name: "Median Home Value",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_med_home_val.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Portland: Concentrated Poverty",
      defaultLayers: ["Poverty Rates"],
      description: "",
      tags: ["poverty", "opportunity zones", "Portland", "Oregon"],
      layers: [
        {
          name: "Poverty Rates",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/1e4144ebe02cefa9d6e60fede9d098eb66f29b16/pdx_pov_rate.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Portland: Racial Diversity and Opportunity Zones",
      defaultLayers: ["Race: Share Black"],
      description: "",
      tags: ["race", "ethnicity", "opportunity zones", "Portland", "Oregon"],
      layers: [
        {
          name: "Race: Share Black",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/pdx_race_black_share.json"
        },
        {
          name: "Race: Share White",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/pdx_race_white_share.json"
        },
        {
          name: "Race: Share Hispanic",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/pdx_race_hisp_share.json"
        },
        {
          name: "Race: Share Asian / Other",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/pdx_race_asoth_share.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "National: Computers and Race",
      description:
        "Presence and type of computing devices in households displayed with share by racial categories",
      defaultLayers: ["Share - No Computer"],
      layers: [
        {
          name: "Share - No Computer",
          description: "No types of computing devices in household in 2017",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/c91fcaecf0f07141d79639b8b4604317/raw/e9a3eece8413faaf217651a42b064b7456918713/computer-share-no-computer.json"
        },
        {
          name: "Share - Has Computing Devices",
          description:
            "One or more types of computing devices in household in 2017",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/c91fcaecf0f07141d79639b8b4604317/raw/e9a3eece8413faaf217651a42b064b7456918713/computer-share-has-computing-devices.json"
        },
        {
          name: "Share - Smartphone and No Desktop",
          description:
            "Smartphone tablet or other portable wireless computer, no desktop or laptop in household in 2017",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/c91fcaecf0f07141d79639b8b4604317/raw/e9a3eece8413faaf217651a42b064b7456918713/computer-share-smartphone-no-desktop.json"
        },
        {
          name: "Race: Share Black",
          description: "Share of persons identifying as black in 2017",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/c91fcaecf0f07141d79639b8b4604317/raw/e9a3eece8413faaf217651a42b064b7456918713/race-share-black.json"
        },
        {
          name: "Race: Share White",
          description: "Share of persons identifying as white in 2017",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/c91fcaecf0f07141d79639b8b4604317/raw/e9a3eece8413faaf217651a42b064b7456918713/race-share-white.json"
        },
        {
          name: "Race: Share Hispanic",
          description: "Share of persons identifying as Hispanic in 2017",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/c91fcaecf0f07141d79639b8b4604317/raw/e9a3eece8413faaf217651a42b064b7456918713/race-share-hispanic.json"
        },
        {
          name: "Race: Share Asian / Other",
          description:
            "Share of persons identifying as Asian or some other race in 2017",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/c91fcaecf0f07141d79639b8b4604317/raw/e9a3eece8413faaf217651a42b064b7456918713/race-share-asian-other.json"
        }
      ]
    },
    {
      displayName: "Washington, D.C.: Gentrifying Neighborhoods",
      description: "",
      defaultLayers: ["Median Rent"],
      tags: [
        "gentrification",
        "housing",
        "opportunity zones",
        "Washington, D.C."
      ],
      layers: [
        {
          name: "Median Rent",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/med_rent_val_17.json"
        },
        {
          name: "Change in Rent",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/61c452580f64edd2b6ad043e2c59cd2722ae8386/chrent_1017.json"
        },
        {
          name: "Change in People who have Bachelor's Degree",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/61c452580f64edd2b6ad043e2c59cd2722ae8386/change_bach_share_1017.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Washington, D.C.: Affluence and Income Inequality",
      defaultLayers: ["Median Income"],
      description: "",
      tags: [
        "income",
        "income inequality",
        "opportunity zones",
        "Washington, D.C."
      ],
      layers: [
        {
          name: "Median Income",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/med_inc_17.json"
        },
        {
          name: "Change in Median Income",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/61c452580f64edd2b6ad043e2c59cd2722ae8386/change_inc_9017.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Washington, D.C.: Cost-burdened Renters",
      defaultLayers: ["Median Income"],
      description: "",
      tags: ["housing", "rent", "opportunity zones", "Washington, D.C."],
      layers: [
        {
          name: "Median Income",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/med_inc_17.json"
        },
        {
          name: "Race: Share Black",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/blackshare_17.json"
        },
        {
          name: "Share of Cost-Burdened Renters",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/41650497d1559870d58e99719c7c22cc703210e0/rent_c_b_share_17.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Washington, D.C.: Home Values",
      defaultLayers: ["Median Income"],
      description: "",
      tags: ["housing", "opportunity zones", "Washington, D.C."],
      layers: [
        {
          name: "Median Home Value",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/med_home_val_17.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Washington, D.C.: Concentrated Poverty",
      defaultLayers: ["Poverty Rates"],
      description: "",
      tags: ["poverty", "opportunity zones", "Washington, D.C."],
      layers: [
        {
          name: "Poverty Rates",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/54517830e04bd997b5ea811d6d5682b9a9fb7273/pov_rate_17.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    },
    {
      displayName: "Washington, D.C.: Racial Diversity and Opportunity Zones",
      defaultLayers: ["Race: Share Black"],
      description: "",
      tags: ["race", "ethnicity", "opportunity zones", "Washington, D.C,"],
      layers: [
        {
          name: "Race: Share Black",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/blackshare_17.json"
        },
        {
          name: "Race: Share White",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/whiteshare_17.json"
        },
        {
          name: "Race: Share Hispanic",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/hispshare_17.json"
        },
        {
          name: "Race: Share Asian / Other",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/9dd29a69edc6250843970d0bc5acc19a/raw/96c751b013c7c87b572a28c8076799ef38520df4/asothshare_17.json"
        },
        {
          name: "Opportunity Zones",
          layerEndpoint:
            "https://gist.githubusercontent.com/mendozaline/57339810585a8866d6df3651fc918687/raw/3ad86161afd98221d7abe1d66b0c9d7b186f0c1a/opp-zones.json"
        }
      ]
    }
  ]);
  return (
    <PackageSelectorBox
      packages={packageSelectorList}
      onChange={({ displayName }) => console.log(displayName)}
    />
  );
};

const PackageSelectorCollection = () => (
  <div>
    <div>Select a Data Collection</div>
    <PackageSelectorDemo />
  </div>
);

export default () =>
  storiesOf("Component Lib/CIVIC Platform/Package Selector Box", module)
    .addDecorator(withKnobs)
    .addDecorator(checkA11y)
    .addDecorator(story => (
      <div style={storybookStyles.storyGrid}>
        <div style={storybookStyles.storyGridItem}>{story()}</div>
      </div>
    ))
    .add(
      "Basic List of selection Options",
      // 'This is a basic list of selection options for the
      // package Selector with just a title and descriptions')(
      PackageSelectorDemo
    )
    .add("Collection of packages", PackageSelectorCollection);
