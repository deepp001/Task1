import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import MuiStepper from "./MuiStepper";
import { Stack } from "@mui/system";
import MuiTextField from "./MuiTextField";
import MuiRadioBox from "./MuiRadioBox";
import MuiRadioBox2 from "./MuiRadioBox2";
import Cardcomp from "./CardComp";
import ButtonsTheme from "../Themes/ButtonsTheme";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  Email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  Name: yup.string("Enter your Name").required("Name is required"),
  Phone: yup.number("Enter your Phone").required("Phone is required"),
  Compony: yup.string("Enter your Compony").required("Compony is required"),
});
const MuiCard = ({ value, onChange, onNegChange, comp }) => {
  const [data, setData] = useState([]);

  const [FinalData, setFinalData] = useState([]);
  const createData = async (values) => {
    setData((val) => [...val, values]);
  };
  const finalcreateData = async (value) => {
    const response = await axios.post("http://localhost:3002/data", {
      value,
    });
    const updatedData = [...data, response.data];
    setFinalData(updatedData);
  };
  // console.log(FinalData);

  const formik = useFormik({
    initialValues: {
      Email: "",
      Name: "",
      Phone: "",
      Compony: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);
      createData(values);
      formik.resetForm();
    },
    validateOnMount: true,
  });

  const onHandleClick = () => {
    onChange();
  };
  let Content = <MuiTextField formik={formik} />;
  if (comp === 1) {
    Content = <MuiRadioBox onChange={createData} />;
  }
  if (comp === 2) {
    Content = <MuiRadioBox2 onChange={createData} />;
  }
  if (comp === 3) {
    Content = <Cardcomp onChange={finalcreateData} data={data} />;
  }
  // let Buttons = (
  //   <>
  //     <ButtonsTheme variant="contained" type="submit" onClick={onHandleClick}>
  //       Next Step
  //     </ButtonsTheme>
  //   </>
  // );
  // if (comp === 1) {
  //   Buttons = (
  //     <>
  //       <ButtonsTheme variant="outlined" onClick={onNegChange}>
  //         Previoues Step
  //       </ButtonsTheme>
  //       <ButtonsTheme variant="contained" onClick={onChange}>
  //         Next Step
  //       </ButtonsTheme>
  //     </>
  //   );
  // }
  // if (comp === 2) {
  //   Buttons = (
  //     <>
  //       <ButtonsTheme variant="outlined" onClick={onNegChange}>
  //         Previoues Step
  //       </ButtonsTheme>
  //       <ButtonsTheme variant="contained" onClick={onChange}>
  //         Next Step
  //       </ButtonsTheme>
  //     </>
  //   );
  // }
  // if (comp === 3) {
  //   Buttons = (
  //     <ButtonsTheme variant="outlined" onClick={onNegChange}>
  //       Previoues Step
  //     </ButtonsTheme>
  //   );
  // }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Stack
            sx={{
              display: "flex",
              margin: "2",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box
              my={3}
              sx={{
                border: 1,
                borderRadius: 10,
                width: 500,
                height: 400,
                padding: 3,
              }}
            >
              <MuiStepper value={value} onChange={onChange} />

              {Content}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* {Buttons} */}

              <ButtonsTheme variant="outlined" onClick={onNegChange}>
                Previoues Step
              </ButtonsTheme>
              <ButtonsTheme
                variant="contained"
                type="submit"
                // disabled={!formik.isValid}
                onClick={onHandleClick}
              >
                Next Step
              </ButtonsTheme>
            </Box>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default MuiCard;
