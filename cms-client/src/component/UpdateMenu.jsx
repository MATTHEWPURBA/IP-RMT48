import { useEffect, useState } from "react";
import FormPages from "./FormPages";
import { useNavigate, useParams } from "react-router-dom";
import { localRequest } from "../../utils/axios";
import showToast from "../../utils/toastify";

export default function UpdateMenu() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [CategoryId, setCategoryId] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  const fetchDataById = async () => {
    try {
      const { data } = await localRequest({
        method: "get",
        url: `/pub/restaurant/${id}`,
      });
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setImgUrl(data.imgUrl);
      setCategoryId(data.CategoryId);
      // console.log(data.name);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(dataDetail, "data detail nih");
  /** useEffect ini fungsi nya buat stop pengulangan data nya
   * yang dilakukan oleh useState (gatau bener atau ga)
   */
  useEffect(() => {
    fetchDataById();
  }, []);

  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    CategoryId: "",
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInputData({ ...inputData, [name]: value });
  };

  const errorHandler = async (event) => {
    event.preventDefault();
    try {
      let response = await localRequest({
        method: "put",
        url: `/restaurant/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: inputData,
      });
      navigate("/");
      const { message } = response.data;
      console.log(response.data)
      showToast(message);
    } catch (error) {
      console.log(error);
      showToast(error)
    }
  };

  return (
    <>
      <FormPages errorHandler={errorHandler} handleChangeInput={handleChangeInput} name={name} description={description} price={price} imgUrl={imgUrl} CategoryId={CategoryId} />
    </>
  );
}
