const ENVIRONMENT = {
    DEV: {
        URL: 'http://localhost:8080'
    },
    PRO: {
        URL: 'https://booking-t0o7.onrender.com'
    },
    LOCATION: {
        ROOT: "/api/client/location",
        AMOUNT: "/api/client/location/amount"
    },
    WORKER: `${window.location.origin}/assets/js/worker.js`,
    MODEL: 'PRO' // DEV
}
export default ENVIRONMENT;