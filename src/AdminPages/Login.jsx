import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LoginForm = () => {
	const [AntLoginForm] = Form.useForm();

	const [emailError, setEmailError] = useState({ enable: false, errorMsg: "" });
	const [pwdError, setPwdError] 				= useState({ enable: false, errorMsg: "" });

	useEffect(() => {
		console.log('useEffect Calling....')
		if (emailError.enable) {
			AntLoginForm.validateFields();
		}
		if (pwdError.enable) {
			AntLoginForm.validateFields();
		}
	}, [emailError,pwdError]); 

	const onFinish = async (postedData) => {
		try {
			const res = await axios.post(global.APP_ADMIN_API.URL + 'app_users.php', postedData)
			if (res.data.hasData) {
				sessionStorage.setItem('verifiedUsers', JSON.stringify(res.data.hasData))
			}
			if(res.data.errorFor=='EmailAddress') {
				setEmailError({ enable: true, errorMsg: res.data.msg });
			}
			if (res.data.errorFor=='WrongPassword') {
				setPwdError({ enable: true, errorMsg: res.data.msg });
			}
			if (res.data.errorFor=='Both') {
				setEmailError({ enable: true, errorMsg: res.data.msg });
				setPwdError({ 		enable: true, errorMsg: res.data.msg });
			}			
		} catch (e) {
			alert(e)
		}
	}

	return (
		<div className="login-page">
			<div className="login-box">
				<div className="illustration-wrapper">
					<img src={global.APP_ADMIN.LOGIN_SCREEN_IMG} alt="Login" />
				</div>
				<Form
					name="login-form"
					className="login-form"
					onFinish={onFinish}
					form={AntLoginForm}
					onChange={() => {
						if (emailError.enable) {
							setEmailError({ enable: false, errorMsg: "" });
						}
						if (pwdError.enable) {
							setPwdError({ enable: false, errorMsg: "" });
						}
					}}
					initialValues={{
						["userEmail"]: 'super@gmail.com',
						["userPassword"]: '123456',
					}}
				>
					<p className="form-title">Welcome Back</p>
					<p>Login to the Dashboard</p>
					<Form.Item style={{ padding: "2px 0" }}
						name="userEmail"
						rules={[{ required: true, message: 'Email Required' }, { whitespace: true, message: '' }, { type: 'email', message: 'Enter Valid Email' },

						() => ({
							validator() {
								if (emailError.enable) {
									return Promise.reject(emailError.errorMsg);
								}
								return Promise.resolve();
							}
						})

						]}
						hasFeedback
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email Address" value='super@gmail.com' />
					</Form.Item>

					<Form.Item style={{ padding: "2px 0" }}
						name="userPassword"
						rules={[{ required: true, message: 'Password Required' }, { type: 'password', message: 'Enter Password' },

						() => ({
							validator() {
								if (pwdError.enable) {
									return Promise.reject(pwdError.errorMsg);
								}
								return Promise.resolve();
							}
						})
					]}
						hasFeedback
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>

					<Form.Item>
						<Button htmlType="submit" type='default' className="login-form-button" icon={<PoweroffOutlined />}>
							{global.APP_ADMIN.LOGIN_BTN_TXT}
						</Button>

					</Form.Item>
				</Form>

			</div>
		</div >
	);

};

export default LoginForm;