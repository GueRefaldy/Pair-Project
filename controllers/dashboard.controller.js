class DashboardController {
  static index(req, res) {
    const {userId} = req.session;
    let isAuth = false;

    if (userId) {
      isAuth = true;
    }

    res.render('users/index', {isAuth});
  }
}

module.exports = DashboardController;