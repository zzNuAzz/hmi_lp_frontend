import HomePage from "./HomePage/HomePage";
import PlayPage from "./PlayPage/PlayPage";
import SettingPage from "./SettingPage/SettingPage";

export const ROUTES = [
    {
        path: "/",
        exact: true,
        element: HomePage,
        htmlTitle: "Home",
    },
    {
        path: "/play",
        exact: false,
        element: PlayPage,
        htmlTitle: "PlayPage",
    },
    {
        path:"/setting",
        exact: false,
        element: SettingPage,
        htmlTitle: "SettingPage",
    },
]

export const DEFAULT_ROUTE = ROUTES[0];