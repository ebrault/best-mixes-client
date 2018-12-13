import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'


class ShowMix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      mix: {}
    }
  }

  async componentDidMount() {
    const response = await axios.get(apiUrl + '/mixes/' + `${this.props.match.params.id}`, {headers: {'Authorization': `Token token=${this.state.user.token}`}})
    this.setState({mix: response.data.mix})
  }

  render() {
    const { id, user} = this.props
    const { mix } = this.state
    return(
      <div>
        <h1>Mix</h1>
        <p>DJ: {mix.dj}</p>
        <p>Title: {mix.title}</p>
        <p>Type: {mix.mix_type}</p>
        <p>Genre: {mix.genre}</p>
        <p>Date: {mix.date}</p>
        <p>Votes: {mix.votes}</p>
        <p>Comments: {mix.comments}</p>
      </div>
    )
  }
}

export default ShowMix
