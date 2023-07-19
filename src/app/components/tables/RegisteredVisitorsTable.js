"use client"; //Temporary, will have to put data into state

import React, { useEffect, useState } from "react";
import { Card, Typography, tab } from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapShot,
} from "firebase/firestore";
import { auth, db } from "firebase.js";
import moment from "moment";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
} from "@table-library/react-table-library/table";

function EditModal() {
  return <></>;
}

export default function RegisteredVisitorTable() {
  const [registeredVisitorsData, setRegisteredVisitorsData] = useState([]);
  const [numOfRegisteredVisitors, setNumOfRegisteredVisitors] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");

  const [showModal, setShowModal] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  //Retrieve all documents from collection registeredVisitors
  useEffect(() => {
    if (!isDataFetched) {
      fetchRegisteredVisitorsData();
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  function fetchRegisteredVisitorsData() {
    const q = query(collection(db, "registeredVisitors"));
    const querySnapshot = getDocs(q);

    querySnapshot.then((querySnapshot) => {
      //store the number of documents in the collection into a variable
      setNumOfRegisteredVisitors(querySnapshot.size);

      setRegisteredVisitorsData((prevArray) => {
        // Update the state by adding the new data to the previous array
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() }); // Include doc.id in the data object
        });
        return [...prevArray, ...newData];
      });
    });
  }

  const TABLE_HEAD = [
    "Document ID",
    "Name",
    "Identity Card Number",
    "License Plate Number",
    "Telephone Number",
    "Visiting Date & Time",
    "Visited Unit",
    "Visiting Purpose",
    "",
  ];

  //write each document retrieved in registeredVisitorsData into each row in the table
  const TABLE_ROWS_DATA = registeredVisitorsData.map((doc) => {
    //Convert date object into formatted date string
    const dateString = doc.visitorVisitDateTime;
    const format = "YYYY-MM-DDTHH:mm:ss.SSSZ";
    const date = moment(dateString, format);

    const formattedDate = date.format("MM/DD/YYYY h:mm A");

    return {
      id: doc.id,
      name: doc.visitorName,
      identityCardNum: doc.visitorIC,
      licensePlateNum: doc.visitorCarPlate,
      telephoneNum: doc.visitorTelNo,
      visitDateTime: formattedDate,
      visitedUnit: doc.visitorVisitedUnit ? doc.visitorVisitedUnit : "-",
      visitingPurpose: doc.visitorVisitPurpose,
    };
  });

  const data = {
    nodes: TABLE_ROWS_DATA.filter((item) =>
      item[searchField].toLowerCase().includes(search.toLowerCase())
    ),
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleEdit = (document) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  return (
    <>
      <div className="space-y-10 pt-10">
        <div>
          <h1 className="text-left mb-8 pl-5 text-2xl font-medium">
            Registered Visitors
          </h1>
          <div className="flex row space-x-5">
            <label htmlFor="search" className="flex row items-center space-x-3">
              <h2 className="text-md pl-3">Search by </h2>
              <select
                className="rounded-sm text-sm w-auto"
                id="searchField"
                value={searchField}
                onChange={handleSearchFieldChange}
              >
                <option value="identityCardNum">IC Number</option>
                <option value="name">Name</option>
                <option value="visitDateTime">Date & Time</option>
              </select>
              <input
                className="text-sm rounded-sm"
                id="search"
                type="text"
                size="20"
                value={search}
                onChange={handleSearch}
              />
            </label>
          </div>
        </div>

        <Card className="overflow-scroll h-full w-full">
          <Table
            data={data}
            className="w-full min-w-max table-auto text-left"
            style={{ gridTemplateColumns: "repeat(9, auto)" }}
          >
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    {TABLE_HEAD.map((head) => (
                      <HeaderCell
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList.map((document) => (
                    <Row key={document.id} className="even:bg-blue-gray-50/50">
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.id}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.name}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.identityCardNum}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.licensePlateNum}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.telephoneNum}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.visitDateTime}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.visitedUnit}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.visitingPurpose}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue"
                          className="font-medium"
                          onClick={() => handleEdit(document)}
                        >
                          Edit
                        </Typography>
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </Card>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Document</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {selectedDocument.id}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-400 text-white active:bg-green-1000 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export const revalidate = 60; // revalidate this page every 60 seconds
