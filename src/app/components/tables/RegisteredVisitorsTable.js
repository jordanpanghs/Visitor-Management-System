"use client"; //Temporary, will have to put data into state

import React, { useEffect, useState } from "react";
import { Card, Typography, tab } from "@material-tailwind/react";
import { collection, query, where, getDocs } from "firebase/firestore";
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

export default function RegisteredVisitorTable() {
  const [registeredVisitorsData, setRegisteredVisitorsData] = useState([]);
  const [numOfRegisteredVisitors, setNumOfRegisteredVisitors] = useState("");
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");

  //Retrieve all documents from collection registeredVisitors
  useEffect(() => {
    fetchRegisteredVisitorsData();
  }, []);

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

  return (
    <>
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
              <option value="identityCardNum">ID Number</option>
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
              {" "}
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
                {tableList.map(
                  (
                    {
                      id,
                      name,
                      identityCardNum,
                      licensePlateNum,
                      telephoneNum,
                      visitDateTime,
                      visitedUnit,
                      visitingPurpose,
                    },
                    index
                  ) => (
                    <Row key={id} className="even:bg-blue-gray-50/50">
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {identityCardNum}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {licensePlateNum}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {telephoneNum}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {visitDateTime}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {visitedUnit}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {visitingPurpose}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </Cell>
                    </Row>
                  )
                )}
              </Body>
            </>
          )}
        </Table>
      </Card>
    </>
  );
}
