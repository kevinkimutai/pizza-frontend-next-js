// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/mongo";
import Pizza from "../../../model/Pizza";

export default async function handler(req, res) {
  const {
    method,
    query: { pizzaId },
    body,
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

    case "PUT":
      try {
        const pizza = await Pizza.findByIdAndUpdate(body, { new: true });
        res.status(200).json(pizza);
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    case "DELETE":
      try {
        await Product.findByIdAndDelete(pizzaId);
        res.status(200).json("The product has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
      break;

    default:
      break;
  }
}
