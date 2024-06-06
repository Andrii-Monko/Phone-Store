import { useState } from 'react';
import { Banner } from './Banner/Banner';
import { Footer } from '../Footer/Footer';
import { Iphone } from '../../types/Iphone';
import { Headers } from '../Headers/Headers';
import { Category } from './Category/Category';
import { NewModel } from './NewModel/NewModel';
import { HotPrice } from './HotPrice/HotPrice';
import { MdOutlineMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaGitSquare } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

export const Home = () => {
  const [phones, setPhones] = useState<Iphone[]>([]);
  const newBrands = phones.sort((a, b) => b.price - a.price);

  fetch('./_new/products.json')
    .then((responce) => responce.json())
    .then((data) => setPhones(data
      .sort((a: Iphone, b: Iphone) => a.price - b.price)));

  return (
    <div className="HomePage">
      <Headers />
      <Banner />
      <HotPrice />
      <Category />
      <NewModel newBrands={newBrands} />
      <Footer />
    </div>
  );
};
