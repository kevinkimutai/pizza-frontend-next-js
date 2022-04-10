// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/mongo";
import Order from "../../../model/Order";

export default async function handler(req, res) {
  const {
    method,
    query: { orderId },
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const order = await Order.findById(orderId);
        res.status(200).json(order);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    default:
      break;
  }
}
