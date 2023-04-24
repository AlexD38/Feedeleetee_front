import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home.jsx";
import LoginForm from "../Login/LoginForm.jsx";
import Signup from "../SignUp/SignUp.jsx";
import EnterpriseDashboard from "../enterepriseDashboard/enterpriseDashboard.jsx";
import ServicesInfos from "../enterepriseDashboard/servicesInfos/servicesInfos.jsx";
import OffersInfos from "../enterepriseDashboard/offersInfos/OffersInfos.jsx";
import AppointmentsInfos from "../enterepriseDashboard/appointmentsInfos/appointmentsInfos.jsx";
import ClientsInfos from "../enterepriseDashboard/clientsInfos/clientsInfos.jsx";
import CreateEnterprise from "../CreateEnterpriseFrom/CreateEnterpriseFrom.jsx";
import CreateClient from "../CreateClientForm/CreateClient.jsx";
import { ClientDashboard } from "../ClientDashboard.jsx";
import { TakeAppointment } from "../TakeAppointment.jsx";
import { HomePage } from "../HomePage.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact element={<HomePage />} />
				<Route path="/login" exact element={<LoginForm />} />
				<Route path="/home" exact element={<Home />} />

				<Route
					path="/myenterprise"
					exact
					element={<EnterpriseDashboard />}
				/>
				<Route path="/signup" exact element={<Signup />} />
				<Route
					path="/myenterprise/services"
					exact
					element={<ServicesInfos />}></Route>
				<Route
					path="/myenterprise/offers"
					exact
					element={<OffersInfos />}></Route>
				<Route
					path="/myenterprise/appointments"
					exact
					element={<AppointmentsInfos />}></Route>
				<Route
					path="/createenterprise"
					exact
					element={<CreateEnterprise />}></Route>
				<Route
					path="/createclient"
					exact
					element={<CreateClient />}></Route>
				<Route
					path="/myclientprofile"
					exact
					element={<ClientDashboard />}></Route>
				<Route
					path="/myenterprise/clients"
					exact
					element={<ClientsInfos />}></Route>
				<Route
					path="/takeappointment"
					exact
					element={<TakeAppointment />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
