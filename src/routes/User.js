const express = require('express')
const router = express.Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')



////////////////////// signup//////////////////////////////
router.post("/signup", async (req, res) => {

    try {
        const checkemail = await User.findOne({ email: req.body.email })
        const checkPhone = await User.findOne({ phone: req.body.phone })
        const password = req.body.password
        const salt = bcrypt.genSaltSync(10)
        const hash = await bcrypt.hash(password, salt)


        console.log(checkemail, 'email')
        console.log(checkPhone, 'phone')
        console.log(typeof checkPhone)
        if (checkemail) {
            console.log('email exist ')
            return res.status(409).json({ error: 'email-already-exist' })

        }
        else if (checkPhone) {
            console.log("phone already exist")
            return res.status(409).json({ error: "phone number already exist" })

        }
        else {
            const data = await User.create({
                name: req.body.name,
                email: req.body.email, phone: req.body.phone, password: hash
            })
            await data.save();
            console.log(data, 'its saved data')
            return res.status(200).json({ message: 'success' })

        }

    } catch (error) {
        console.log(error)
    }

})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const checkemail = await User.findOne({ email: email })
        if (!checkemail) {
            console.log('no email exist')
            return res.status(409).json({ err: 'usernotexists' })

        }


        const checkpassword = await bcrypt.compare(password, checkemail.password)
        if (checkpassword) {
            console.log(checkpassword, 'its password check')
            return res.status(200).json({ message: 'success' })

        }
        else {
            return res.status(409).json({ err: 'wrong-password' })
        }




    } catch (error) {
        console.log(error)
    }
})




















module.exports = router