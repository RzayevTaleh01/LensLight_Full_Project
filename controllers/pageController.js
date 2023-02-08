const getIndexPage = (req, res) => {
    res.render("index", {
        link: "index"
    })
}

const getAboutPage = (req, res) => {
    res.render("about", {
        link: "about"
    })
}

const getRegisterPage = (req, res) => {
    res.render("register", {
        link: "register"
    })
}

const getLoginPage = (req, res) => {
    res.render("login", {
        link: "login"
    })
}

const getLogout = (req, res) => {
    //cookienin silinmesi vaxtini 1ms veririk
    res.cookie("jsonwebtoken", "", {
        maxAge: 1,
    });
    res.redirect("/")
}

export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage,getLogout };