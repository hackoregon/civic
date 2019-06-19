import React from "react";
import { CivicStoryCard } from "@hackoregon/component-library";

const s3 = "https://s3-us-west-2.amazonaws.com/hacko-cdn/2017-housing/";

const wrapperStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "0 1em",
  textAlign: "left"
};

const headingStyle = {
  textAlign: "center"
};

const imgHeadingStyle = {
  backgroundColor: "#f3f3f3",
  textAlign: "center",
  fontWeight: "normal",
  marginBottom: "0",
  padding: "15px 0 2px"
};

const imgStyle = {
  maxWidth: "100%",
  display: "block",
  margin: "0 auto"
};

const TempVoterRegistration = () => (
  <CivicStoryCard
    footer={false}
    watermark={<div />}
    title="Voter Registration Data"
  >
    <div style={wrapperStyle}>
      <p>
        Using 10 years of Multnomah Coount voter registration data, what can we
        learn about how Portland is growing and changing?
      </p>
      <p>
        Changes in voter age and location offer surprising insights into how and
        where Portlanders live: Portland is aging, but the age at which citizens
        register to vote for the first time is growing younger. Perhaps in
        response to rising housing costs, more adults are living in shared
        households, and more of those adults appear to be adult children living
        with their parents into their late 20s.
      </p>

      <h3 style={headingStyle}>An Aging City</h3>
      <p>
        For the last ten years, Portland area voters&mdash;like Portlanders as a
        whole&mdash;have been growing older.
      </p>
      <img
        style={imgStyle}
        src={`${s3}PortlandAverageAge.png`}
        alt="Average Age of Registered Voters"
      />
      <p>
        Studies of all Portlanders (not just voters) see a similar trend. Using
        Census data,&nbsp;
        <a href="https://www.forbes.com/sites/joelkotkin/2016/02/16/americas-senior-moment-the-most-rapidly-aging-cities/">
          a 2016 Forbes article
        </a>
        &nbsp;ranks Portland as the fourth most rapidly aging city in the
        country. That is, while Portland is still a relatively young city, the
        share of seniors in the population has been growing rapidly, in part
        reflecting the aging of “young and well-educated people who moved to
        Oregon in the 1970s.” According to&nbsp;
        <a href="http://www.oregonlive.com/business/index.ssf/2015/06/the_graying_of_oregon_new_cens.html">
          Charles Rynerson
        </a>
        &nbsp;of the{" "}
        <a href="https://www.pdx.edu/prc/home">Population Research Center</a> at
        Portland State University, “There’s a lot of young, well-educated people
        who have been coming here since the ’90s, but they were coming here in
        the ’70s, too.” Seniors who have moved to Portland more recently may
        also be&nbsp;
        <a href="https://www.mayflower.com/about-us/news/boomerang-press-release">
          following their children and grandchildren
        </a>
        .
      </p>

      <h3 style={headingStyle}>Trend Toward Shared Households</h3>
      <p>
        Perhaps in response to increases in the cost of housing, the percentage
        of voters sharing a household has steadily increased over the last ten
        years. We define a shared household here as four or more registered
        voters&mdash;by definition, all adults 18 or older&mdash;at the same
        address.
      </p>
      <img
        style={imgStyle}
        src={`${s3}PercentSharedHousing.png`}
        alt="Registered Voters in Shared Housing"
      />

      <h3 style={headingStyle}>Aging and Sharing</h3>
      <p>
        As the number of shared households has increased, so has the age of
        voters sharing households. As this graph shows, the average age of
        voters sharing households has followed the same upward trajectory as the
        average age of all Portland voters.
      </p>
      <img
        style={imgStyle}
        src={`${s3}PortlandAverageAgeAndSharedAge.png`}
        alt="Average Age of Registered Voters"
      />

      <h3 style={headingStyle}>People Sharing Households are Getting Older</h3>
      <p>
        Voters living in shared households, unlike the general population, are
        more likely to be in either their 20s or their 50s. From this we can
        infer that some of these shared households are adult children living
        with their parents or extended family. Others may be aging parents
        moving in with their adult children. And still others are unrelated
        adults living in shared housing, possibly in more homogeneous age
        groups. Further research using this Voter Registration data set would
        allow us to identify what proportion of shared households are made up of
        extended families versus other types of relationships.
      </p>
      <img
        style={imgStyle}
        src={`${s3}SharedAgeDistribution.gif`}
        alt="Age Distribution of Voters in Shared Housing"
      />

      <h3 style={headingStyle}>Intergenerational Households</h3>
      <p>
        A review of the average age of each shared household suggests that an
        increasing number of shared households are intergenerational family
        units, possibly because families are sharing households for longer. Over
        the last ten years, as the previous graph demonstrated, the median age
        of a young person living in shared housing increased from early to late
        20s, even as the median age of an older person living in shared housing
        increased from early to late 50s. At the same time, the average age of
        people living in any one shared household&mdash;a number that lands
        squarely between these two age cohorts&mdash;has increased from 37.4 to
        41.7.
      </p>
      <p>
        One of the drivers of this trend is young adults living at home longer.
        According to the &nbsp;
        <a href="http://www.pewsocialtrends.org/2016/05/24/for-first-time-in-modern-era-living-with-parents-edges-out-other-living-arrangements-for-18-to-34-year-olds/">
          Pew Research Center
        </a>
        , in 2014, for the first time since the 1940s, 32.1% of adults ages 18
        to 34 were living in a parents’ home. However, the past 15 years have
        also seen an increase in young adults adapting many different ways of
        living, “with the decline of romantic coupling pushing living at home to
        the top of a much less uniform list of living arrangements,” including
        that of young people living longer with other family members and other
        non-family shared household arrangements.
      </p>
      <img
        style={imgStyle}
        src={`${s3}AverageAgeDistributionSharedHouseholds.gif`}
        alt="Age Distribution for Shared Households"
      />

      <h3 style={headingStyle}>The Inner Portland Squeeze</h3>
      <p>
        The average age of voters living in shared housing is increasing
        citywide. When we look at the average age of shared households by
        neighborhood, however, we can see that the age of registered voters
        living in shared housing is not distributed evenly throughout the city.
        Instead, the aging of shared households moves over the last ten years
        from the city’s periphery towards its center. While the reasons for this
        growth pattern remain unclear, one possibility is that as the cost of
        housing has rapidly increased, more adult children from middle and upper
        middle class families located closer to the city center are choosing to
        live at home for longer.
      </p>
      <h4 style={imgHeadingStyle}>
        Age of Registered Voters Living in Shared Housing by Neighborhood
      </h4>
      <img
        style={imgStyle}
        src={`${s3}InnerSqueeze.gif`}
        alt="Age of Registered Voters Living in Shared Housing by Neighborhood"
      />

      <h3 style={headingStyle}>Traveling Youth</h3>
      <p>
        Despite rising housing costs many young people are staying in Portland,
        though they are dispersing across the city, whether in search of
        affordable rentals or because they are purchasing a home with suburban
        amenities. For those young voters who have lived in Portland for the
        last ten years, the neighborhood a 21 year old lived in in 2008 appears
        to have had no discernable effect on where in Portland they live ten
        years later. Because we have access only to Multnomah County data, we
        cannot track the movements of those who move beyond the county’s
        borders. A state-wide Voter Registration data set would help us to
        better understand where young people leaving Portland go: do they leave
        Oregon? Or do they move to suburbs further away from the city center?
      </p>
      <h4 style={imgHeadingStyle}>
        Voters From Four Neighborhoods Who Were 21 in 2006 Have Dispersed Across
        the City
      </h4>
      <img
        style={imgStyle}
        src={`${s3}YoungPersonMigration.gif`}
        alt="Voters From Four Neighborhoods Who Were 21 in 2006 Have Dispersed Across the City"
      />
      <p>
        Even 10 years later, a majority of voters who were 21 in 2006 have
        remained in Portland.
      </p>
      <img
        style={imgStyle}
        src={`${s3}TravelingYouthStats.png`}
        alt="Traveling Youth Statistics"
      />

      <h3 style={headingStyle}>New Voters</h3>
      <p>
        An analysis of only new voters shows that in 2008 there were many new
        voters across all age groups. In 2016, by contrast, newly registered
        voters are overwhelmingly slanted towards younger age groups. Further
        analysis of voting records across Oregon and other states might help
        shed light on the factors leading to this surprising shift.
      </p>
      <img
        style={imgStyle}
        src={`${s3}NewVoter2008to2016.png`}
        alt="Age Distribution of Voters in 2008 and 2016"
      />
    </div>
  </CivicStoryCard>
);

export default TempVoterRegistration;
