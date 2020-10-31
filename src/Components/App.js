import React from "react";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personal_info: {
                first_name: undefined, // REQUIRED
                last_name: undefined, // NOT REQUIRED
                about: undefined // NOT REQUIRED
            },
            additional_info: {
                age: undefined, // 1, 2, 3, 4, ... // REQUIRED
                email: undefined, // REQUIRED
                password: undefined // REQUIRED
            },
            accounts_info: {
                google: undefined, // REQUIRED
                facebook: undefined, // NOT REQUIRED
                instagram: undefined, // NOT REQUIRED
            },
            isFormSubmitted: false,
        }
        this.personal_infoSubmitted = this.personal_infoSubmitted.bind(this)
        this.additionalInfoSubmitted = this.additionalInfoSubmitted.bind(this)
        this.accountsInfoSubmitted = this.accountsInfoSubmitted.bind(this)
    }

    personal_infoSubmitted(e) {
        e.preventDefault()
        this.setState({
            personal_info: {
                first_name: this.refs.first_name.value,
                last_name: this.refs.last_name.value,
                about: this.refs.about.value
            }
        }, () => {
            document.querySelector(".person-icon").classList.remove("u-color-pink")
            document.querySelector(".person-icon").classList.add("u-color-light-blue")
            document.querySelector(".analytics-icon").classList.add("u-color-pink")
        })
    }

    additionalInfoSubmitted(e) {
        e.preventDefault()
        this.setState({
            additional_info: {
                age: this.refs.age.value,
                email: this.refs.email.value,
                password: this.refs.password.value
            }
        }, () => {
            document.querySelector(".analytics-icon").classList.remove("u-color-pink")
            document.querySelector(".analytics-icon").classList.add("u-color-light-blue")
            document.querySelector(".terminal-icon").classList.add("u-color-pink")
        })
    }

    accountsInfoSubmitted(e) {
        e.preventDefault()
        this.setState({
            account_info: {
                google: this.refs.google_account.value,
                facebook: this.refs.facebook_account.value,
                instagram: this.refs.instagram_account.value
            },
            isFormSubmitted: true
        }, () => {
            document.querySelector(".terminal-icon").classList.remove("u-color-pink")
            document.querySelector(".terminal-icon").classList.add("u-color-light-blue")
        })
    }


    render() {
        let personal_info;
        let additional_info;
        let accounts_info

        const className = "form-control u-margin-bottom-1"
        if (!this.state.personal_info.first_name) {
            personal_info = (
                <form onSubmit={this.personal_infoSubmitted}>
                    <input type="text" className={className} placeholder="First Name..." ref="first_name" required
                           autoFocus/>
                    <input type="text" className={className} placeholder="Last Name..." ref="last_name"/>
                    <textarea className={className} ref="about"> </textarea>
                    <input type="submit" className="btn" value="Submit"/>
                </form>
            )
        } else if (!this.state.additional_info.age) {
            // We are only checking for age because we know that other two are required and we don't need to check them
            additional_info = (
                <form onSubmit={this.additionalInfoSubmitted}>
                    <input type="number" className={className} placeholder="Age..." ref="age" required autoFocus/>
                    <input type="email" className={className} placeholder="Email" ref="email" required/>
                    <input type="password" className={className} placeholder="Password" ref="password" required/>
                    <input type="submit" className="btn" value="Submit"/>
                </form>
            )
        } else if (!this.state.accounts_info.google) {
            additional_info = undefined
            accounts_info = (
                <form onSubmit={this.accountsInfoSubmitted}>
                    <input type="url" className={className} placeholder="Google Account Link..." ref="google_account"
                           required autoFocus/>
                    <input type="url" className={className} placeholder="Facebook Account Link..."
                           ref="facebook_account" required/>
                    <input type="url" className={className} placeholder="Instagram Account Link..."
                           ref="instagram_account" required/>
                    <input type="submit" className="btn" value="Submit"/>
                </form>
            )
        }
        const fullName = this.state.personal_info.first_name + " " + (this.state.personal_info.last_name === undefined ? "" : this.state.personal_info.last_name);
        return (
            <div>
                {
                    !this.state.isFormSubmitted &&
                    (
                        <div>
                            {
                                this.state.personal_info.first_name &&
                                <p className="text-dark">We Are Happy To Here From You!&nbsp;
                                    <b className="text-dark">{fullName}</b>
                                </p>
                            }
                            {personal_info}
                            {additional_info}
                            {accounts_info}
                        </div>

                    )
                }
                {
                    this.state.isFormSubmitted &&
                    <p className="text-dark"><b className="text-dark">{fullName}</b>, We are going to discuss your
                        proposal. We are working on it. We will contact you soon.
                    </p>
                }
            </div>
        );
    }
}
