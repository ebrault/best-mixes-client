import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link, withRouter, Redirect } from 'react-router-dom'

class UpdateMix extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      mix: {
        dj: '',
        title: '',
        mix_type: '',
        genre: '',
        date: '',
        votes: '',
        comments: '',
        edited: false
      },
      flashMessage: ''
    }
    this.mix = this.state.mix
  }

  async componentDidMount() {
    const response = await axios.get(apiUrl + '/mixes/' + `${this.props.match.params.id}`,
      {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': `Token token=${this.state.user.token}`
        }
      }
    )
    this.setState({mix: response.data.mix})
  }

  handleChange = (event) => {
    const editedMix = {...this.state.mix, [event.target.name]: event.target.value}
    this.setState({mix: editedMix})
  }

  handleSubmit = async (event, user) => {
    event.preventDefault()

    const mixParams = JSON.stringify({mix: this.state.mix})
    const response = await axios({method: 'patch',
      url: apiUrl + '/mixes/' + `${this.props.match.params.id}`,
      data: mixParams,
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${this.state.user.token}`
      }
    }
    )

    this.props.history.push('/mixes')
  }

  render() {
    const { id, user } = this.props
    const { mix } = this.state
    if(this.state.edited === true) {
      return <Redirect to='/mixes'/>
    }
    return(
      <React.Fragment>
        <div className="IndexMixes">
          <h1>Edit Mix</h1>
          <p>{this.state.flashMessage}</p>
          <form>
            <input name='dj' type="text" value={this.state.mix.dj} onChange={this.handleChange} placeholder='DJ' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='title' type="text" value={this.state.mix.title} onChange={this.handleChange} placeholder='Title' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='mix_type' type="text" value={this.state.mix.mix_type} onChange={this.handleChange} placeholder='Type' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='genre' type="text" value={this.state.mix.genre} onChange={this.handleChange} placeholder='Genre' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='date' type="text" value={this.state.mix.date} onChange={this.handleChange} placeholder='Date' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='votes' type="text" value={this.state.mix.votes} onChange={this.handleChange} placeholder='Votes' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='comments' type="text" value={this.state.mix.comments} onChange={this.handleChange} placeholder='Comments' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <button type='submit' onClick={(event) => this.handleSubmit(event, user)}>Update</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter (UpdateMix)
