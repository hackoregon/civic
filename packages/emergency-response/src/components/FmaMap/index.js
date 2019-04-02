import React from 'react'
import { BaseMap, MapOverlay } from '@hackoregon/component-library'
import { isEmpty } from 'ramda'
import { connect } from 'react-redux'
import {
    getFmasThunk,
    getFmasData,
    renderFmaPanelProperties,
    getFmaPanelData,
} from '../../state'
import MapPanel from '../MapPanel/index'

class FmaMap extends React.Component {
    componentDidMount() {
        const { getFmas } = this.props
        getFmas()
    }

    render() {
        const { fmasData, fmaPanelData, renderPanel } = this.props

        return (
            <div>
                {fmasData && (
                    <BaseMap>
                        <MapOverlay
                            data={fmasData}
                            opacity={0.1}
                            filled
                            stroked
                            getPosition={f => f.geometry.coordinates}
                            onLayerClick={info =>
                                renderPanel(info.object.properties)
                            }
                            getElevation={f => 100}
                            getFillColor={f => [0, 100, 255, 255]}
                            getLineColor={f => [220, 69, 86, 255]}
                        />
                    </BaseMap>
                )}
                {fmaPanelData && !isEmpty(fmaPanelData) ? (
                    <MapPanel />
                ) : (
                    <h6>Click on an FMA to view some statistics</h6>
                )}
            </div>
        )
    }
}

export default connect(
    state => ({
        fmasData: getFmasData(state.emergency || state),
        fmaPanelData: getFmaPanelData(state.emergency || state),
    }),
    dispatch => ({
        getFmas: () => dispatch(getFmasThunk()),
        renderPanel: fmaProperties =>
            dispatch(renderFmaPanelProperties(fmaProperties)),
    })
)(FmaMap)
