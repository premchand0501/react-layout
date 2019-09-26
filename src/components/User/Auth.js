import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { isEmail } from '../../utilities/utility';
import { baseUrl, authenticate } from '../../utilities/service';
import { saveUserData } from '../../store/actions/userAction';

class Auth extends React.Component {
  state = {
    email: 'prem@gmail.com',
    password: 'prem0501',
    checkingLoginStatus: false,
    from: ''
  }
  async componentDidMount() {
    const userData = await authenticate({ id: localStorage.getItem('id') });
    // console.log(this.props.location);
    if (userData != null) {
      return <Redirect to="/" />
    }
    else {
      this.setState({
        checkingLoginStatus: true,
        from: this.props.location.state ? this.props.location.state.from.pathname : '/'
      })
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  async proceedToLogin(e) {
    e.preventDefault();
    if (isEmail(this.state.email) && this.state.password !== '') {
      const res = await fetch(`${baseUrl}/auth`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 1) {
        await this.props.saveUserDataFunc(data.data);
      }
      else {
        console.log("error");
      }
    }
  }
  render() {
    const { loginStatus } = this.props.userReducer;
    // console.log(this.props);
    if (loginStatus) {
      return <Redirect to={`${this.state.from}`} />
    }
    return this.state.checkingLoginStatus ? (
      <div className="container form-container">
        <div className="row">
          <div className="col col-12">
            <div className="card">
              <div className="card-body">
                <h1>Login</h1>
                <form onSubmit={(e) => this.proceedToLogin(e)}>
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
        </div>
      </div>
    ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col col-12 mt-3">
              Authenticating...
            </div>
          </div>
        </div>
      );
  }
}
const matStateToProps = (state) => ({
  userReducer: state.userReducer
})
const mapDispatchToProps = (dispatch) => ({
  saveUserDataFunc: async (data) => {
    await dispatch(saveUserData(data));
  }
})
export default connect(matStateToProps, mapDispatchToProps)(Auth);