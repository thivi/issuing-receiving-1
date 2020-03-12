import React, { useState, useContext, useEffect, useReducer } from "react";
import { Grid, Paper, TextField, Button, Typography, Snackbar } from "@material-ui/core";
import useStyles from "../../theme";
import { SIGN_IN } from "../../shared/constants";
import { AuthContext } from "../../helpers";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { signIn } from "../../utils";

export const SignIn = (): React.ReactElement => {
	const classes = useStyles();
	const { authState, dispatch } = useContext(AuthContext);

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showError, setShowError] = useState(false);

	const history = useHistory();

	const onCloseError = () => {
		setError("");
		setShowError(false);
	};

	useEffect(() => {
		if (authState.authenticated) {
			history.push("/dashboard");
		}
	}, [authState.authenticated]);

	return (
		<>
			<Snackbar open={showError} autoHideDuration={6000} onClose={onCloseError}>
				<MuiAlert onClose={onCloseError} severity="error">
					{error}
				</MuiAlert>
			</Snackbar>
			<Grid container direction="row" justify="center" alignItems="center" className={classes.signInGrid}>
				<Grid item sm={4}>
					<Paper square className={classes.signInPaper}>
						<Grid container direction="column" spacing={3} alignItems="center">
							<Grid item sm={12}>
								<Typography variant="h5">Sign In</Typography>
							</Grid>
							<Grid item sm={12}>
								<TextField
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setUserName(e.target.value);
									}}
									id="username"
									required
									label="Username"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<TextField
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setPassword(e.target.value);
									}}
									id="password"
									required
									label="Password"
									type="password"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<Button
									onClick={() => {
										if (userName && password) {
											if (userName === "admin" && password === "admin") {
												signIn(dispatch, "mock");
											} else {
												setError("Username or password is incorrect.");
												setShowError(true);
											}
										} else {
											setError("Username and password cannot be empty.");
											setShowError(true);
										}
									}}
									variant="contained"
									color="primary"
									fullWidth
								>
									Sign In
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};
