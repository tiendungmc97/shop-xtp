import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Account.module.scss";
import { strTrim, checkInterger, CheckDate, reverseBirthday } from "../../../../global/const";
// import {re} from './checkEmail'
import { Row, Col, Label } from "reactstrap";
import Service from "../../../api/shopService";
import ModalNoti from "../ModalNoti/ModalNoti";
function Login() {
  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showUserName, setShowUserName] = useState(false);
  const [showCccd, setShowCccd] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [cccd, setCccd] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [success,setSuccess]=useState(null)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const OnchangeName = (value) => {
    setName(value);
    setShowName(strTrim(value) < 3);
  };
  const OnchangeUserName = (value) => {
    setUserName(value);
    setShowUserName(strTrim(value) < 3);
  };
  const OnchangeCccd = (value) => {
    setCccd(value);
    setShowCccd(
      (strTrim(value) !== 9 && strTrim(value) !== 12) || !checkInterger(value)
    );
  };
  const OnchangeBirthday = (value) => {
    setBirthday(value);
    setShowBirthday(!CheckDate(value.split("-")));
  };
  const OnchangePhone = (value) => {
    setPhone(value);
    setShowPhone(strTrim(value) !== 10 || !checkInterger(value));
  };
  const OnchangePassword = (value) => {
    setPassword(value);
    setShowPassword(strTrim(value) < 6);
  };
  const OnchangePasswordRepeat = (value) => {
    setPasswordRepeat(value);
    setShowPasswordRepeat(value !== password);
  };

  const updateUsers = () => {
    const check =
      strTrim(name) > 0 &&
      strTrim(cccd) > 0 &&
      strTrim(phone) > 0 &&
      strTrim(birthday) > 0 &&
      strTrim(userName) > 0 &&
      strTrim(password) > 0 &&
      strTrim(passwordRepeat) > 0 &&
      !showBirthday &&
      !showCccd &&
      !showName &&
      !showPassword &&
      !showPasswordRepeat &&
      !showPhone &&
      !showUserName;
      if(check){
        Service.createCustomer({
          name,username:userName,birthday:reverseBirthday(birthday),cccd,phone,role:"customer"
        }).then((res)=>{
          Service.setPassword({
            customer_id:res.data.id,
            password,
          }).then(()=>{
            setSuccess(true)
            setInterval(() => {
              setShow(false)
            }, 2000);
          })
        })
      }else{
        setSuccess(false)
      }
  };
  return (
    <>
      <span
        variant="primary"
        onClick={handleShow}
        className={clsx(styles.loginButton, styles.loginBtn)}
      >
        ????NG K??
      </span>
      <Modal size='lg' className={styles.modal2} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>????NG K??</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.login}>
          {success===true&&<p className={styles.success}>????ng k?? t??i kho???n th??nh c??ng.Quay l???i ????? ????ng nh???p.</p>}
          {success===false&&<p className={styles.danger}>Vui l??ng nh???p ?????y ????? th??ng tin</p>}
          <Row>
            <Col>
              <Label>Nh???p h??? t??n</Label>
              <input
                value={name}
                onChange={(e) => OnchangeName(e.target.value)}
                placeholder="Nh???p h??? t??n"
              />
              {showName && <span>Vui l??ng nh???p h??? t??n</span>}
            </Col>
            <Col>
              <Label>Nh???p t??n ????ng nh???p</Label>
              <input
                value={userName}
                onChange={(e) => OnchangeUserName(e.target.value)}
                placeholder="Nh???p t??n ????ng nh???p"
              />
              {showUserName && <span>Vui l??ng nh???p t??n ????ng nh???p</span>}
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nh???p s??? ??i???n tho???i</Label>
              <input
                value={phone}
                onChange={(e) => OnchangePhone(e.target.value)}
                placeholder="Nh???p s??? ??i???n tho???i"
              />
              {showPhone && <span>Vui l??ng nh???p s??? ??i???n tho???i</span>}
            </Col>
            <Col>
              <Label>Nh???p c??n c?????c c??ng d??n</Label>
              <input
                value={cccd}
                onChange={(e) => OnchangeCccd(e.target.value)}
                placeholder="Nh???p cccd"
              />
              {showCccd && <span>Vui l??ng nh???p c??n c?????c c??ng d??n</span>}
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nh???p ng??y sinh</Label>
              <input
                value={birthday}
                onChange={(e) => OnchangeBirthday(e.target.value)}
                placeholder="Nh???p ng??y sinh ?????nh d???ng dd-mm-yyyy"
              />
              {showBirthday && (
                <span>Vui l??ng nh???p ????ng ?????nh d???ng dd-mm-yyyy</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Label>Nh???p m???t kh???u</Label>
              <input
                type="password"
                value={password}
                onChange={(e) => OnchangePassword(e.target.value)}
                placeholder="Nh???p m???t kh???u"
              />
              {showPassword && <span>Vui l??ng nh???p ??t nh???t 6 k?? t???</span>}
            </Col>
            <Col>
              <Label>Nh???p l???i m???t kh???u</Label>
              <input
                type="password"
                value={passwordRepeat}
                onChange={(e) => OnchangePasswordRepeat(e.target.value)}
                placeholder="Nh???p l???i m???t kh???u"
              />
              {showPasswordRepeat && <span>Vui l??ng nh???p kh???p m???t kh???u</span>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={updateUsers}>
            ????NG K??
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Login;
