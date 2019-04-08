import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

export class LoginText extends Component {
    render() {
        return (
            <article className={"login-text"} >
                {this.props.currentUser &&
                  <div>
                    <p>Hello, {this.props.currentUser.email}</p>
                  </div>
                }
            </article>
        );
    }
}

LoginText.propTypes = {
  currentUser: PropTypes.object
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginText);
