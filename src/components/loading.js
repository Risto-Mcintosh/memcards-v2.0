import React from "react";
import { ReactComponent as FlashCardsSVG } from "../images/flashcards.svg";
import { Spinner } from "react-bootstrap";

export default function Loading({ loader }) {
  return (
    <div className=" vh-100 bg-primary d-flex flex-column justify-content-center align-items-center">
      <div className=" mb-3" style={{ maxWidth: "210px" }}>
        <FlashCardsSVG className="w-100" />
      </div>
      <h1 className="text-white">Memcards</h1>
      {loader && (
        <Spinner animation="border" variant="success" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
