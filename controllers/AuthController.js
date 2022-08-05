const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const ResponseData = require('../utils/ResponseData');
const keys = require("../config/keys");
const Model = require('../models');
const { transferMail, MAIL_TITLE } = require('../utils/SystemUtils');
const { emailVerificationTemplate } = require('../templates/EmailVerifyTemplate');
const UserModel = Model.user;

const ResponseUserModel = (user) => {
    return {
        fullName: `${user.firstname} ${user.lastname}`,
        phone: user.phone,
        email: user.email,
        active: user.active,
        image: user.image,
        id: user.id,
        role: 'user',
        bday:user.bday,
        firstname:user.firstname,
        lastname:user.lastname,
    }
}
const jwtsign = (payload) => {
    // Sign token
    return jwt.sign(
        payload,
        keys.secretOrKey, {
        expiresIn: 31556926 // 1 year in seconds
    }
    );
}
const encryptPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        bcrypt.hash(password, 10, (err, data) => {
            if (err) reject(err);

            resolve(data);
        });
    });
}
const checkPassword = (password, hashPassword) => {
    return new Promise(async (resolve, reject) => {
        bcrypt.compare(
            password.toString(),
            hashPassword.toString(),
            (err, data) => {
                if (err) reject(err);
                resolve(data);
            }
        );
    });
};
const login = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({
            where: { [Op.or]: [{ phone: email }, { email }] }
        });

        if (user == null || !user) {
            return ResponseData.warning(res, "Can't find user by this email or name");
        }

        else {

            if (!await checkPassword(password, user.password)) {
                return ResponseData.warning(res, "Wrong password, check again");
            }

            const payload = { id: user.id, email: user.email, role: 'user', active: user.active };

            const token = jwtsign(payload);
            return ResponseData.ok(res, "Login successfully, welcome to your visit.", { token, user: ResponseUserModel(user) });

        }

    }
    catch (err) {
        console.log(err);
        return ResponseData.error(res, "", err);
    }
}
const register = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        const { phone, email, firstName, lastName, password } = req.body;

        if ((await UserModel.findOne({ where: { [Op.or]: [{ phone }, { email }] } })) != null) {
            return ResponseData.warning(res, "Already using phone or email, try login");
        }
        else {
            const user = await UserModel.create({
                phone, email, firstname: firstName, lastname: lastName,
                password: await encryptPassword(password)
            }
            );
            const payload = { id: user.id, email, role: 'user', active: false };
            const token = jwtsign(payload);
            const link = `${process.env.REDIRECT_URL}verify/email/${token}`;
            const result = await transferMail(email, MAIL_TITLE.auth, emailVerificationTemplate(link));

            return ResponseData.ok(res, (result ? "Signup is done successfully, please verify email" : "Signup is done,but not send verify email, you can try it again later "), { token, user: ResponseUserModel(user) });
        }
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Server Fatal Error", err);
    }
}
const account = async (req, res) => {
    try {
        return ResponseData.ok(res, "get account information", { user: ResponseUserModel(req.user) });
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Server Fatal Error", err);
    }
}
const sendAuthMail = async (req, res) => {
    try {
        const user = req.user;
        const payload = { id: user.id, email: user.email, role: 'user', active: false };
        const token = jwtsign(payload);
        const link = `${process.env.REDIRECT_URL}verify/email/${token}`;

        if (await transferMail(user.email, MAIL_TITLE.auth, emailVerificationTemplate(link))) {
            return ResponseData.ok(res, `Sent Verification Email to ${user.email}`, { token });
        }
        else {
            return ResponseData.warning(res, `Whoops!, Did not send verification mail to ${user.email}`, { token });
        }
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Server Fatal Error", err);

    }
}
const emailVerify = async (req, res) => {
    try{
        const {token} = req.params;
        const payload = jwt.verify(token,keys.secretOrKey);
        const user = await UserModel.findOne({where:{email:payload.email, id:payload.id}});
        if(user!=null){
            await user.update({active:true})
            return ResponseData.ok(res, `Verified your email`);
        }
        else
            return ResponseData.warning(res,`Can not find user infomation from system`);
    }
    catch(err){
        return ResponseData.warning(res,`Token error, Can't verified`);
    }
}
module.exports = {
    register,
    login,
    sendAuthMail,
    account,
    emailVerify,
    ResponseUserModel

}