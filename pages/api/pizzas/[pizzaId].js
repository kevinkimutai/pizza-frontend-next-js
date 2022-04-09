// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/mongo";
import Pizza from "../../../model/Pizza";

export default async function handler(req, res) {
  const {
    method,
    query: { pizzaId },
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const pizza = await Pizza.findById(pizzaId);
        res.status(200).json(pizza);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    default:
      break;
  }
}
