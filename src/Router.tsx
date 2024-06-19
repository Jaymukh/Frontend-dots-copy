import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { RouteConstants } from "./constants";
import { useRecoilValue } from "recoil";
import { authState } from './states';
import StoryDetailsContainer from './containers/StoryDetailsContainer';
import { Spinner } from "./components/ui/spinner/Spinner";

interface ProtectedRouteProps {
    auth: any;
    redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, redirectPath }) => {
    if (!auth || !Object.keys(auth).length) {
        return <Navigate to={redirectPath} />;
    }
    return <Outlet />;
}

const Router = () => {
    const auth = useRecoilValue(authState);

    const Login = React.lazy(() => import("./components/login/Login"));
    const UpdatePassword = React.lazy(() => import("./components/login/UpdatePassword"));
    const HomeContainer = React.lazy(() => import("./containers/HomeContainer"));
    const DashboardContainer = React.lazy(() => import("./containers/DashboardContainer"));
    const StoryContainer = React.lazy(() => import("./containers/StoryContainer"));
    const ProfileContainer = React.lazy(() => import("./containers/ProfileContainer"));

    return (
        <Suspense fallback={
            <Spinner spinnerFlag={true} />
        }>
            <Routes>
                <Route path={RouteConstants.login} element={auth && Object.keys(auth).length ? <Navigate to={RouteConstants.root} /> : <Login />} />
                <Route path={RouteConstants.update_password} element={<UpdatePassword />} />
                <Route element={<ProtectedRoute auth={auth} redirectPath={RouteConstants.login} />}>
                    {/* <Route path={RouteConstants.root} element={<HomeContainer />} /> */}
                    <Route path={RouteConstants.root} element={<HomeContainer />} />
                    <Route path={RouteConstants.dashboards} element={<DashboardContainer />} />
                    <Route path={RouteConstants.stories} element={<StoryContainer />} />
                    <Route path={RouteConstants.story_details} element={<StoryDetailsContainer />} />
                    <Route path={RouteConstants.profile} element={<ProfileContainer />} />
                    <Route path={RouteConstants.settings} element={<ProfileContainer />} />
                    <Route path={RouteConstants.invite} element={<ProfileContainer />} />
                </Route>
            </Routes>
        </Suspense >
    );
};

export default Router;
