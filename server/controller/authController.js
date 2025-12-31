import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import client from '../database/database.js'
import 'dotenv/config'
import transporter from '../config/nodemailer.js'

export const register = async (req, res) => {
    const { username, email, password, age, dob } = req.body

    if (!username || !email || !password  || !age || !dob) {
        return res.json({ success: false, message: 'Missing Details' })
    }

    try {
        // 1️⃣ Check existing user
        const existingUser = await client.query(
            `SELECT user_id FROM users WHERE email = $1`,
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Insert user
        const result = await client.query(
            `INSERT INTO users (username, email, password, age, dob)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING user_id, username, email`,
            [username, email, hashedPassword, age, dob]
        );

        //  Extract user_id
        const userID = result.rows[0].user_id;

        //  Generate JWT
        const token = jwt.sign(
            { id: userID },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        // console.log(process.env.JWT_SECRET)

        //Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        })

        //Sending the welcome email
        const mailOption = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: 'Welcome to HabitFlow',
            text: `Welcome to HabitFlow your account is created successfully with email ${email}`
        }
        await transporter.sendMail(mailOption)

        //  Send response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: result.rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    })
  }

  try {
    const result = await client.query(
      `SELECT username, email, user_id, password 
       FROM users WHERE email = $1`,
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const user = result.rows[0]

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      { id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      success: true,
      message: 'Login successful',
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export const logout = async (req, res) => {
    try {

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Email Verification
export const sendVerifiedOtp = async (req, res) => {
    try {
        const userID  = req.user.userID

        const userResult = await client.query(
            `select email, is_account_verified, verify_otp_expires_at 
       from users where user_id = $1`,
            [userID]
        )

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: `User having ID ${userID} does not exist`
            })
        }

        const user = userResult.rows[0]

        if (user.is_account_verified) {
            return res.status(400).json({
                success: false,
                message: 'User already verified'
            })
        }

        // Generate 6-digit OTP
        const OTP = String(Math.floor(100000 + Math.random() * 900000))

        // OTP expiry (24 hours)
        const expireOtp = new Date(Date.now() + 24 * 60 * 60 * 1000)

        await client.query(
            `update users 
       set verify_otp = $1, verify_otp_expires_at = $2 
       where user_id = $3`,
            [OTP, expireOtp, userID]
        )

        const mailOption = {
            from: process.env.SMTP_SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${OTP}. It will expire in 24 hours.`
        }

        await transporter.sendMail(mailOption)

        return res.json({
            success: true,
            message: 'Verification OTP sent to your email'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const verifyOTP = async (req, res) => {
    const userID = req.user.userID
    const { OTP } = req.body;

    if (!userID || !OTP) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
    }
    try {

        const result = await client.query(`select user_id, email, verify_otp, is_account_verified, verify_otp_expires_at 
       from users where user_id = $1`, [userID])

       const user = result.rows[0]
        //Checking user
       if(!user.user_id){
        return res.json({
            success : false,
            message : 'User is not found'
        })
       }

       // IF not verify_otp means cheaking Invalid OTP
       if(user.verify_otp === '' || String(user.verify_otp) !== String(OTP)){
        return res.json({
            success : false,
            message : 'Invalid OTP'
        })
       }

       //checking Expiery of otp
       if(user.verify_otp_expires_at < Date.now()){
        return res.json({
            success : false,
            message : 'OTP has Expired'
        })
       }

       const verifyAccount = await client.query(`Update users set is_account_verified = $1, verify_otp = $2, verify_otp_expires_at = $3 where user_id = $4`, [true, null, null, userID])
       
       return res.status(200).json({
        success : true,
        message : 'Account Verify Successfully'
       })
       

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Checking User logged in or not
export const isAuthenticated = async(req, res)=>{

    try{

        return res.json({
            success : true
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}