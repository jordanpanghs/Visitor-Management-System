"use client"; //Temporary, will have to put data into state

import React, { useEffect, useState } from "react";
import { Card, Typography, tab } from "@material-tailwind/react";
import {
  collection,
  collectionGroup,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  deleteDoc,
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

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import Link from "next/link";

export default function RegisteredVisitorTable() {
  const [registeredVisitorsData, setRegisteredVisitorsData] = useState([]);
  const [numOfRegisteredVisitors, setNumOfRegisteredVisitors] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  //Retrieve all documents from collection registeredVisitors
  useEffect(() => {
    if (!isDataFetched) {
      listenForRegisteredVisitorsData();
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  //Listens to the registeredVisitor collection and updates itself when there are changes
  async function listenForRegisteredVisitorsData() {
    try {
      const q = query(
        collectionGroup(db, "userRegisteredVisitors"),
        where("isCheckedIn", "==", true),
        where("isCheckedOut", "==", true)
      );

      const unsubscribe = onSnapshot(
        q,
        async (snapshot) => {
          const updatedData = [];
          for (const doc of snapshot.docs) {
            const parentDoc = await getDoc(doc.ref.parent.parent);
            const data = {
              docRef: doc.ref,
              id: doc.id,
              date: new Date(doc.data().visitorVisitDateTime).toLocaleString(),
              residentName: parentDoc.data().residentName,
              residentTelNo: parentDoc.data().residentTelNo,
              ...doc.data(),
            };
            updatedData.push(data);
          }
          console.log(updatedData);
          setRegisteredVisitorsData(updatedData);
          setIsDataFetched(true);
        },
        (error) => {
          console.log(error);
        }
      );
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }

  const TABLE_HEAD = [
    "Document ID",
    "Name",
    "Identity Card Number",
    "License Plate Number",
    "Telephone Number",
    "Visited Date & Time",
    "Visited Unit",
    "Visit Purpose",
    "Resident Name",
    "Resident Tel No",
    "Entry Date Time",
    "Exit Date Time",
    "Driver License Image",
    "Car Plate Image",
    "Exit Car Image",
  ];

  //write each document retrieved in registeredVisitorsData into each row in the table
  const TABLE_ROWS_DATA = registeredVisitorsData.map((doc) => {
    //Convert date object into formatted date string
    const dateString = doc.visitorVisitDateTime;
    const format = "YYYY-MM-DDTHH:mm:ss.SSSZ";
    const date = moment(dateString, format);

    const formattedDate = date.format("MM/DD/YYYY h:mm A");

    return {
      docRef: doc.docRef,
      id: doc.id,
      name: doc.visitorName,
      identityCardNum: doc.visitorIC,
      carPlateNum: doc.visitorCarPlate,
      telephoneNum: doc.visitorTelNo,
      visitDateTime: formattedDate,
      visitedUnit: doc.visitorVisitingUnit,
      visitingPurpose: doc.visitorVisitPurpose,
      residentName: doc.residentName,
      residentTelNo: doc.residentTelNo,
      entryTime: new Date(doc.entryTime).toLocaleString(),
      exitTime: new Date(doc.exitTime).toLocaleString(),
      driverLicenseImage: doc.driversLicenseImageURL,
      carPlateImage: doc.carPlateImageURL,
      exitCarImage: doc.visitorExitImageURL,
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
      <div className="space-y-10 pb-12">
        <div>
          <h1 className="text-left mb-8 pl-5 text-2xl font-medium">
            Past Visitor Logs
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

        <Card className="overflow-auto w-full">
          <Table
            data={data}
            className="w-full min-w-max table-auto text-left"
            style={{ gridTemplateColumns: "repeat(15, auto)", height: "36vh" }}
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
                          {document.carPlateNum}
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
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.residentName}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.residentTelNo}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.entryTime}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.exitTime}
                        </Typography>
                      </Cell>
                      <Cell className="p-4 relative">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Link
                            href={document.driverLicenseImage}
                            className="group"
                          >
                            <span className="relative block">
                              <img
                                src={document.driverLicenseImage}
                                alt="driver license image"
                                height="150"
                                width="150"
                                className=""
                              />
                            </span>
                          </Link>
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Link href={document.carPlateImage} className="group">
                            <span className="relative block">
                              <img
                                src={document.carPlateImage}
                                alt="car plate image"
                                height="150"
                                width="150"
                                className=""
                              />
                            </span>
                          </Link>
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Link href={document.exitCarImage} className="group">
                            <span className="relative block">
                              <img
                                src={document.exitCarImage}
                                alt="visitor exit image"
                                height="150"
                                width="150"
                                className=""
                              />
                            </span>
                          </Link>
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
    </>
  );
}
