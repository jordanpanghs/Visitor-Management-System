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
        where("isCheckedIn", "==", false),
        where("isCheckedOut", "==", false)
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
    "Visiting Date & Time",
    "Visiting Unit",
    "Visiting Purpose",
    "Resident Name",
    "Resident Tel No",
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
    console.log(document);
    setSelectedDocument(document);
    setShowEditModal(true);
  };

  const handleUpdate = (selectedDocument) => {
    let dateString = selectedDocument.visitDateTime;
    //The format of the date when no update is done is different from the format when the date is updated (for display purposes the format is changed)
    let format = ["YYYY-MM-DDTHH:mm:ss.SSSZ", "MM/DD/YYYY h:mm A"];
    let date = moment(dateString, format);

    console.log(date.toJSON());

    const docRef = selectedDocument.docRef;
    updateDoc(docRef, {
      visitorName: selectedDocument.name,
      visitorIC: selectedDocument.identityCardNum,
      visitorCarPlate: selectedDocument.carPlateNum,
      visitorTelNo: selectedDocument.telephoneNum,
      visitorVisitDateTime: date.toJSON(),
      visitorVisitedUnit: selectedDocument.visitedUnit,
      visitorVisitPurpose: selectedDocument.visitingPurpose,
    });
    setShowEditModal(false);
    alert("Visitor details updated successfully!");
  };

  const handleDelete = (document) => {
    const result = window.confirm("Do you want to delete this entry?");
    if (result) {
      const docRef = document.docRef;
      deleteDoc(docRef);
      alert("Visitor details deleted successfully!");
    } else {
    }
  };

  var yesterday = moment().subtract(1, "day");
  function valid(current) {
    return current.isAfter(yesterday);
  }

  let inputProps = {
    id: "visitDateTime",
    name: "visitDateTime",
    className:
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  };

  return (
    <>
      <div className="space-y-10 pb-12">
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

        <Card className="overflow-auto w-full">
          <Table
            data={data}
            className="w-full min-w-max table-auto text-left"
            style={{ gridTemplateColumns: "repeat(11, auto)", height: "36vh" }}
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
                      <Cell className="p-2">
                        <div className="space-y-2">
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue"
                            className="font-medium text-center"
                            onClick={() => handleEdit(document)}
                          >
                            Edit
                          </Typography>
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="red"
                            className="font-medium text-center"
                            onClick={() => handleDelete(document)}
                          >
                            Delete
                          </Typography>
                        </div>
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </Card>
      </div>

      {showEditModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Registered Visitor
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form>
                    <div className="flex items-center justify-between space-x-10">
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={selectedDocument.name}
                          onChange={(e) =>
                            setSelectedDocument({
                              ...selectedDocument,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="identityCardNum"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Identity Card Number
                        </label>
                        <input
                          type="text"
                          id="identityCardNum"
                          className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={selectedDocument.identityCardNum}
                          onChange={(e) =>
                            setSelectedDocument({
                              ...selectedDocument,
                              identityCardNum: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex row space-x-10">
                      <div className="mb-4">
                        <label
                          htmlFor="carPlateNum"
                          className="block text-sm font-medium text-slate-700"
                        >
                          License Plate Number
                        </label>
                        <input
                          type="text"
                          id="carPlateNum"
                          className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={selectedDocument.carPlateNum}
                          onChange={(e) =>
                            setSelectedDocument({
                              ...selectedDocument,
                              carPlateNum: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="telephoneNum"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Telephone Number
                        </label>
                        <input
                          type="text"
                          id="telephoneNum"
                          className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={selectedDocument.telephoneNum}
                          onChange={(e) =>
                            setSelectedDocument({
                              ...selectedDocument,
                              telephoneNum: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex row space-x-10">
                      <div className="mb-4">
                        <label
                          htmlFor="visitDateTime"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Visiting Date & Time
                        </label>
                        <Datetime
                          initialValue={selectedDocument.visitDateTime}
                          onChange={(momentObj) => {
                            setSelectedDocument((prevState) => ({
                              ...prevState,
                              visitDateTime: momentObj
                                ? momentObj.toJSON()
                                : selectedDocument.visitDateTime,
                            }));
                          }}
                          inputProps={inputProps}
                          isValidDate={valid}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="visitedUnit"
                          className="block text-sm font-medium text-slate-700"
                        >
                          Visited Unit
                        </label>
                        <input
                          type="text"
                          id="visitedUnit"
                          className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={selectedDocument.visitedUnit}
                          onChange={(e) =>
                            setSelectedDocument({
                              ...selectedDocument,
                              visitedUnit: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex row space-x-10"></div>

                    <div className="mb-4">
                      <label
                        htmlFor="visitingPurpose"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Visiting Purpose
                      </label>
                      <input
                        type="text"
                        id="visitingPurpose"
                        className="mt-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={selectedDocument.visitingPurpose}
                        onChange={(e) =>
                          setSelectedDocument({
                            ...selectedDocument,
                            visitingPurpose: e.target.value,
                          })
                        }
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-400 text-white active:bg-green-1000 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleUpdate(selectedDocument);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

export const revalidate = 60; // revalidate this page every 60 seconds
