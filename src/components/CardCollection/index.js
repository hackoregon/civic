import React from 'react';
import fetch from 'isomorphic-fetch';
import StoryCard from '../StoryCard/StoryCard';
import '../StoryCard/StoryCard.css';
import '../StoryCard/StoryFooter.css';
import '../StoryCard/StoryLink.css';
import StackedArea from '../StackedAreaChart';
import BubbleChart from '../MyTest/BubbleChart';
import Example from '../Example';
import { StickyContainer, Sticky } from 'react-sticky';
import _ from 'lodash';
import ReactSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './CardCollection.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { bubbleData } from '../MyTest/utils';
import { data, colors } from '../StackedAreaChart/utils';


const yearList = _.range(2006, 2018);
const fiscalYearList = _.map(yearList, year => {
  const yrPlus = _.toString(year + 1);
  const yearString = _.toString(year);
  return `${yearString}-${yrPlus.substring(yrPlus.length - 2)}`;
});
const API_ROOT = "http://service.civicpdx.org/budget/";
const SACodeUrl = `${API_ROOT}code/?code_type=service_area_code&format=json`;
const bureauCodeUrl = `${API_ROOT}code/?code_type=bureau_code&format=json`;
const serviceAreaUrl =  `${API_ROOT}history/service_area/?format=json`;
const bureausUrl = `${API_ROOT}history/bureau/?format=json`;

const urlsAndNames = [
  {name: "ServiceAreaCodes", SACodeUrl},
  {name: "ServiceAreas", serviceAreaUrl},
  {name: "BureauCodes", bureauCodeUrl},
  {name: "bureaus", bureausUrl},
];

class CardCollection extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
      currentYear: 2006,
      currentServiceArea: "",
      currentBureau: "",
      yearList: yearList,
    }
    this.getData = this.getData.bind(this);
    this.getAllData = this.getAllData.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.getServiceAreaByFiscalYear = this.getServiceAreaByFiscalYear.bind(this);
    this.getSaSumByFiscalYear = this.getSaSumByFiscalYear.bind(this);

  }

  componentDidMount() {
    this.getAllData();
  }


  getServiceAreaByFiscalYear() {
    const saData = this.state.data.hasOwnProperty("serviceAreas") ?
    this.state.data.serviceAreas : [];
    return saData.length && _.groupBy(saData, obj => obj.fiscal_year) || [];
  }

  getSaSumByFiscalYear() {
    const saData = this.state.data.hasOwnProperty("serviceAreas") ?
    this.state.data.serviceAreas : [];
    const saByFiscalYear = saData.length && _.groupBy(saData, obj => obj.fiscal_year);
    const saSumByYear = saData.length && _.map(
      saByFiscalYear, year => ({ [year[0].fiscal_year]: _.sumBy(year, 'amount')}));
      console.log('saData', saData);
      console.log('saByFiscalYear', saByFiscalYear);
      console.log('saSumByYear', saSumByYear);
      return saSumByYear;
  }

  getData (url, dataName) {
    this.setState({ isLoading: true })
    fetch(url)
    .then(res => res.json())
    .then(resData => {
    this.setState({data: {
      ...this.state.data,
      [dataName]: resData.results
    },  isLoading: false});
    })
    .catch(err => {
      console.error(err)
      this.setState({isLoading: false});
    })
  }

  getAllData () {
    this.getData(SACodeUrl, "serviceAreaCodes");
    this.getData(serviceAreaUrl, "serviceAreas");
    this.getData(bureauCodeUrl, "bureauCodes");
    this.getData(bureausUrl, "bureaus");
  }

  onSliderChange (value) {
    this.setState({currentYear: value})
  }


  render () {
    console.log('state', this.state);
    const markObjects = _.map(yearList,
      year => ({[year]: _.toString(year)})
    );
    const marks = Object.assign({}, ...markObjects);
    const saDataByYear = this.getServiceAreaByFiscalYear()
    const saNamesByCode = _.map(this.state.data.serviceAreaCodes,
      sa => ({
        [sa.code]: sa.description
      })
    )

    console.log("aejroig", bubbleData)

    return (
      <div>
        <StickyContainer>
          <div className="budget-card-collection__intro-hero">
            <h1>CardCollection here</h1>
            <p className="collection__intro-hero-text">
              Some intro text will go here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <Sticky>
            <div className="budget-card-collection__sticky-controller">
              <p>Controller Section: Dropdown or slider by year (10 year time period available) Need: Determine interction point + consider that data might be added in at an additional time (next year). This will be sticky and will apply to all story sections below.</p>
              <p> Slider is at: {this.state.currentYear}</p>
              <ReactSlider
                min={_.min(this.state.yearList)}
                max={_.max(this.state.yearList)}
                marks={marks}
                step={1}
                included={false}
                onChange={this.onSliderChange}
              />
            </div>
          </Sticky>
          <div className="data-display">
          <h3>10 Years</h3>
          <h3>City of Portland Budget</h3>
          {this.state.data.default === true ? "Error loading data. Sorry." : this.state.data.results }
          </div>
          <StackedArea />
          <StoryCard title="Overall Budget" style={{
            maxWidth: "800px",
          }}>
            <Select
              name="overall-to-service-area"
            />
          </StoryCard>
          <StoryCard title="Budget By Service Area">
            <BubbleChart data={bubbleData[0]['2007']} />
          </StoryCard>
        </StickyContainer>
      </div>
    )
  }
}

export default CardCollection;
