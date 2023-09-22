import { lazy, Suspense } from "react";
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

// PAGE
const PageHomeComponent = lazy(() => import("../components/pages/Page-Home-Component/Page-Home-Component"));
const PageProductsComponent = lazy(() => import("../components/pages/Page-Products-Component/Page-Products-Component"));
const PageProductDetailComponent = lazy(() => import("../components/pages/Page-Product-Detail-Component/Page-Product-Detail-Component"));
const PageProductBookingComponent = lazy(() => import("../components/pages/Page-Product-Booking-Component/Page-Product-Booking-Component"));
const PageTransactionComponent = lazy(() => import("../components/pages/Page-Transaction-Component/Page-Transaction-Component"));
const PareSearchComponent = lazy(() => import("../components/pages/Page-Search-Component/Page-Search-Component"));
const PageFlightComponent = lazy(() => import("../components/pages/Page-Flight-Component/Page-Flight-Component"));
const PageCarRentalComponent = lazy(() => import("../components/pages/Page-Car-Rental-Component/Page-Car-Rental-Component"));
const PageAttractionComponent = lazy(() => import("../components/pages/Page-Attraction-Component/Page-Attraction-Component"));
const PageAiportTaxiComponent = lazy(() => import("../components/pages/Page-Aiport-Taxis-Component/Page-Aiport-Taxis-Component"));
const PageExceptionComponent = lazy(() => import("../components/pages/Page-Exception-Component/Page-Exception-Component"));

// AUTH
const PageAuthComponent = lazy(() => import("../components/Page-Auth/Page-Auth-Component"));
const PageAuthSigninComponent = lazy(() => import("../components/Page-Auth/Page-Auth-Signin-Component/Page-Auth-Signin-Component"));
const PageAuthRegisterComponent = lazy(() => import("../components/Page-Auth/Page-Auth-Register-Component/Page-Auth-Register-Component"));

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Suspense fallback={<p>Loading...</p>}><PageExceptionComponent /></Suspense>,
        children: [
            {
                index: true,
                loader: () => import("../components/pages/Page-Home-Component/Page-Home-Component").then((m) => m.loader()),
                element: <Suspense fallback={<p>Loading...</p>}><PageHomeComponent /></Suspense>
            },
            {
                path: "products/:hotel",
                loader: ({request, params}) => import("../components/pages/Page-Products-Component/Page-Products-Component").then((m) => m.loader(request, params)),
                element: <Suspense fallback={<p>Loading...</p>}><PageProductsComponent /></Suspense>
            },
            {
                path: "product-detail/:hotel/:room",
                loader: ({request, params}) => import("../components/pages/Page-Product-Detail-Component/Page-Product-Detail-Component").then((m) => m.loader(request, params)),
                element: <Suspense fallback={<p>Loading...</p>}><PageProductDetailComponent /></Suspense>
            },
            {
                path: "product-booking/:hotel/:room",
                loader: ({request, params}) => import("../components/pages/Page-Product-Booking-Component/Page-Product-Booking-Component").then((m) => m.loader(request, params)),
                element: <Suspense fallback={<p>Loading...</p>}><PageProductBookingComponent /></Suspense>
            },
            {
                path: 'transaction/:token',
                loader: ({request, params}) => import("../components/pages/Page-Transaction-Component/Page-Transaction-Component").then((m) => m.loader(request, params)),
                element: <Suspense fallback={<p>Loading...</p>}><PageTransactionComponent /></Suspense>
            },
            {
                path: 'search',
                element: <Suspense fallback={<p>Loading...</p>}><PareSearchComponent /></Suspense>
            },
            {
                path: 'flight',
                element: <Suspense fallback={<p>Loading...</p>}><PageFlightComponent /></Suspense>
            },
            {
                path: "car-rental",
                element: <Suspense fallback={<p>Loading...</p>}><PageCarRentalComponent /></Suspense>
            },
            {
                path: 'attraction',
                element: <Suspense fallback={<p>Loading...</p>}><PageAttractionComponent /></Suspense>
            },
            {
                path: 'aiport-taxi',
                element: <Suspense fallback={<p>Loading...</p>}><PageAiportTaxiComponent /></Suspense>
            }
        ]
    },
    {
        path: 'auth',
        element: <Suspense fallback={<p>Loading...</p>}><PageAuthComponent /></Suspense>,
        children: [
            {
                path: 'signin',
                element: <Suspense fallback={<p>Loading...</p>}><PageAuthSigninComponent /></Suspense>
            },
            {
                path: 'register',
                element: <Suspense fallback={<p>Loading...</p>}><PageAuthRegisterComponent /></Suspense>
            }
        ]
    }
]);

export default Router;