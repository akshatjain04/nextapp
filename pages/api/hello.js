// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initDB from "../../Database/initDB"
import User from "../../models/User"

initDB()

export default function handler(req, res) {
  User.find().then(users=>{
    res.status(200).json(users)
  })
 // res.status(200).json({ name: 'John Doe' })
}
