import React from 'react';
import fetch from 'isomorphic-fetch';
import StoryCard from '../StoryCard/StoryCard';
import '../StoryCard/StoryCard.css';
import '../StoryCard/StoryFooter.css';
import '../StoryCard/StoryLink.css';
import Budget101 from '../Budget101';
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
import { saBubbleData } from '../MyTest/utils';
import { data, colors } from '../StackedAreaChart/utils';
import {
  OVERALL_BUDGET,
  BUDGET_BY_SERVICE_AREA,
  BUDGET_BY_BUREAU,
  BUDGET_BY_PROGRAM,
  BUDGET_101,
} from '../constants';
import { serviceAreaOptions, bureauOptions, serviceAreaBubbleDataFTW,
bureauDataByYear, psProgramData } from '../../data';


const yearList = _.range(2006, 2016);
const sliderMin = _.min(yearList);
const sliderMax = _.max(yearList);
const fiscalYearList = _.map(yearList, year => {
  const yearString = _.toString(year);
  return `FY${yearString}`;
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
      currentYear: fiscalYearList[7],
      data: null,
      currentServiceArea: "PS",
      currentBureau: "FR",
    }
    // this.getData = this.getData.bind(this);
    // this.getAllData = this.getAllData.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    // this.getServiceAreaByFiscalYear = this.getServiceAreaByFiscalYear.bind(this);
    // this.getSaSumByFiscalYear = this.getSaSumByFiscalYear.bind(this);
    this.onServiceAreaSelect = this.onServiceAreaSelect.bind(this);
    this.onBureauSelect = this.onBureauSelect.bind(this);

  }

  // componentDidMount() {
  //   this.getAllData();
  // }


  // getServiceAreaByFiscalYear() {
  //   const saData = this.state.data.hasOwnProperty("serviceAreas") ?
  //   this.state.data.serviceAreas : [];
  //   return saData.length && _.groupBy(saData, obj => obj.fiscal_year) || [];
  // }

  // getSaSumByFiscalYear() {
  //   const saData = this.state.data.hasOwnProperty("serviceAreas") ?
  //   this.state.data.serviceAreas : [];
  //   const saByFiscalYear = saData.length && _.groupBy(saData, obj => obj.fiscal_year);
  //   const saSumByYear = saData.length && _.map(
  //     saByFiscalYear, year => ({ [year[0].fiscal_year]: _.sumBy(year, 'amount')}));
  //     console.log('saData', saData);
  //     console.log('saByFiscalYear', saByFiscalYear);
  //     console.log('saSumByYear', saSumByYear);
  //     return saSumByYear;
  // }
  //
  // getData (url, dataName) {
  //   this.setState({ isLoading: true })
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(resData => {
  //   this.setState({data: {
  //     ...this.state.data,
  //     [dataName]: resData.results
  //   },  isLoading: false});
  //   })
  //   .catch(err => {
  //     console.error(err)
  //     this.setState({isLoading: false});
  //   })
  // }
  //
  // getAllData () {
  //   this.getData(SACodeUrl, "serviceAreaCodes");
  //   this.getData(serviceAreaUrl, "serviceAreas");
  //   this.getData(bureauCodeUrl, "bureauCodes");
  //   this.getData(bureausUrl, "bureaus");
  // }
  onBureauSelect (obj) {
    this.setState({ currentBureau: obj.value})
  }

  onSliderChange (value) {
    this.setState({currentYear: `FY${value}`})
  }

  onServiceAreaSelect (obj) {
    this.setState({ currentServiceArea: obj.value});
  }

  render () {
    console.log('state', this.state);
    console.log('saBubbleData', saBubbleData);

    const markObjects = _.map(yearList,
      (year, i) => ({[year]: fiscalYearList[i]})
    );
    const marks = Object.assign({}, ...markObjects);

    return (
      <div>
        <StickyContainer>
          <div className="budget-card-collection__intro-hero">
            <h1 className="budget-heading Rubik">Run the Numbers</h1>
            <p className="budget_card_collection__intro-hero-text">
              Some intro text will go here. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="ten-year__wrapper">
            <h3 className="budget-heading Rubik">10 Years</h3>
            <h3>City of Portland Service Area Budget</h3>
            <div className="ten-year__stacked-area-wrapper">
              <StackedArea width={800} />
            </div>
          </div>
          <Sticky>
          <div className="budget-card-collection__sticky-controller">
          <p>Controller Section: Dropdown or slider by year (10 year time period available) Need: Determine interction point + consider that data might be added in at an additional time (next year). This will be sticky and will apply to all story sections below.</p>
          <p> Current year: <span className="budget-current-year">{this.state.currentYear}</span></p>
          <ReactSlider
          min={sliderMin}
          max={sliderMax}
          marks={marks}
          step={1}
          included={false}
          onChange={this.onSliderChange}
          value={Number(this.state.currentYear.replace('FY', ''))}
          />
          </div>
          </Sticky>
          <StoryCard
            title="Budget By Service Area"
            collectionId="budget"
            cardId={BUDGET_BY_SERVICE_AREA}>
            <BubbleChart data={serviceAreaBubbleDataFTW[this.state.currentYear]} />
          </StoryCard>
          <StoryCard title="Budget By Service Area">
            <Select
            name="service-area-to-bureau"
            options={serviceAreaOptions}
            onChange={this.onServiceAreaSelect}
            cardId={BUDGET_BY_BUREAU}
            collectionId="budget"
            />
          </StoryCard>
        </StickyContainer>
          <Budget101 />
      </div>
    )
  }
}

export default CardCollection;
