import { ToastContainer } from "react-toastify";
import { DEFAULT_ROUTE, ROUTES } from "./router";
import { Route, Routes, Navigate } from "react-router-dom";
import { WithHtmlTitleRoute } from "@components";
import { useGlobalState } from "@hooks/";
import clsx from 'clsx';

function App() {
	const [{isDarkTheme}] = useGlobalState();

	return (
		<div className={clsx("App", { dark: isDarkTheme })}>
			<Routes>
				{ROUTES.map(
					({ htmlTitle, path, exact, element, ...props }, key) => (
						<Route
							key={key}
							exact={exact}
							path={path}
							element={
								<WithHtmlTitleRoute
									htmlTitle={htmlTitle}
									element={element}
									{...props}
								/>
							}
						/>
					)
				)}
				<Route
					path="*"
					element={<Navigate replace to={DEFAULT_ROUTE.path} />}
				/>
			</Routes>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default App;
