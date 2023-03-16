import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../Home/Home.jsx";
import LoginForm from "../Login/LoginForm.jsx";
import Signup from "../SignUp/SignUp.jsx";
import EnterpriseDashboard from "../enterepriseDashboard/enterpriseDashboard.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<Signup />} />
				<Route path="/login" exact element={<LoginForm />} />
				<Route path="/home" exact element={<Home />} />

				<Route
					path="/myenterprise"
					exact
					element={<EnterpriseDashboard />}
				/>
				<Route path="/signup" exact element={<Signup />} />
			</Routes>
		</Router>
	);
}

export default App;
