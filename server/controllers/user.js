import User from "../models/User.js";


const postSignUp = async (req, res) => {
    const { fullname, email, password, dob } = req.body;

    const user = new User({
        fullname,
        email,
        password,
        dob: new Date(dob)
    })

    try {
        
        const savedUser = await user.save();

        res.json({
            success: true,
            data: savedUser,
            message: "Signup Successfully"
        })
    } catch (err) {
        res.json({
            success: false,
            data: null,
            message: 'Please Enter All Fields'
        })

    }
}
const postLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email: email,
        password: password

    });

    if (user) {
        res.json({
            success: true,
            message: "Login Successfully",
            data: user,

        })
    }
    else {
        res.json({
            success: false,
            message: "Invalid Email or Password",
            data: null
        })
    }

}

export { postSignUp, postLogin }