import React from 'react'
import fetch from 'isomorphic-fetch'
import StoryCard from '../StoryCard/StoryCard'
import '../StoryCard/StoryCard.css'
import '../StoryCard/StoryFooter.css'
import '../StoryCard/StoryLink.css'
import Budget101 from '../Budget101'
import StackedArea from '../StackedAreaChart'
import { HorizontalBarChart } from '@hackoregon/component-library'
import { StickyContainer, Sticky } from 'react-sticky'
import _ from 'lodash'
import ReactSlider from 'rc-slider'
import './CardCollection.css'
import Select from 'react-select'
import { saBubbleData } from '../MyTest/utils'
import { data, colors } from '../StackedAreaChart/utils'
import {
  OVERALL_BUDGET,
  BUDGET_BY_SERVICE_AREA,
  BUDGET_BY_BUREAU,
  BUDGET_BY_PROGRAM,
  BUDGET_101,
} from '../constants'
import {
  serviceAreaOptions,
  bureauOptions,
  serviceAreaBubbleDataFTW,
  bureauDataByYear,
  psProgramData,
} from '../../data'

const yearList = [2013, 2014]
const sliderMin = _.min(yearList)
const sliderMax = _.max(yearList)
const fiscalYearList = _.map(yearList, year => {
  const yearString = _.toString(year)
  return `FY${yearString}`
})
const API_ROOT = 'http://service.civicpdx.org/budget/'
const SACodeUrl = `${API_ROOT}code/?code_type=service_area_code&format=json`
const bureauCodeUrl = `${API_ROOT}code/?code_type=bureau_code&format=json`
const serviceAreaUrl = `${API_ROOT}history/service_area/?format=json`
const bureausUrl = `${API_ROOT}history/bureau/?format=json`

const urlsAndNames = [
  { name: 'ServiceAreaCodes', SACodeUrl },
  { name: 'ServiceAreas', serviceAreaUrl },
  { name: 'BureauCodes', bureauCodeUrl },
  { name: 'bureaus', bureausUrl },
]

class CardCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      currentYear: fiscalYearList[0], // FY2013
      currentServiceArea: 'PS',
      currentBureau: 'FR',
    }
    // this.getData = this.getData.bind(this);
    // this.getAllData = this.getAllData.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this)
    // this.getServiceAreaByFiscalYear = this.getServiceAreaByFiscalYear.bind(this);
    // this.getSaSumByFiscalYear = this.getSaSumByFiscalYear.bind(this);
    this.onServiceAreaSelect = this.onServiceAreaSelect.bind(this)
    this.onBureauSelect = this.onBureauSelect.bind(this)
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
  getAllData() {
    this.getData(SACodeUrl, 'serviceAreaCodes')
    this.getData(serviceAreaUrl, 'serviceAreas')
    this.getData(bureauCodeUrl, 'bureauCodes')
    this.getData(bureausUrl, 'bureaus')
  }
  onBureauSelect(obj) {
    this.setState({ currentBureau: obj.value })
  }

  onSliderChange(value) {
    this.setState({ currentYear: `FY${value}` })
  }

  onServiceAreaSelect(obj) {
    this.setState({ currentServiceArea: obj.value })
  }

  render() {
    console.log('state', this.state)
    console.log('saBubbleData', saBubbleData)

    const markObjects = _.map(yearList, (year, i) => ({ [year]: `FY${year}` }))
    const marks = Object.assign({}, ...markObjects)

    return (
      <div className="budget-card-collection">
        <StickyContainer className="budget-card-collection__sticky-container">
          <div className="budget-card-collection__intro-hero">
            <h1 className="budget-heading Rubik">Run the Numbers</h1>
            <p className="budget_card_collection__intro-hero-text">
              Portland's city budget is arguably the city's most important
              policy document. The budget contains the plan for spending our
              collective resources across city programs and services. Yet,
              annual budget decisions often receive far less attention than
              other questions considered at City Hall. Explore 10 years worth of
              budget data, learn where Portland spends its money, and get
              involved in the decision-making!
            </p>
          </div>
          <div className="ten-year__wrapper">
            <div className="ten-year__stacked-area-wrapper">
              <StackedArea />
            </div>
          </div>
        </StickyContainer>
        <Budget101 />
      </div>
    )
  }
}

export default CardCollection
