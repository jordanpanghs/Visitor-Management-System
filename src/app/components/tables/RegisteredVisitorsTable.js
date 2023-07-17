"use client"; //Temporary, will have to put data into state

import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "firebase.js";
import moment from "moment";

export default function RegisteredVisitorTable() {
  const [registeredVisitorsData, setRegisteredVisitorsData] = useState([]);
  const [numOfRegisteredVisitors, setNumOfRegisteredVisitors] = useState("");

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
    "Document ID.",
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

  return (
    <>
      <div>
        <h1 className="text-left mb-8 pl-5 text-2xl font-medium">
          Registered Visitors
        </h1>
      </div>

      <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
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
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {TABLE_ROWS_DATA.map(
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
                <tr key={id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {identityCardNum}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {licensePlateNum}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {telephoneNum}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {visitDateTime}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {visitedUnit}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {visitingPurpose}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue"
                      className="font-medium"
                    >
                      Edit
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
