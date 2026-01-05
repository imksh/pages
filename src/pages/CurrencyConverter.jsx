import React, { useState, useEffect, useRef } from "react";
import { CgArrowsExchange } from "react-icons/cg";
import Lottie from "lottie-react";
import infinity from "../assets/animations/infinity.json";
import countryData from "../assets/data/countryData.json";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CurrencyConverter = () => {
  const [from, setFrom] = useState("USD US");
  const [to, setTo] = useState("INR IN");
  const [input, setInput] = useState(30);
  const [result, setResult] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previous, setPrevious] = useState([]);
  const [history, setHistory] = useState([]);
  const [recent, setRecent] = useState([]);
  const [show, setShow] = useState(false);

  const timer = useRef(null);
  const searchRef = useRef(null);
  const heroRef = useRef(null);
  const recentRef = useRef(null);
  const historyRef = useRef(null);
  const select1Ref = useRef(null);
  const select2Ref = useRef(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("currencyConverter"));
    setRecent(items || []);
  }, []);

  useEffect(() => {
    convert();
    previousRate();
    getHistory();
  }, [from, to]);

  const scroll = (item) => {
    item.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      let updated = [{ from, to, result }, ...recent];
      updated = updated.slice(0, 6);
      setRecent(updated);
      localStorage.setItem("currencyConverter", JSON.stringify(updated));
    }, 5000);

    return () => clearTimeout(timer.current);
  }, [from, to, result]);

  const convert = async () => {
    try {
      const country1 = from.split(" ")[0].toLowerCase();
      const country2 = to.split(" ")[0].toLowerCase();
      const res = await axios.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${country1}.json`
      );
      const ans = res.data[country1][country2].toFixed(2);
      setResult(ans);
    } catch (error) {
      console.log(error);
    }
  };

  const previousRate = async () => {
    try {
      const prev = [];
      let n = 1;
      setLoading(true);
      while (n <= 5) {
        const d = new Date();
        d.setDate(d.getDate() - n);
        const date = d.toISOString().split("T")[0];
        const country1 = from.split(" ")[0];
        const country2 = to.split(" ")[0];
        const res = await axios.get(
          `https://api.frankfurter.app/${date}?from=${country1}&to=${country2}`
        );
        prev.push(res.data);
        n = n + 1;
      }
      setPrevious(prev);
      console.log(prev);
    } catch (error) {
      console.log(error);
      setPrevious([]);
    } finally {
      setLoading(false);
    }
  };

  const getHistory = async () => {
    try {
      const country1 = from.split(" ")[0];
      const country2 = to.split(" ")[0];
      const res = await axios.get(
        `https://api.frankfurter.app/2025-01-01..2026-01-01?from=${country1}&to=${country2}`
      );
      const data = convertRates(res.data.rates, to.split(" ")[0]);
      setHistory(data);
    } catch (error) {
      console.log(error);

      setHistory([]);
    }
  };

  const convertRates = (obj, currency) => {
    return Object.entries(obj).map(([date, value]) => ({
      date,
      rate: value[currency],
    }));
  };

  const swap = () => {
    setTo(from);
    setFrom(to);
  };
  return (
    <div className="w-full overflow-x-hidden" onClick={() => setShow(false)}>
      <Header
        showInfinity={true}
        heading="TrueRate"
        name1="Home"
        name2="Recent"
        name3="Trends"
        name4="History"
        fun1={() => scroll(heroRef)}
        fun2={() => scroll(recentRef)}
        fun3={() => scroll(historyRef)}
        fun4={() => scroll(searchRef)}
        color="bg-blue-600"
      />

      <div
        className="hero relative  min-h-[90dvh] gradient-currency"
        ref={heroRef}
      >
        <div className="text-white flex flex-col items-center pt-32 pb-8 gap-4 mb-8 md:mb-0">
          <div
            data-aos="fade-down"
            className="flex flex-col gap-4 justify-center items-center"
          >
            <h1 className="text-2xl md:text-6xl font-bold">
              Currency Converter
            </h1>
            <p className="px-4 text-center">
              Check live foreign currency exchange rates
            </p>
          </div>
        </div>
        <div
          className="w-[85%] md:w-[70%] absolute md:top-[50%] left-[50%] -translate-x-[50%] mx-auto rounded-2xl shadow-2xl bg-white p-4 z-10"
          data-aos="zoom-in"
        >
          <div className="relative w-full flex flex-col md:flex-row gap-2 md:gap-5 ">
            <motion.div
              className="md:w-[50%]"
              // whileTap={{ scale: 0.5 }}
              onClick={() => select1Ref.current?.click()}
            >
              <fieldset className=" w-full flex flex-col md:flex-row items-center md:items-end rounded-2xl p-2 md:py-4 md:px-6 justify-between border-2 hover:border-blue-500">
                <legend>From</legend>
                <p className="my-auto">{from.split(" ")[0]} 1</p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full overflow-hidden mx-2">
                    <img
                      src={`https://flagsapi.com/${
                        from.split(" ")[1]
                      }/flat/64.png`}
                      className="w-full scale-160 object-cover outline-none "
                    />
                  </div>
                  <select
                    name="from"
                    id="from"
                    className="ml-auto  my-auto p-2 rounded-lg outline-none w-40 md:w-auto overflow-hidden max-w-36"
                    value={from}
                    ref={select1Ref}
                    onChange={(e) => {
                      setFrom(e.target.value);
                    }}
                  >
                    {countryData.map((country, idx) => (
                      <option
                        key={idx}
                        value={country.currencyCode + " " + country.countryCode}
                      >
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
            </motion.div>
            <motion.button
              className="absolute top-[52%] md:top-[55%] left-[50%] -translate-x-[50%] -translate-y-[50%]  bg-white border rounded-full cursor-pointer z-10"
              onClick={swap}
              whileHover={{ rotate: 360 }}
              whileTap={{ rotate: 360, scale: 0.5 }}
            >
              <CgArrowsExchange className="w-10 h-10 rotate-90 md:rotate-0" />
            </motion.button>
            <motion.div
              className="md:w-[50%]"
              // whileTap={{ scale: 0.5 }}
              onClick={() => select2Ref.current?.click()}
            >
              <fieldset className=" w-full flex flex-col md:flex-row items-center md:items-end rounded-2xl p-2 md:py-4 md:px-6 justify-between border-2 hover:border-blue-500">
                <legend>To</legend>
                <p className="my-auto">
                  {to.split(" ")[0]} {result}
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full overflow-hidden mx-2">
                    <img
                      src={`https://flagsapi.com/${
                        to.split(" ")[1]
                      }/flat/64.png`}
                      className="w-full scale-160 object-cover outline-none "
                    />
                  </div>
                  <select
                    ref={select2Ref}
                    name="to"
                    id="to"
                    className="ml-auto  my-auto p-2 rounded-lg outline-none w-40 md:w-auto overflow-hidden  max-w-36"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                    }}
                  >
                    {countryData.map((country, idx) => (
                      <option
                        key={idx}
                        value={country.currencyCode + " " + country.countryCode}
                      >
                        {country.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between md:px-4 gap-2 md:gap-8 mt-6 mb-2 md:my-6">
            <motion.div
              className="relative flex items-center w-fit mx-auto"
              whileTap={{ scale: 0.5 }}
            >
              <p className="absolute left-3 text-blue-500">
                {from.split(" ")[0]}
              </p>
              <input
                type="number"
                className="border py-3 pl-12 pr-2 md:pl-14 w-full rounded-lg outline-blue-500"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </motion.div>
            <div className="md:text-xl font-bold text-blue-500 md:min-w-[50%] flex justify-end items-center grow">
              <p>{`${input || 0} ${from.split(" ")[0]} = ${(
                result * input
              ).toFixed(2)} ${to.split(" ")[0]}`}</p>
            </div>
          </div>
        </div>

        <div className="custom-shape-divider-bottom-1767276540 ">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>

      <div
        className="flex flex-col w-[95%] md:w-[70%] mx-auto rounded-2xl overflow-hidden"
        data-aos="fade-up-right"
        ref={recentRef}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-blue-500 mx-auto mt-16 mb-8">
          Last few days
        </h1>
        <div className="grid grid-cols-3 bg-blue-200 p-4 rounded-t-2xl">
          <div className=" flex items-center justify-center">
            {" "}
            <p className="text-xl font-bold">Date</p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden mx-2">
              <img
                src={`https://flagsapi.com/${from.split(" ")[1]}/flat/64.png`}
                className="w-full scale-160 object-cover outline-none "
              />
            </div>
            <p className="text-xl font-bold">{from.split(" ")[1]}</p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden mx-2">
              <img
                src={`https://flagsapi.com/${to.split(" ")[1]}/flat/64.png`}
                className="w-full scale-160 object-cover outline-none "
              />
            </div>
            <p className="text-xl font-bold">{to.split(" ")[1]}</p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center bg-blue-100 p-3 min-h-60 w-full ">
            <Lottie animationData={infinity} loop className="w-20 h-20" />
          </div>
        ) : previous.length <= 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center bg-blue-100 p-3 min-h-60 w-full ">
            <Lottie animationData={infinity} loop className="w-20 h-20" />
            <p className="font-bold text-blue-500">Not Available</p>
          </div>
        ) : (
          previous.map((item, idx) => (
            <div key={idx} className="grid-cols-4">
              <div className="grid grid-cols-3 bg-blue-100 p-3">
                <div className=" flex items-center justify-center">
                  <p className="font-bold">{item.date}</p>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <p className="font-bold">{item.base + " " + item.amount}</p>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  {item.rates ? (
                    <p className="font-bold">
                      {to.split(" ")[0] + " " + item.rates[to.split(" ")[0]]}
                    </p>
                  ) : (
                    <p className="font-bold">Not Available</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className="relative flex flex-col justify-center items-center my-16 p-4 "
        data-aos="fade-up-right"
        ref={historyRef}
      >
        <p className="text-2xl md:text-4xl text-blue-500 my-16 text-center font-bold">
          Historical Trends in last one year
        </p>
        {history.length == 0 && (
          <p className="absolute top-[50%] font-bold text-red-500">
            Not Available
          </p>
        )}
        <LineChart
          style={{
            width: "100%",
            maxWidth: "700px",
            height: "100%",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          data={history}
          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          className="-translate-x-[4%]"

        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="rate"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="date"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </div>

      <div
        className="flex flex-col w-[95%] md:w-[70%] mx-auto rounded-2xl overflow-hidden"
        data-aos="fade-up"
        ref={searchRef}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-blue-500 mx-auto mt-16 mb-8">
          Recent Searches
        </h1>
        <div className="grid grid-cols-3 bg-blue-200 p-4 rounded-t-2xl">
          <div className=" flex items-center justify-center">
            <p className="text-xl font-bold">From</p>
          </div>
          <div className=" flex items-center justify-center">
            <p className="text-xl font-bold">To</p>
          </div>
          <div className=" flex items-center justify-center">
            <p className="text-xl font-bold">Amount</p>
          </div>
        </div>
        {recent.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 bg-blue-100 p-3">
            <div className="flex gap-2 items-center justify-center">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden mx-2">
                <img
                  src={`https://flagsapi.com/${
                    item.from.split(" ")[1]
                  }/flat/64.png`}
                  className="w-full scale-160 object-cover outline-none "
                />
              </div>
              <p className="font-bold">{item.from.split(" ")[1]}</p>
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-full overflow-hidden mx-2">
                <img
                  src={`https://flagsapi.com/${
                    item.to.split(" ")[1]
                  }/flat/64.png`}
                  className="w-full scale-160 object-cover outline-none "
                />
              </div>
              <p className="font-bold">{item.to.split(" ")[1]}</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="font-bold">{item.result}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default CurrencyConverter;
