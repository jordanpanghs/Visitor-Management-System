"use client"; //Temporary, will have to put data into state

import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { auth, db } from "firebase.js";

export default function RegisteredVisitorsTable() {
  return <Table />;
}

function Table() {
  const [registeredVisitorsData, setRegisteredVisitorsData] = useState("");
  const [numOfRegisteredVisitors, setNumOfRegisteredVisitors] = useState("");

  //Retrieve all documents from collection registeredVisitors
  useEffect(() => {
    fetchRegisteredVisitorsData;
  }, []);

  function fetchRegisteredVisitorsData() {
    const q = query(collection(db, "registeredVisitors"));
    const querySnapshot = getDocs(q);

    querySnapshot.then((querySnapshot) => {
      //store the number of documents in the collection into a variable
      setNumOfRegisteredVisitors(querySnapshot.size);

      querySnapshot.forEach((doc) => {
        //store the data of each document into a variable
        setRegisteredVisitorsData(doc.data());
      });
    });
  }

  const TABLE_HEAD = [
    "Record No.",
    "Name",
    "Identity Card Number",
    "License Plate Number",
    "Telephone Number",
    "Visiting Date & Time",
    "Visited Unit",
    "Visiting Purpose",
    "",
  ];

  const TABLE_ROWS_DATA = [
    {
      id: 1,
      name: "John Doe",
      identityCardNum: "123456789",
      licensePlateNum: "ABC123",
      telephoneNum: "1234567890",
      visitDateTime: "2021-10-10 10:00",
      visitedUnit: "B-123",
      visitingPurpose: "Delivery",
    },
  ];

  return (
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
  );
}
