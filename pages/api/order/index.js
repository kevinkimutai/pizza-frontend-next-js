// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/mongo";
import Order from "../../../model/Order";

export default async function handler(req, res) {
  const { method, body } = req;

  dbConnect();

  switch (method) {
    case "POST":
      try {
        const order = await Order.create(body);
        res.status(200).json(order);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    case "GET":
      try {
        const order = await Order.find();
        res.status(200).json(order);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    default:
      break;
  }
}
