import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActionTypes, setUserData } from '../../store/actions/userAction';
import { isEmail } from '../../utilities/utility';
import { baseUrl } from '../../utilities/service';

class Auth extends React.Component {
  state = {
    email: 'prem@gmail.com',
    password: 'prem0501'
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    console.log(this.props);
    return (
      <div className="container form-container">
        <div className="row">
          <div className="col col-12">
            <h1>Login</h1>
            <form onSubmit={(e) => this.props.login(e, this.state.email, this.state.password, this.props.location.state)}>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Enter email" value={this.state.email}
                  onChange={e => this.handleChange(e)} name="email" />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" value={this.state.password}
                  onChange={e => this.handleChange(e)} name="password" />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  login: async (e, email, password, from) => {
    e.preventDefault();
    if (isEmail(email) && password !== '') {
      const res = await fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 1) {
        dispatch(setUserData(userActionTypes.LOGIN, true, data.data));
        console.log(from && from.from ? from.from.pathname : '/');
        return <Redirect to={(from && from.from ? from.from.pathname : '/')} />
      }
      else {
        console.log("error");
      }
    }
  }
})
export default connect(null, mapDispatchToProps)(Auth);