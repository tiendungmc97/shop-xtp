import styles from "./accessory.module.scss";
import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import Service from "../../../api/shopService";
import { converseStr, FORMAT_PRICE,SORT } from "../../../../global/const";

function LayoutRight() {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [arrImage, setArrImage] = useState([]);
  const [arrImageList, setArrImageList] = useState([]);
  const pathname = window.location.pathname;
  let arrPage = [];
  useEffect(() => {
    Service.getListProduct().then((res) => {
      const arrSale = res.data.filter((el) => {
        if (pathname.split("/")[1] === "store") {
          return el;
        }
        return el.gender === pathname.split("/")[1];
      });
      setArrImageList(arrSale);
      setArrImage(arrSale.slice((page - 1) * 12, page * 12));
    });
  }, [page, pathname]);
  for (let i = 1; i <= numPage; i++) {
    arrPage.push({ id: i });
  }
  const handleApart = () => {
    setPage((page) => {
      if (page === 1) {
        return page;
      }
      return page - 1;
    });
  };
  const handleAdd = () => {
    setPage((page) => {
      if (page === numPage) {
        return page;
      }
      return page + 1;
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    setNumPage(Math.ceil(arrImageList.length / 12));
  }, [arrImageList]);
  const OnAddProduct = (id) => {
    window.localStorage.setItem("idProduct", JSON.stringify(id));
  };

  const onChangeValue = (e) => {
    if(parseInt(e)===SORT[0].value){
      const a=[...arrImage].sort((a,b)=>a.ctime-b.ctime)
      setArrImage(a)
    }else if(parseInt(e)===SORT[1].value){
      const b=[...arrImage].sort((a,b)=>a.price-b.price)
      setArrImage(b)
    }else if(parseInt(e)===SORT[2].value){
      const c =[...arrImage].sort((a,b)=>b.price-a.price)
      setArrImage(c)
    }else{
      setArrImage([...arrImage])
    }
  };
  return (
    <div className={styles.accessoryRight}>
      <div className={styles.accessoryRightSelect}>
        {numPage === 1 && <p>Hi???n th??? m???t k???t qu??? duy nh???t</p>}
        {numPage > 1 && <p>Hi???n th??? k???t qu??? trang s??? {page}</p>}
        <Form.Select
          className={styles.accessoryRightSelectButton}
          aria-label="Default select example"
          onChange={(e) => onChangeValue(e.target.value)}
        >
          <option value="0">M???i nh???t</option>
          <option value="1">Th??? t??? theo gi??:th???p ?????n cao</option>
          <option value="2">Th??? t??? theo gi??:cao xu???ng th???p</option>
        </Form.Select>
      </div>
      <div className={styles.accessoryRightLayout}>
        {arrImage.map((el, index) => (
          <div key={index}>
            <img src={el.image[0]} alt="" />
            <p>{converseStr(el.name)}</p>
            <strong>{FORMAT_PRICE(el.price)}??</strong>
            <Nav.Link
              className={styles.Button}
              as={Link}
              to={`/Cart/${el.id}`}
              onClick={() => OnAddProduct(el.id)}
            >
              XEM S???N PH???M
            </Nav.Link>
          </div>
        ))}
      </div>
      {numPage > 1 && (
        <div className={styles.pagination}>
          <div onClick={() => handleApart()}>
            <AiOutlineLeft />
          </div>
          {arrPage.map((el, index) => (
            <p
              key={index}
              style={{
                backgroundColor: page === index + 1 ? "red" : "",
                color: page === index + 1 ? "white" : "",
                borderColor: page === index + 1 ? "red" : "",
              }}
              onClick={() => setPage(el.id)}
            >
              {el.id}
            </p>
          ))}
          <div onClick={() => handleAdd()}>
            <AiOutlineRight />
          </div>
        </div>
      )}
    </div>
  );
}

export default LayoutRight;
