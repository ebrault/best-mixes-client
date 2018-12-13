import React, { component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import NewMix from './NewMix.js'
import UpdateMix from './UpdateMix.js'

class IndexMixes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      mixes: []
    }
  }
  async componentDidMount() {
    const response = await axios.get(apiUrl + '/mixes', {headers: {'Authorization': `Token token=${this.state.user.token}`}})
    this.setState({mixes: response.data.mixes})
  }

  async deleteMix(event, mixId) {
    event.preventDefault()
    await axios.delete(apiUrl + '/mixes/' + `${mixId}`, {headers: {'Authorization': `Token token=${this.state.user.token}`}})
    this.setState({mixes: this.state.mixes.filter(mix => mix.id !== mixId)})
  }

  render() {
    const { user } = this.props
    const mixRows = this.state.mixes.map(mix => {
      const { id, dj, title, mix_type, date, votes, comments } = mix
      return (
        <tr key={id} className="table-info">
          <td className="table-primary">{ dj }</td>
          <td className="table-primary">
            <Link to={`/mixes/${id}`}>{ title }</Link>
          </td>
          <td className="table-primary">{ mix_type }</td>
          <td className="table-primary">{ date }</td>
          <td className="table-primary">{ votes }</td>
          <td className="table-primary">{ comments }</td>
          <td>
            <Link to={`/mixes/${mix.id}/update`}>update</Link> | <a href="" onClick={(event) => this.deleteMix(event, mix.id)}>delete</a>
          </td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <div className="IndexMixes">
          <h1>Mixes</h1>
          <h3 style={{display: 'inline-block'}}>
            <Link to="/NewMix" className="btn btn-primary">Add Mix</Link>
          </h3>
          <table className="table">
            <tbody>
              {mixRows}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

export default IndexMixes
