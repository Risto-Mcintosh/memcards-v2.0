import React, { useState } from "react";
import { ImageAdd } from "styled-icons/boxicons-regular/ImageAdd";
import { Button } from "react-bootstrap";

function imageInput({ searchToggle, setToggle }) {
  return (
    <Button
      style={{ width: "70px" }}
      className="p-1 ml-2"
      onClick={() => setToggle(!searchToggle)}
    >
      <ImageAdd />
    </Button>
  );
}

export default imageInput;
