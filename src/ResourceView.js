import Icon from 'antd/lib/icon'
import { PropTypes } from 'prop-types'
import React, { Component } from 'react'

class ResourceView extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    schedulerData: PropTypes.object.isRequired,
    contentScrollbarHeight: PropTypes.number.isRequired,
    slotClickedFunc: PropTypes.func,
    slotItemTemplateResolver: PropTypes.func,
    toggleExpandFunc: PropTypes.func,
  }

  render() {
    const {
      schedulerData,
      contentScrollbarHeight,
      slotClickedFunc,
      slotItemTemplateResolver,
      toggleExpandFunc,
    } = this.props
    const { renderData } = schedulerData

    let width = schedulerData.getResourceTableWidth() - 2
    let paddingBottom = contentScrollbarHeight
    let displayRenderData = renderData.filter(o => o.render)
    let resourceList = displayRenderData.map(item => {
      let indents = []
      for (let i = 0; i < item.indent; i++) {
        indents.push(<span key={`es${i}`} className="expander-space"></span>)
      }
      let indent = <span key={`es${item.indent}`} className="expander-space"></span>
      if (item.hasChildren) {
        indent = item.expanded ? (
          <Icon
            type="minus-square"
            key={`es${item.indent}`}
            style={{}}
            className=""
            onClick={() => {
              if (!!toggleExpandFunc) {
                toggleExpandFunc(schedulerData, item.slotId)
              }
            }}
          />
        ) : (
          <Icon
            type="plus-square"
            key={`es${item.indent}`}
            style={{}}
            className=""
            onClick={() => {
              if (!!toggleExpandFunc) {
                toggleExpandFunc(schedulerData, item.slotId)
              }
            }}
          />
        )
      }
      indents.push(indent)

      let resourceRightSide = null
      if (item.resourceRightSide) {
        resourceRightSide = (
          <div className={"resource-right-side"}>{item.resourceRightSide}</div>
        )
      }
      console.log(resourceRightSide, item.resourceRightSide)

      let slotItem
      if (slotClickedFunc != undefined) {
        slotItem = (
          <a
            title={item.slotName}
            className="overflow-text header2-text clickable"
            style={{ textAlign: 'left' }}
            onClick={() => slotClickedFunc(schedulerData, item)}
          >
            <span className="slot-cell">
              {indents}
              <span className="slot-text">{item.slotName}</span>
              {resourceRightSide}
            </span>
          </a>
        )
      } else {
        slotItem = (
          <div
            title={item.slotName}
            className="overflow-text header2-text non-clickable"
            style={{ textAlign: 'left' }}
          >
            <span className="slot-cell">
              {indents}
              <span className="slot-text">{item.slotName}</span>
              {resourceRightSide}
            </span>
          </div>
        )
      }

      if (!!slotItemTemplateResolver) {
        let temp = slotItemTemplateResolver(
          schedulerData,
          item,
          slotClickedFunc,
          width,
          'overflow-text header2-text',
        )
        if (!!temp) {
          slotItem = temp
        }
      }

      let tdStyle = { height: item.rowHeight }
      if (item.groupOnly) {
        tdStyle = {
          ...tdStyle,
          backgroundColor: schedulerData.config.groupOnlySlotColor,
        }
      }

      return (
        <tr key={item.slotId}>
          <td data-resource-id={item.slotId} style={tdStyle} className={item.groupOnly ? 'group-only' : ''}>
            {slotItem}
          </td>
        </tr>
      )
    })

    return (
      <div style={{ paddingBottom: paddingBottom }}>
        <table className="resource-table">
          <tbody>{resourceList}</tbody>
        </table>
      </div>
    )
  }
}

export default ResourceView
