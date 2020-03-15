export default ({ router }) => {
  router.addRoutes([
    // Expire: Oct 2025.
    //{ path: '/concrete-architecture/apscheduler.html', redirect: '/architecture/apscheduler.html' },
    // Expire: Oct 2025.
    { path: '/apscheduler.html', redirect: '/architecture/apscheduler.html' },
    // Expire: Aug 2021.
    { path: '/wsgi.html', redirect: '/concepts/wsgi.html' },
    { path: '/url-dispatcher.html', redirect: '/concepts/url-dispatcher.html' },
    { path: '/timezone.html', redirect: '/concepts/timezone.html' },
    { path: '/time-consuming-jobs.html', redirect: '/concepts/time-consuming-jobs.html' },
    { path: '/sql-index.html', redirect: '/concepts/sql-index.html' },
    { path: '/single-assignment-store.html', redirect: '/concepts/single-assignment-store.html' },
    { path: '/sidecar.html', redirect: '/concepts/sidecar.html' },
  ])
}
