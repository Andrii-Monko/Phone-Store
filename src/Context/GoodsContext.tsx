import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Iphone } from '../types/Iphone';

type Props = {
  children: React.ReactNode
};

type Param = {
  goods: Iphone[],
  selectedParam: string | null,
  setSelectedParam: (value: string | null) => void,
  selected: Iphone[],
  setSelected: (value: Iphone[]) => void
  favourite: Iphone[],
  setFavourite: (value: Iphone[]) => void,
  currentPage: number,
  setCurrentPage: (value: number) => void
  goodsPerPage: number,
  setGoodsPerpPage: (value: number) => void,
  addToBasket: (key: string, newValue: Iphone) => void
  addToFavourite: (key: string, newValue: Iphone) => void
  searchParams: {},
  setSearchParams: (value: string) => void,
};

export const GoodsContext = React.createContext<Param>(
  {
    goods: [],
    selectedParam: null,
    setSelectedParam: () => { },
    selected: [],
    setSelected: () => { },
    favourite: [],
    setFavourite: () => { },
    currentPage: 0,
    setCurrentPage: () => { },
    goodsPerPage: 0,
    setGoodsPerpPage: () => { },
    addToBasket: () => { },
    addToFavourite: () => { },
    searchParams: {},
    setSearchParams: () => { },
  },
);

/* ЗБЕРЕЖЕННЯ IPHONE ТОВАРІВ В LOCALSTORAGE */
const addToBasket = (key: string, newValue: Iphone) => {
  const goodsInBasket = JSON.parse(localStorage.getItem(key) || '[]');

  localStorage.setItem(key, JSON.stringify([...goodsInBasket, newValue]));
};

/* ЗБЕРЕЖЕННЯ ВПОДОБАНИХ IPHONES ТОВАРІВ В LOCALSTORAGE */
const addToFavourite = (key: string, newValue: Iphone) => {
  const favouriteGoods = JSON.parse(localStorage.getItem(key) || '[]');

  localStorage.setItem(key, JSON.stringify([...favouriteGoods, newValue]));
};

/* ОТРИМАННЯ IPHONE (ОБРАНИХ) ТОВАРІВ ІЗ LOCALSTORAGE */
const putInToBasket = () => {
  const item = localStorage.getItem('id');

  return item ? JSON.parse(item) as Iphone[] : [];
};

/* ОТРИМАННЯ ЗБЕРЕЖНИХ (ВПОДОБАНИХ) IPHONES ТОВАРІВ ІЗ LOCALSTORAGE */
const favouriteGoods = () => {
  const item = localStorage.getItem('like');

  return item ? JSON.parse(item) as Iphone[] : [];
};

export const GoodsProvider: React.FC<Props> = ({ children }) => {
  const [goods, setGoods] = useState<Iphone[]>([]);
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [selected, setSelected] = useState<Iphone[]>(() => putInToBasket());
  const [favourite, setFavourite] = useState<Iphone[]>(() => favouriteGoods());
  const [currentPage, setCurrentPage] = useState(1);
  const [goodsPerPage, setGoodsPerpPage] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams('');

  useEffect(() => {
    fetch('./_new/products.json')
      .then((responce) => responce.json())
      .then((data) => setGoods(data));
  }, []);

  return (
    <GoodsContext.Provider value={
      {
        goods, /* Всі товари */
        selectedParam, /* Парметри сортування */
        setSelectedParam, /* Ф-ія встановлення параметрів сортування */
        selected, /* Товари в корзині */
        setSelected, /* Ф-я для обробки товарів в корзині */
        favourite, /* Вподобані товари */
        setFavourite, /* Ф-я для обробки вподобаних товарів */
        currentPage, /* Поточна сторінка */
        setCurrentPage, /* Ф-ія встановлює поточну сторінку */
        goodsPerPage, /* Кількість товарів на сторінці */
        setGoodsPerpPage, /* Ф-ія що змінює кількіть товарів на сторінці */
        addToBasket, /* Ф-ія добавлення товарів в корзину */
        addToFavourite, /* Ф-ія добавлення товарів до улюблених */
        searchParams, /* Пошук товарів через input */
        setSearchParams, /* Ф-ія пошуку товарів через input */
      }
    }
    >
      {children}
    </GoodsContext.Provider>
  );
};
