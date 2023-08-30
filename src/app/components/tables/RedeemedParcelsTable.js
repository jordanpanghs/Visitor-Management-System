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

import Link from "next/link";

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

export default function RegisteredParcelsTable() {
  const [registeredParcelsData, setRegisteredParcelsData] = useState([]);
  const [numOfRegisteredParcels, setNumOfRegisteredParcels] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("receiverName");

  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  //Retrieve all documents from collection registeredParcels
  useEffect(() => {
    if (!isDataFetched) {
      listenForRegisteredParcelsData();
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  //Listens to the registeredVisitor collection and updates itself when there are changes
  async function listenForRegisteredParcelsData() {
    try {
      const q = query(
        collectionGroup(db, "userRegisteredParcels"),
        where("hasArrived", "==", true),
        where("isClaimed", "==", true)
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
              residentUnit: parentDoc.data().residentUnit,
              ...doc.data(),
            };
            updatedData.push(data);
          }
          console.log(updatedData);
          setRegisteredParcelsData(updatedData);
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
    "Parcel Tracking Number",
    "Parcel Receiver Name",
    "Parcel Receiver IC Number",
    "Parcel Receiver Telephone Number",
    "Parcel Receiver Unit",
    "Parcel Image",
    "Parcel Redeemer IC Image",
  ];

  //write each document retrieved in registeredVisitorsData into each row in the table
  const TABLE_ROWS_DATA = registeredParcelsData.map((doc) => {
    return {
      docRef: doc.docRef,
      id: doc.id,
      receiverName: doc.parcelReceiverName,
      receiverIC: doc.parcelReceiverIC,
      telephoneNum: doc.parcelReceiverTelNo,
      trackingNumber: doc.parcelTrackingNumber,
      residentUnit: doc.residentUnit,
      parcelImage: doc.parcelImageURL,
      redeemerImage: doc.redeemerICImageURL,
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
            Redeemed Parcels History
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
                <option value="receiverIC">IC Number</option>
                <option value="receiverName">Name</option>
                <option value="trackingNumber">Tracking Number</option>
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
            style={{ gridTemplateColumns: "repeat(8, auto)", height: "36vh" }}
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
                <Body className="max-h-min">
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
                          {document.trackingNumber}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.receiverName}
                        </Typography>
                      </Cell>
                      <Cell className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {document.receiverIC}
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
                          {document.residentUnit}
                        </Typography>
                      </Cell>
                      <Cell className="p-4 relative">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Link href={document.parcelImage} className="group">
                            <span className="relative block">
                              <img
                                src={document.parcelImage}
                                alt="parcel image"
                                height="150"
                                width="150"
                                className=""
                              />
                            </span>
                          </Link>
                        </Typography>
                      </Cell>
                      <Cell className="p-4 relative">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Link href={document.redeemerImage} className="group">
                            <span className="relative block">
                              <img
                                src={document.redeemerImage}
                                alt="parcel redeem ic image"
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
