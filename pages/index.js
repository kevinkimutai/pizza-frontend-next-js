import Head from "next/head";

import Navbar from "../components/Navbar";
import HeaderCarousel from "../components/HeaderCarousel";
import PizzaMenu from "../components/PizzaMenu";
import Footer from "../components/Footer";

export default function Home({ pizzas }) {
  return (
    <>
      <Head>
        <title>Pizza Kenya</title>
        <meta name="description" content="pizza-kenya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderCarousel />
      <PizzaMenu pizzas={pizzas} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/pizzas");
  const data = await res.json();

  return {
    props: {
      pizzas: data,
    },
  };
};
